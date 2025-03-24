import { Component, OnInit } from '@angular/core';
import { NgClass, NgStyle, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { cilPen, cilTrash } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TooltipDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective } from '@coreui/angular';
import { EmployeeService } from '../../../main/common-service/employee/employee.service';
import { employeeCommonInterface } from '../../../main/interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-employees',
  standalone: true,
  imports: [NgClass, CommonModule, TooltipDirective, IconDirective, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, ButtonDirective, NgStyle, TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective, PageItemDirective],
  templateUrl: './list-employees.component.html',
  styleUrl: './list-employees.component.scss'
})
export class ListEmployeesComponent implements OnInit {
  icons = { cilPen, cilTrash };
  tooltipEditText = 'Edit';
  tooltipDeleteText = 'Delete';

  employeeList: employeeCommonInterface[] = [];
  pageRange: number[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  searchTerm: string = '';

  constructor(private employeeService: EmployeeService) {}

  updatePageRange() {
    const totalPages = this.totalPages;
    let start = Math.max(1, this.currentPage - 1);
    let end = Math.min(totalPages, start + 2);

    if (end === totalPages) {
      start = Math.max(1, totalPages - 2);
    }

    this.pageRange = Array.from({ length: Math.min(3, totalPages) }, (_, i) => start + i);
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

  ngOnInit() {
    this.loadEmployeeList();
  }

  loadEmployeeList() {
    this.employeeService.listsEmployee('0')
      .then(response => {
        if (response.data.code === 1) {
          this.employeeList = response.data.data.map((employee: any) => ({
            ...employee,
            fullMobile: employee.full_mobile // Use the new field from the serializer
          }));
          this.updatePageRange();
        } else{
          Swal.fire('Error', 'Failed to load AUM list', 'error');
        }
      })
      .catch(error => {
        console.error('Error loading AUM list:', error);
        Swal.fire('Error', 'An error occurred while loading the AUM list', 'error');
      });
  }

  search() {
    this.currentPage = 1; // Reset to first page when searching
    this.updatePageRange();
  }

  get paginatedEmployeeList(): employeeCommonInterface[] {
    let filtered = this.employeeList;
    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      filtered = this.employeeList.filter(employee => {
        return employee.employeeName.toLowerCase().includes(searchTermLower) ||
               employee.employeeEmail.toLowerCase().includes(searchTermLower) ||
               employee.fullMobile.toLowerCase().includes(searchTermLower) ||
               employee.employeeAddress.toLowerCase().includes(searchTermLower);
      });
    }
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return filtered.slice(startIndex, startIndex + this.itemsPerPage);
  }
  
  get totalPages(): number {
    const filteredLength = this.searchTerm ?
      this.employeeList.filter(employee => {
        const searchTermLower = this.searchTerm.toLowerCase();
        return employee.employeeName.toLowerCase().includes(searchTermLower) ||
               employee.employeeEmail.toLowerCase().includes(searchTermLower) ||
               employee.fullMobile.toLowerCase().includes(searchTermLower) ||
               employee.employeeAddress.toLowerCase().includes(searchTermLower);
      }).length :
      this.employeeList.length;
    return Math.ceil(filteredLength / this.itemsPerPage);
  }

  deleteForm(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeService.deleteEmployee(id.toString())
          .then(response => {
            Swal.fire('Deleted!', 'Form has been deleted.', 'success');
            this.loadEmployeeList(); // Reload the list
          })
          .catch(error => {
            console.error('Error deleting form:', error);
            Swal.fire('Error', 'An error occurred while deleting the form', 'error');
          });
      }
    });
  }
}
