// Component updates (list-nav.component.ts)
import { Component, OnInit } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { cilPen, cilTrash, cilXCircle } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TooltipDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective,  TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective, SpinnerModule   } from '@coreui/angular';
import { NavService } from '../../../common-service/nav/nav.service';
import { navCommonInterface } from '../../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list-nav',
  standalone: true,
  imports: [NgClass, CommonModule, TooltipDirective, IconDirective, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, NgStyle,  TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective, SpinnerModule  ],
  templateUrl: './list-nav.component.html',
  styleUrl: './list-nav.component.scss'
})

export class ListNavComponent implements OnInit {
  icons = { cilPen, cilTrash, cilXCircle };
  tooltipEditText = 'Edit';
  tooltipDeleteText = 'Delete';
  tooltipBackText = 'Back';

  navInterfaceList: navCommonInterface[] = [];
  currentPage = 1;
  itemsPerPage = 100;
  totalItems = 0;
  totalPages = 0;

  // Search-related properties
  searchText: string = '';
  currentSearchTerm: string = '';
  searchCache: Map<string, any> = new Map();

  // Mode selection
  activeMode: 'single' | 'historic' | null = null;
  singleDate: string = '';
  startDate: string = '';
  endDate: string = '';

  // Loading states
  isLoading: boolean = false;
  isSearching: boolean = false;
  isPaginating: boolean = false;
  paginationDirection: 'next' | 'prev' | null = null;

  // Pagination
  nextCursor: string | null = null;
  currentCursor: string | null = null;

  private unsubscribe$ = new Subject<void>();

  constructor(private navService: NavService) {}

