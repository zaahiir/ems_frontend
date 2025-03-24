import { Component, OnInit } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { cilPen, cilTrash } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TooltipDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective,  TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective  } from '@coreui/angular';
import { ArnMasterFormService } from '../../../common-service/arn-master-form/arn-master-form.service';
import { arnMasterCommonInterface } from '../../../interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-arn-master-form',
  standalone: true,
  imports: [NgClass, CommonModule, TooltipDirective, IconDirective, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, NgStyle,  TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective ],
  templateUrl: './list-arn-master-form.component.html',
  styleUrl: './list-arn-master-form.component.scss'
})
export class ListArnMasterFormComponent implements OnInit {
  icons = { cilPen, cilTrash };
  tooltipEditText = 'Edit';
  tooltipDeleteText = 'Delete';

  arnList: arnMasterCommonInterface[] = [];
  pageRange: number[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  isLoading = false;
  searchTerm: string = '';

  constructor(private arnMasterFormService: ArnMasterFormService) {}

  ngOnInit() {
    this.loadArnList();
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
    if (page >= 1 && page <= this.totalPages && !this.isLoading) {
      this.currentPage = page;
      this.updatePageRange();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages && !this.isLoading) {
      this.changePage(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 1 && !this.isLoading) {
      this.changePage(this.currentPage - 1);
    }
  }

  async loadArnList() {
    if (this.isLoading) return;

    this.isLoading = true;
    try {
      const response = await this.arnMasterFormService.listsArn('0');
      if (response.data.code === 1) {
        this.arnList = response.data.data.map((arn: any) => ({
          ...arn,
          fullMobile: arn.full_mobile // Use the new field from the serializer
        }));
        this.updatePageRange();
      } else {
        await Swal.fire('Error', 'Failed to load ARN list', 'error');
      }
    } catch (error) {
      console.error('Error loading ARN list:', error);
      await Swal.fire('Error', 'An error occurred while loading the ARN list', 'error');
    } finally {
      this.isLoading = false;
    }
  }

  search() {
    this.currentPage = 1; // Reset to first page when searching
    this.updatePageRange();
  }

  get paginatedArnList() {
    let filtered = this.arnList;
    if (this.searchTerm) {
      filtered = this.arnList.filter(arnList => 
        arnList.arnNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        arnList.arnName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        arnList.fullMobile.toLowerCase().includes(this.searchTerm.toLowerCase()) // Use fullMobile for searching
      );
    }
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    const filteredLength = this.searchTerm ? 
      this.arnList.filter(arnList => 
        arnList.arnNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        arnList.arnName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        arnList.arnMobile.toLowerCase().includes(this.searchTerm.toLowerCase())
      ).length : 
      this.arnList.length;
    return Math.ceil(filteredLength / this.itemsPerPage);
  }

  async deleteArn(id: number) {
    if (this.isLoading) return;
  
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
      this.isLoading = true;
      try {
        const response = await this.arnMasterFormService.deleteArn(id.toString());
        if (response.data.code === 1) {
          // Immediately update the frontend by removing the deleted ARN from the list
          this.arnList = this.arnList.filter(arn => arn.id !== id);
  
          await Swal.fire('Deleted!', 'ARN has been deleted.', 'success');
  
          // Optionally, reload the ARN list from the backend to keep things in sync
          await this.loadArnList();
        } else {
          await Swal.fire('Error', 'Failed to delete ARN', 'error');
        }
      } catch (error) {
        console.error('Error deleting ARN:', error);
        await Swal.fire('Error', 'An error occurred while deleting the ARN', 'error');
      } finally {
        this.isLoading = false;
      }
    }
  }
  
}