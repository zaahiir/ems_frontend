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
import { takeUntil, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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
  searchTerms = new Subject<string>();
  activeMode: 'single' | 'historic' | null = null;
  singleDate: string = '';
  startDate: string = '';
  endDate: string = '';
  isLoading: boolean = false;
  nextCursor: string | null = null;
  currentCursor: string | null = null;
  prevCursors: string[] = [];
  currentSearchTerm: string = '';
  currentData: navCommonInterface[][] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private navService: NavService) {}

  ngOnInit() {
    this.loadNavList();
    this.setupSearch();
    this.loadTotalCount();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  setupSearch() {
    this.searchTerms.pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.currentSearchTerm = term;
      this.resetPagination();
      this.loadNavList();
    });
  }

  handleSearchResponse(response: any) {
    this.isLoading = false;
    if (response.data && Array.isArray(response.data.data)) {
      this.navInterfaceList = response.data.data;
      this.totalItems = response.data.total_count || this.navInterfaceList.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      this.currentPage = 1;
      this.nextCursor = null;
      this.prevCursors = [];
    } else {
      console.error('Unexpected API response structure:', response);
      throw new Error('Failed to load NAV list: Unexpected API response structure');
    }
  }

  loadNavList() {
    this.isLoading = true;
    this.navService.listsNav(this.itemsPerPage, this.currentSearchTerm, this.currentCursor || '')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.handleResponse(response);
          if (!this.currentCursor) {
            this.loadTotalCount();
          }
        },
        error => {
          this.handleError(error);
        }
      );
  }

  loadTotalCount() {
    this.navService.getTotalCount(this.currentSearchTerm)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        count => {
          this.totalItems = count;
          this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
        },
        error => {
          console.error('Error loading total count:', error);
        }
      );
  }

  handleResponse(response: any) {
    this.isLoading = false;
    if (response.data && Array.isArray(response.data.data)) {
      this.navInterfaceList = response.data.data;
      this.nextCursor = response.data.next_cursor;
    } else {
      console.error('Unexpected API response structure:', response);
      throw new Error('Failed to load NAV list: Unexpected API response structure');
    }
  }

  handleError(error: any) {
    this.isLoading = false;
    if (error.code !== 'ERR_CANCELED') {
      console.error('Error loading NAV list:', error);
      Swal.fire('Error', 'An error occurred while loading the NAV list', 'error');
    }
  }

  nextPage() {
    if (this.nextCursor) {
      this.currentCursor = this.nextCursor;
      this.currentPage++;
      this.loadNavList();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.navInterfaceList.length > 0) {
        // Use the ID of the first item in the current list + 1
        this.currentCursor = (this.navInterfaceList[0].id + 1).toString();
      } else {
        this.currentCursor = null;
      }
      this.loadNavList();
    }
  }

  search(term: string) {
    this.searchTerms.next(term);
    this.resetPagination();
  }

  resetPagination() {
    this.currentCursor = null;
    this.currentPage = 1;
    this.nextCursor = null;
  }

  getPageRange(): number[] {
    const range = 1; // This will give us 3 page numbers in total
    let start = Math.max(1, this.currentPage - range);
    let end = Math.min(this.totalPages, this.currentPage + range);

    // Adjust start and end to always show 3 pages if possible
    if (end - start + 1 < 3) {
      if (start === 1) {
        end = Math.min(3, this.totalPages);
      } else if (end === this.totalPages) {
        start = Math.max(1, this.totalPages - 2);
      }
    }

    return Array.from({length: end - start + 1}, (_, i) => start + i);
  }

  activateMode(mode: 'single' | 'historic') {
    this.activeMode = mode;
  }

  resetMode() {
    this.activeMode = null;
    this.singleDate = '';
    this.startDate = '';
    this.endDate = '';
  }

  convertDateFormat(dateString: string): string {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${date.getDate().toString().padStart(2, '0')}-${months[date.getMonth()]}-${date.getFullYear()}`;
  }  

  submitSingleDate() {
    if (this.singleDate) {
      this.isLoading = true;
      const formattedDate = this.convertDateFormat(this.singleDate);
      this.navService.fetchNavData(formattedDate)
        .then(response => {
          this.isLoading = false;
          Swal.fire('Success', 'NAV data fetched successfully', 'success').then(() => {
            window.location.reload();
          });
        })
        .catch(error => {
          this.isLoading = false;
          Swal.fire('Error', 'Failed to fetch NAV data', 'error');
        });
    } else {
      Swal.fire('Warning', 'Please select a date', 'warning');
    }
  }
  
  submitDateRange() {
    if (this.startDate && this.endDate) {
      // Remove this validation block
      /*
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      const oneYearLater = new Date(start);
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
  
      if (end > oneYearLater) {
        Swal.fire({
          title: 'Date Range Too Large',
          text: 'Please select a date range of 1 year or less.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
        return;
      }
      */
  
      this.isLoading = true;
      const formattedStartDate = this.convertDateFormat(this.startDate);
      const formattedEndDate = this.convertDateFormat(this.endDate);
      this.navService.fetchHistoricNavData(formattedStartDate, formattedEndDate)
        .then(response => {
          this.isLoading = false;
          Swal.fire('Success', 'Historic NAV data fetched successfully', 'success').then(() => {
            window.location.reload();
          });
        })
        .catch(error => {
          this.isLoading = false;
          Swal.fire('Error', 'Failed to fetch historic NAV data', 'error');
        });
    } else {
      Swal.fire('Warning', 'Please select both start and end dates', 'warning');
    }
  }

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
          await Swal.fire('Deleted!', 'NAV has been deleted.', 'success');
          
          // If the list is now empty and there's a next cursor, load the next batch
          if (this.navInterfaceList.length === 0 && this.nextCursor) {
            this.loadNavList();
          }
        } else {
          throw new Error('Failed to delete NAV');
        }
      } catch (error) {
        console.error('Error deleting NAV:', error);
        await Swal.fire('Error', 'An error occurred while deleting the NAV', 'error');
      }
    }
  }

  refreshList() {
    this.resetPagination();
    this.loadNavList();
  }
}