  ngOnInit() {
    this.loadNavList();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  /**
   * Perform search when search button is clicked
   */
  performSearch() {
    const searchTerm = this.searchText.trim();

    // Don't search if the term is the same as current search
    if (searchTerm === this.currentSearchTerm) {
      return;
    }

    this.currentSearchTerm = searchTerm;
    this.isSearching = true;
    this.resetPagination();

    // Clear cache if it's a new search
    if (this.currentSearchTerm !== searchTerm) {
      this.searchCache.clear();
    }

    this.loadNavList();
  }

  /**
   * Clear search and reset to show all records
   */
  clearSearch() {
    this.searchText = '';
    this.currentSearchTerm = '';
    this.searchCache.clear();
    this.resetPagination();
    this.loadNavList();
  }

  /**
   * Load NAV list with current search and pagination parameters
   */
  loadNavList() {
    // Set loading state only if not already searching or paginating
    if (!this.isSearching && !this.isPaginating) {
      this.isLoading = true;
    }

    // Create cache key for this request
    const cacheKey = `${this.currentSearchTerm}_${this.currentCursor || 'first'}_${this.itemsPerPage}`;

    // Check cache first for search results
    if (this.currentSearchTerm && this.searchCache.has(cacheKey)) {
      const cachedData = this.searchCache.get(cacheKey);
      this.handleResponse(cachedData);
      return;
    }

    this.navService.listsNav(this.itemsPerPage, this.currentSearchTerm, this.currentCursor || '')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          // Cache search results
          if (this.currentSearchTerm) {
            this.searchCache.set(cacheKey, response);
          }

          this.handleResponse(response);
        },
        error => {
          this.handleError(error);
        }
      );
  }

  /**
   * Handle successful API response
   */
  handleResponse(response: any) {
    this.isLoading = false;
    this.isSearching = false;
    this.isPaginating = false;
    this.paginationDirection = null;

    if (response.data && Array.isArray(response.data.data)) {
      this.navInterfaceList = response.data.data;
      this.nextCursor = response.data.next_cursor;
      this.totalItems = response.data.total_count || 0;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.updateCurrentPageDisplay();
    } else {
      console.error('Unexpected API response structure:', response);
      this.showError('Failed to load NAV list: Unexpected API response structure');
    }
  }

  /**
   * Handle API errors
   */
  handleError(error: any) {
    this.isLoading = false;
    this.isSearching = false;
    this.isPaginating = false;
    this.paginationDirection = null;

    if (error.code !== 'ERR_CANCELED') {
      console.error('Error loading NAV list:', error);
      this.showError('An error occurred while loading the NAV list');
    }
  }

  /**
   * Update current page display for pagination
   */
  updateCurrentPageDisplay() {
    if (this.currentCursor) {
      const cursorId = parseInt(this.currentCursor);
      if (!isNaN(cursorId)) {
        this.currentPage = Math.max(1, Math.floor((this.totalItems - cursorId) / this.itemsPerPage) + 1);
      }
    } else {
      this.currentPage = 1;
    }
  }

  /**
   * Go to next page
   */
  nextPage() {
    if (this.nextCursor && !this.isLoading && !this.isSearching && !this.isPaginating) {
      this.isPaginating = true;
      this.paginationDirection = 'next';
      this.currentCursor = this.nextCursor;
      this.currentPage++;
      this.loadNavList();
    }
  }

  /**
   * Go to previous page
   */
  previousPage() {
    if (this.currentPage > 1 && !this.isLoading && !this.isSearching && !this.isPaginating) {
      this.isPaginating = true;
      this.paginationDirection = 'prev';
      this.currentPage--;

      if (this.navInterfaceList.length > 0) {
        const firstItemId = this.navInterfaceList[0].id;
        const estimatedPreviousCursor = firstItemId + this.itemsPerPage;
        this.currentCursor = estimatedPreviousCursor.toString();
      } else {
        this.currentCursor = null;
      }
      this.loadNavList();
    }
  }

  /**
   * Reset pagination to first page
   */
  resetPagination() {
    this.currentCursor = null;
    this.currentPage = 1;
    this.nextCursor = null;
    this.isPaginating = false;
    this.paginationDirection = null;
  }

  /**
   * Check if search is active
   */
  isSearchActive(): boolean {
    return this.currentSearchTerm.length > 0;
  }

  /**
   * Activate mode (single or historic)
   */
  activateMode(mode: 'single' | 'historic') {
    this.activeMode = mode;
  }

  /**
   * Reset mode selection
   */
  resetMode() {
    this.activeMode = null;
    this.singleDate = '';
    this.startDate = '';
    this.endDate = '';
  }

  /**
   * Convert date format for API
   */
  convertDateFormat(dateString: string): string {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate().toString().padStart(2, '0')}-${months[date.getMonth()]}-${date.getFullYear()}`;
  }

  /**
   * Submit single date for NAV data fetch
   */
  submitSingleDate() {
    if (this.singleDate) {
      this.isLoading = true;
      const formattedDate = this.convertDateFormat(this.singleDate);
      this.navService.fetchNavData(formattedDate)
        .then(response => {
          this.isLoading = false;
          Swal.fire('Success', 'NAV data fetched successfully', 'success').then(() => {
            this.refreshList();
          });
        })
        .catch(error => {
          this.isLoading = false;
          this.showError('Failed to fetch NAV data');
        });
    } else {
      Swal.fire('Warning', 'Please select a date', 'warning');
    }
  }

  /**
   * Submit date range for historic NAV data fetch
   */
  submitDateRange() {
    if (this.startDate && this.endDate) {
      this.isLoading = true;
      const formattedStartDate = this.convertDateFormat(this.startDate);
      const formattedEndDate = this.convertDateFormat(this.endDate);
      this.navService.fetchHistoricNavData(formattedStartDate, formattedEndDate)
        .then(response => {
          this.isLoading = false;
          Swal.fire('Success', 'Historic NAV data fetched successfully', 'success').then(() => {
            this.refreshList();
          });
        })
        .catch(error => {
          this.isLoading = false;
          this.showError('Failed to fetch historic NAV data');
        });
    } else {
      Swal.fire('Warning', 'Please select both start and end dates', 'warning');
    }
  }

  /**
   * Delete NAV entry
   */
  async deleteAum(id: number) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await this.navService.deleteNav(id.toString());
        if (response.data.code === 1) {
          this.navInterfaceList = this.navInterfaceList.filter(item => item.id !== id);
          this.totalItems--;
          this.searchCache.clear();

          await Swal.fire('Deleted!', 'NAV has been deleted.', 'success');

          if (this.navInterfaceList.length === 0 && this.nextCursor) {
            this.loadNavList();
          }
        } else {
          throw new Error('Failed to delete NAV');
        }
      } catch (error) {
        console.error('Error deleting NAV:', error);
        this.showError('An error occurred while deleting the NAV');
      }
    }
  }

  /**
   * Refresh the list
   */
  refreshList() {
    this.searchCache.clear();
    this.resetPagination();
    this.loadNavList();
  }

  /**
   * Show error message
   */
  private showError(message: string) {
    Swal.fire('Error', message, 'error');
  }

  /**
   * Handle API fallback if PostgreSQL function fails
   */
  async handleSearchFallback() {
    try {
      const response = await this.navService.listNavFallback(
        this.itemsPerPage,
        this.currentSearchTerm,
        this.currentCursor || ''
      ).toPromise();

      this.handleResponse(response);
    } catch (error) {
      console.error('Fallback search also failed:', error);
      this.showError('Search functionality is temporarily unavailable');
    }
  }

  /**
   * Handle large datasets
   */
  handleLargeDataset() {
    if (this.totalItems > 10000) {
      console.warn('Large dataset detected. Consider implementing virtual scrolling.');
    }
  }
}
