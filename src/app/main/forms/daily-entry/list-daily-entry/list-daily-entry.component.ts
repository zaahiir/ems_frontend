import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { cilPen, cilTrash } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TooltipDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective, SpinnerModule } from '@coreui/angular';
import { DailyEntryService } from '../../../common-service/daily-entry/daily-entry.service';
import { dailyEntryCommonInterface } from '../../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-list-daily-entry',
  standalone: true,
  imports: [NgClass, CommonModule, TooltipDirective, IconDirective, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective, SpinnerModule],
  templateUrl: './list-daily-entry.component.html',
  styleUrl: './list-daily-entry.component.scss'
})

export class ListDailyEntryComponent implements OnInit, OnDestroy {
  icons = { cilPen, cilTrash };
  tooltipEditText = 'Edit';
  tooltipDeleteText = 'Delete';

  dailyEntryList: dailyEntryCommonInterface[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 1;
  searchTerm: string = '';
  isLoading = false;
  nextCursor: string | null = null;
  prevCursors: string[] = [];
  private searchTerms = new Subject<string>();
  currentSearchTerms: { [key: string]: string } = {};
  private unsubscribe$ = new Subject<void>();

  constructor(private dailyEntryService: DailyEntryService) {}

  ngOnInit() {
    this.loadDailyEntries();
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
      this.loadDailyEntries();
    });
  }

  search(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerms.next(target.value);
  }

  resetPagination() {
    this.currentPage = 1;
  }

  loadDailyEntries() {
    this.isLoading = true;
    this.dailyEntryService.listDailyEntries(this.currentPage, this.itemsPerPage, this.searchTerm)
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
      this.dailyEntryList = response.data;
      this.totalItems = response.total_count || 0;
      this.totalPages = response.total_pages || 1;
      this.currentPage = response.current_page || 1;
    } else {
      throw new Error('Failed to load Daily Entry list: Unexpected API response structure');
    }
  }
  
  updateTotalItems() {
    this.dailyEntryService.getTotalCount(this.searchTerm).subscribe(
      count => {
        this.totalItems = count;
        this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      },
      error => {
        console.error('Error fetching total count:', error);
      }
    );
  }

  handleError(error: any) {
    this.isLoading = false;
    Swal.fire('Error', 'An error occurred while loading the Daily Entry list', 'error');
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadDailyEntries();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadDailyEntries();
    }
  }

  async deleteDailyEntry(id: number) {
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
        const response = await this.dailyEntryService.deleteDailyEntry(id.toString()).toPromise();
        if (response && response.code === 1) {
          this.dailyEntryList = this.dailyEntryList.filter(item => item.id !== id);
          await Swal.fire('Deleted!', 'Daily Entry has been deleted.', 'success');
          if (this.dailyEntryList.length === 0 && this.currentPage > 1) {
            this.previousPage();
          } else {
            this.loadDailyEntries();
          }
        } else {
          throw new Error('Failed to delete Daily Entry');
        }
      } catch (error) {
        await Swal.fire('Error', 'An error occurred while deleting the Daily Entry', 'error');
      }
    }
  }
}