import { Component, OnInit } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { cilPen, cilTrash, cilCheck } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { 
  TooltipDirective, RowComponent, ColComponent, TextColorDirective, 
  CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, 
  FormLabelDirective, FormControlDirective, ButtonDirective, TableDirective, 
  TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, 
  PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective 
} from '@coreui/angular';
import { CourierService } from '../../../common-service/courier/courier.service';
import { courierCommonInterface } from '../../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-list-courier',
  standalone: true,
  imports: [
    NgClass, CommonModule, TooltipDirective, IconDirective, RouterLink, 
    RowComponent, ColComponent, TextColorDirective, CardComponent, 
    CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, 
    FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, 
    NgStyle, TableDirective, TableColorDirective, TableActiveDirective, 
    BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, 
    PageLinkDirective, PageItemDirective
  ],
  templateUrl: './list-courier.component.html',
  styleUrl: './list-courier.component.scss'
})
export class ListCourierComponent implements OnInit {
  icons = { cilPen, cilTrash, cilCheck };
  tooltipEditText = 'Edit';
  tooltipDeleteText = 'Delete';
  tooltipViewText = 'View Details';

  courierInterfaceList: courierCommonInterface[] = [];
  pageRange: number[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  loading = false;
  searchTerm: string = '';
  totalItems = 0;
  totalPages = 1;
  isLoading = false;
  nextCursor: string | null = null;
  prevCursors: string[] = [];
  private searchTerms = new Subject<string>();
  currentSearchTerms: { [key: string]: string } = {};
  private unsubscribe$ = new Subject<void>();

  constructor(private courierService: CourierService) {}

  ngOnInit() {
    this.loadCourierList();
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
      this.loadCourierList();
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
      this.loadCourierList();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCourierList();
    }
  }

  async loadCourierList() {
    if (this.isLoading) return;

    this.isLoading = true;
    this.courierService.listsCourier(this.currentPage, this.itemsPerPage, this.searchTerm)
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
      this.courierInterfaceList = response.data;
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

  get paginatedCourierList() {
    return this.courierInterfaceList;
  }

  async deleteCourier(id: number) {
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
      this.loading = true;
      try {
        const response = await this.courierService.deleteCourier(id.toString());
        if (response.data.code === 1) {
          await Swal.fire('Deleted!', 'Courier has been deleted.', 'success');
          await this.loadCourierList(); // Reload the list
        } else {
          throw new Error(response.data.message || 'Failed to delete courier');
        }
      } catch (error) {
        console.error('Error deleting courier:', error);
        await Swal.fire('Error', error instanceof Error ? error.message : 'An error occurred while deleting the courier', 'error');
      } finally {
        this.loading = false;
      }
    }
  }
}