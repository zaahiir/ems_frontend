import { Component, OnInit } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { cilPen, cilTrash, } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TooltipDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective,  TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective  } from '@coreui/angular';
import { AumEntryYoyGrowthService } from '../../../common-service/aum-entry-yoy-growth/aum-entry-yoy-growth.service';
import { aumYoyGrowthEntryCommonInterface, amcMasterCommonInterface } from '../../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list-aum-entry-yoy-growth',
  standalone: true,
  imports: [NgClass, CommonModule, TooltipDirective, IconDirective, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, NgStyle,  TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective ],
  templateUrl: './list-aum-entry-yoy-growth.component.html',
  styleUrl: './list-aum-entry-yoy-growth.component.scss'
})

export class ListAumEntryYoyGrowthComponent implements OnInit {
  icons = { cilPen, cilTrash, };
  tooltipEditText = 'Edit';
  tooltipDeleteText = 'Delete';

  aumYoyInterfaceList: aumYoyGrowthEntryCommonInterface[] = [];
  pageRange: number[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchTerm: string = '';
  totalItems = 0;
  totalPages = 1;
  isLoading = false;
  nextCursor: string | null = null;
  prevCursors: string[] = [];
  private searchTerms = new Subject<string>();
  currentSearchTerms: { [key: string]: string } = {};
  private unsubscribe$ = new Subject<void>();

  constructor(private aumEntryYoyGrowthService: AumEntryYoyGrowthService) {}

  ngOnInit() {
    this.loadAumList();
    this.setupSearch();
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
    ).subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.resetPagination();
      this.loadAumList();
    });
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerms.next(target.value);
  }

  resetPagination() {
    this.currentPage = 1;
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadAumList();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadAumList();
    }
  }

  loadAumList() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.aumEntryYoyGrowthService.listsAumYoyGrowthEntry(this.currentPage, this.itemsPerPage, this.searchTerm)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        response => {
          this.handleResponse(response);
        },
        error => {
          this.handleError(error);
        }
      );
  }

  handleResponse(response: any) {
    this.isLoading = false;
    if (response && response.code === 1 && Array.isArray(response.data)) {
      this.aumYoyInterfaceList = response.data;
      this.totalItems = response.total_count || 0;
      this.totalPages = response.total_pages || 1;
      this.currentPage = response.current_page || 1;
    } else {
      console.error('Unexpected API response structure:', response);
      Swal.fire('Error', 'Failed to load AUM list: Unexpected API response structure', 'error');
    }
  }

  handleError(error: any) {
    this.isLoading = false;
    console.error('Error loading AUM list:', error);
    Swal.fire('Error', 'An error occurred while loading the AUM list', 'error');
  }

  get paginatedAumList() {
    return this.aumYoyInterfaceList;
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
        const response = await this.aumEntryYoyGrowthService.deleteAumYoyGrowthEntry(id.toString());
        if (response.data.code === 1) {
          await Swal.fire('Deleted!', 'AUM has been deleted.', 'success');
          await this.loadAumList(); // Reload the list
        } else {
          await Swal.fire('Error', 'Failed to delete AUM', 'error');
        }
      } catch (error) {
        console.error('Error deleting AUM:', error);
        await Swal.fire('Error', 'An error occurred while deleting the AUM', 'error');
      }
    }
  }
}