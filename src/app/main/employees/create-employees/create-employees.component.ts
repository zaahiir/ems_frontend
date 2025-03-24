import { Component, OnInit } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { EmployeeService } from '../../../main/common-service/employee/employee.service';
import { userTypeMasterCommonInterface, countryInterface } from '../../../main/interfaces/interfaces';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employees',
  standalone: true,
  imports: [NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, TextColorDirective, CardComponent, FormFloatingDirective, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './create-employees.component.html',
  styleUrl: './create-employees.component.scss'
})
export class CreateEmployeesComponent implements OnInit {

  customStylesValidated = false;
  employeeCreateForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  selectedFile: File | null = null;
  fileError: string | null = null;

  userType: userTypeMasterCommonInterface[] = [];
  countries: countryInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
  ) {
    this.employeeCreateForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeEmail: ['', [Validators.required, Validators.email]],
      employeeCountryCode: ['', Validators.required],
      employeePhone: ['', [Validators.required, this.phoneNumberValidator]],
      employeePassword: ['', [Validators.required, Validators.minLength(6)]],
      employeeAddress: ['', Validators.required],
      employeeOtherDetail: ['', Validators.required],
      employeeUserType: ['', Validators.required],
      employeeFile: [null, Validators.required]
    });
  }

  phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    const valid = /^\d{10}$/.test(value);
    return valid ? null : { invalidPhone: true };
  }
 
  ngOnInit(): void {
    this.loadUserTypeData();
    this.loadCountryData();
  }

  // Convenience getter for easy access to form fields
  get f() { return this.employeeCreateForm.controls; }

  loadUserTypeData() {
    this.employeeService.getUserType()
      .then(response => {
        this.userType = response.data;
      })
      .catch(error => console.error('Error loading userType data:', error));
  }

  loadCountryData() {
    this.employeeService.getCountries()
      .then(response => {
        this.countries = response.data;
      })
      .catch(error => console.error('Error loading country data:', error));
  }

  validateFileType(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'application/pdf'];
    return allowedTypes.includes(file.type);
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.validateFileType(file)) {
        this.selectedFile = file;
        this.fileError = null;
      } else {
        this.selectedFile = null;
        this.fileError = 'Please choose a JPG, JPEG, or PDF file.';
      }
    } else {
      this.selectedFile = null;
      this.fileError = 'Please choose a file.';
    }
  }

  onSubmit() {
    this.customStylesValidated = true;
    this.submitted = true;

    if (this.employeeCreateForm.invalid || !this.selectedFile) {
      const missingFields = this.getMissingFields();
      if (missingFields.length > 0) {
        Swal.fire({
          title: 'Validation Error',
          html: `Please correct the following issues:<br><br>${missingFields.join('<br>')}`,
          icon: 'error'
        });
      }
      return;
    }

    const formData = new FormData();
    formData.append('employeeName', this.f['employeeName'].value);
    formData.append('employeeEmail', this.f['employeeEmail'].value);
    formData.append('employeeCountryCode', this.f['employeeCountryCode'].value);
    formData.append('employeePhone', this.f['employeePhone'].value);
    formData.append('employeePassword', this.f['employeePassword'].value);
    formData.append('employeeAddress', this.f['employeeAddress'].value);
    formData.append('employeeOtherDetail', this.f['employeeOtherDetail'].value);
    formData.append('employeeUserType', this.f['employeeUserType'].value);
    formData.append('employeeFile', this.selectedFile, this.selectedFile.name);
    formData.append('hideStatus', '0');

    const id = "0";
    this.loading = true;
    this.employeeService.processEmployee(formData, id).then(response => {
      if (response.data['code'] === 1) {
        Swal.fire("Added!", response.data['message'], "success").then(() => {
          this.router.navigate(['/employees']);
        });
      } else {
        Swal.fire("Failed!", response.data['message'], "error");
      }
    })
    .catch(error => {
      Swal.fire("Failed!", error.message || "An unknown error occurred", "error");
    })
    .finally(() => {
      this.loading = false;
    });
  }

  getMissingFields(): string[] {
    const missingFields: string[] = [];
    Object.keys(this.f).forEach(key => {
      const control = this.f[key];
      if (control && control.errors) {
        if (control.errors['required']) {
          missingFields.push(this.getFieldName(key));
        } else if (key === 'employeePhone' && control.errors['invalidPhone']) {
          missingFields.push('Phone Number (must be 10 digits)');
        }
      }
    });
    if (!this.selectedFile) {
      missingFields.push('Employee File');
    }
    return missingFields;
  }

  getFieldName(key: string): string {
    const fieldNames: { [key: string]: string } = {
      employeeName: 'Employee Name',
      employeeEmail: 'Employee Email',
      employeeCountryCode: 'Country Code',
      employeePhone: 'Phone Number',
      employeePassword: 'Password',
      employeeAddress: 'Address',
      employeeOtherDetail: 'Other Details',
      employeeUserType: 'User Type'
    };
    return fieldNames[key] || key;
  }

  onReset() {
    this.customStylesValidated = false;
    this.submitted = false;
    this.selectedFile = null;
    this.fileError = null;
    this.employeeCreateForm.reset();
  }
}