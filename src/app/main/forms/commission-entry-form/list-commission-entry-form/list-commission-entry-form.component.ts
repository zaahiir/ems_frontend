import { Component, OnInit } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { cilPen, cilTrash, } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TooltipDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective,  TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective  } from '@coreui/angular';
import { CommissionEntryFormService } from '../../../common-service/commission-entry-form/commission-entry-form.service';
import { commissionMasterCommonInterface } from '../../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list-commission-entry-form',
  standalone: true,
  imports: [NgClass, CommonModule, TooltipDirective, IconDirective, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, NgStyle,  TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective ],
  templateUrl: './list-commission-entry-form.component.html',
  styleUrl: './list-commission-entry-form.component.scss'
})

export class ListCommissionEntryFormComponent implements OnInit {
  icons = { cilPen, cilTrash, };
  tooltipEditText = 'Edit';
  tooltipDeleteText = 'Delete';

  commissionList: commissionMasterCommonInterface[] = [];
  pageRange: number[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  totalPages = 1;
  isLoading = false;
  searchTerm: string = '';
  nextCursor: string | null = null;
  prevCursors: string[] = [];
  private searchTerms = new Subject<string>();
  currentSearchTerms: { [key: string]: string } = {};
  private unsubscribe$ = new Subject<void>();

  constructor(private commissionEntryService: CommissionEntryFormService) {}

  ngOnInit() {
    this.loadCommissionList();
    this.setupSearch();
  }

  setupSearch() {
    this.searchTerms.pipe(
      takeUntil(this.unsubscribe$),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.searchTerm = searchTerm;
      this.resetPagination();
      this.loadCommissionList();
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
      this.loadCommissionList();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCommissionList();
    }
  }

  async loadCommissionList() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.commissionEntryService.listsCommission(this.currentPage, this.itemsPerPage, this.searchTerm)
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
      this.commissionList = response.data;
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

  get paginatedCommissionList() {
    return this.commissionList;
  }

  async deleteCommission(id: number) {
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
        const response = await this.commissionEntryService.deleteCommission(id.toString());
        if (response.data.code === 1) {
          await Swal.fire('Deleted!', 'COMMISSION has been deleted.', 'success');
          await this.loadCommissionList();
        } else {
          await Swal.fire('Error', 'Failed to delete COMMISSION', 'error');
        }
      } catch (error) {
        console.error('Error deleting COMMISSION:', error);
        await Swal.fire('Error', 'An error occurred while deleting the COMMISSION', 'error');
      }
    }
  }
}