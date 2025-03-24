import { Component, OnInit } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { cilPen, cilTrash } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TooltipDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective } from '@coreui/angular';
import { AmcMasterFormService } from '../../../common-service/amc-master-form/amc-master-form.service';
import { amcMasterCommonInterface } from '../../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { AxiosResponse } from 'axios';

@Component({
  selector: 'app-list-amc-master-form',
  standalone: true,
  imports: [NgClass, CommonModule, TooltipDirective, IconDirective, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, NgStyle, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective],
  templateUrl: './list-amc-master-form.component.html',
  styleUrl: './list-amc-master-form.component.scss'
})

export class ListAmcMasterFormComponent implements OnInit {
  icons = { cilPen, cilTrash };
  tooltipEditText = 'Edit';
  tooltipDeleteText = 'Delete';

  amcList: amcMasterCommonInterface[] = [];
  filteredAmcList: amcMasterCommonInterface[] = [];
  pageRange: number[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchTerm: string = '';

  constructor(private amcMasterFormService: AmcMasterFormService) {}

  async ngOnInit() {
    await this.loadAmcList();
  }

  updatePageRange() {
    const totalPages = this.totalPages;
    let start = Math.max(1, this.currentPage - 1);
    let end = Math.min(totalPages, start + 2);

    if (end === totalPages) {
      start = Math.max(1, totalPages - 2);
    }

    this.pageRange = Array.from({length: Math.min(3, totalPages)}, (_, i) => start + i);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePageRange();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.changePage(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.changePage(this.currentPage - 1);
    }
  }

  async loadAmcList() {
    try {
      const response: AxiosResponse = await this.amcMasterFormService.listsAmc('0');
      if (response.data.code === 1) {
        this.amcList = response.data.data;
        this.applyFilter();
        
        // Adjust current page if it exceeds the new total pages
        const newTotalPages = Math.ceil(this.filteredAmcList.length / this.itemsPerPage);
        if (this.currentPage > newTotalPages) {
          this.currentPage = Math.max(1, newTotalPages);
        }
        
        this.updatePageRange();
      } else {
        await this.showError('Failed to load AMC list');
      }
    } catch (error) {
      console.error('Error loading AMC list:', error);
      await this.showError('An error occurred while loading the AMC list');
    }
  }

  search() {
    this.currentPage = 1; // Reset to first page when searching
    this.applyFilter();
    this.updatePageRange();
  }

  applyFilter() {
    if (this.searchTerm) {
      this.filteredAmcList = this.amcList.filter(amc => 
        amc.amcAddress.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        amc.amcName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredAmcList = [...this.amcList];
    }
  }

  get paginatedAmcList() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAmcList.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.filteredAmcList.length / this.itemsPerPage);
  }

  async deleteAmc(id: number) {
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
        const response: AxiosResponse = await this.amcMasterFormService.deleteAmc(id.toString());
        if (response.data.code === 1) {
          await Swal.fire('Deleted!', 'AMC has been deleted.', 'success');
          
          // Store current page and items count before reload
          const currentItemsCount = this.filteredAmcList.length;
          const isLastItemOnPage = this.paginatedAmcList.length === 1;
          
          // Reload the list
          await this.loadAmcList();
          
          // Adjust current page if necessary
          if (isLastItemOnPage && this.currentPage > 1 && currentItemsCount === this.itemsPerPage * this.currentPage) {
            this.currentPage--;
          }
          
          // Apply filters and update pagination
          this.applyFilter();
          this.updatePageRange();
        } else {
          await this.showError('Failed to delete AMC');
        }
      } catch (error) {
        console.error('Error deleting AMC:', error);
        await this.showError('An error occurred while deleting the AMC');
      }
    }
  }

  private async showError(message: string) {
    await Swal.fire('Error', message, 'error');
  }
}
