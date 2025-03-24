import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgStyle, CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { EmployeeService } from '../../common-service/employee/employee.service';
import { userTypeMasterCommonInterface, employeeCommonInterface, countryInterface } from '../../interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [
    CommonModule, NgStyle, ReactiveFormsModule, FormsModule, RowComponent, ColComponent,
    TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormFloatingDirective, 
    FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective,
    FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, 
    ListGroupItemDirective
  ],
  templateUrl: './update-employees.component.html',
  styleUrls: ['./update-employees.component.scss']
})
export class UpdateEmployeesComponent implements OnInit {
  customStylesValidated = false;
  employeeUpdateForm!: FormGroup;
  passwordUpdateForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  passwordSubmitted: boolean = false;
  selectedFile: File | null = null;
  fileError: string | null = null;
  userTypes: userTypeMasterCommonInterface[] = [];
  countries: countryInterface[] = [];
  employeeId: string = '0';
  currentFileName: string = 'No file currently uploaded';
  fileUrl: string | null = null;
  showPasswordForm: boolean = false;
  isImageFile: boolean = false;
  isPdfFile: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public employeeService: EmployeeService,
    private cdr: ChangeDetectorRef
  ) {
    this.employeeUpdateForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeEmail: ['', [Validators.required, Validators.email]],
      employeeCountryCode: ['', Validators.required],
      employeePhone: ['', [Validators.required, this.phoneNumberValidator]],
      employeeAddress: ['', Validators.required],
      employeeOtherDetail: [''],
      employeeUserType: ['', Validators.required],
      employeeFile: [null]
    });

    this.passwordUpdateForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadUserTypes();
    await this.loadCountries();
    this.route.params.subscribe(async params => {
      this.employeeId = params['id'] || '0';
      await this.loadEmployeeData(this.employeeId);
    });
  }

  get f() { return this.employeeUpdateForm.controls; }
  get passwordForm() { return this.passwordUpdateForm.controls; }

  async loadUserTypes(): Promise<void> {
    try {
      const response = await this.employeeService.getUserType();
      this.userTypes = response.data;
      this.cdr.detectChanges();
    } catch (error) {
      await Swal.fire('Error', 'Failed to load User Types', 'error');
    }
  }

  async loadCountries(): Promise<void> {
    try {
      const response = await this.employeeService.getCountries();
      this.countries = response.data;
      this.cdr.detectChanges();
    } catch (error) {
      await Swal.fire('Error', 'Failed to load Countries', 'error');
    }
  }

  async loadEmployeeData(employeeId: string): Promise<void> {
    try {
      const response = await this.employeeService.listsEmployee(employeeId);
      if (response.data.code === 1 && response.data.data.length > 0) {
        const employeeData: employeeCommonInterface = response.data.data[0];
        const userTypeId = this.userTypes.find(ut => String(ut.userTypeName) === String(employeeData.employeeUserType))?.id;
        const countryId = employeeData.employeeCountryCode;
        
        this.employeeUpdateForm.patchValue({
          employeeName: employeeData.employeeName,
          employeeEmail: employeeData.employeeEmail,
          employeeCountryCode: countryId,
          employeePhone: employeeData.employeePhone,
          employeeAddress: employeeData.employeeAddress,
          employeeOtherDetail: employeeData.employeeOtherDetail,
          employeeUserType: userTypeId,
        });
        
        // Handle file information
        if (employeeData.employeeFile || employeeData.employeePhotoUrl) {
          const fileUrl = employeeData.employeePhotoUrl || employeeData.employeeFile || '';
          this.fileUrl = this.employeeService.getFileUrl(fileUrl);
          this.currentFileName = this.getFileName(fileUrl);
          
          // Check file type
          const lowerCaseFileName = this.currentFileName.toLowerCase();
          this.isImageFile = lowerCaseFileName.endsWith('.jpg') || 
                             lowerCaseFileName.endsWith('.jpeg') || 
                             lowerCaseFileName.endsWith('.png');
          this.isPdfFile = lowerCaseFileName.endsWith('.pdf');
        }
        
        this.cdr.detectChanges();
      } 
    } catch (error) {
      await Swal.fire('Error', 'Failed to load employee data', 'error');
    }
  }
  
  getFileUrl(filePath: string | undefined): string {
    if (!filePath) return '';
    // Check if the URL already has the full domain
    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }
    // Otherwise, prepend the base URL
    return `https://backend.faiop.com/${filePath.startsWith('/') ? filePath.substring(1) : filePath}`;
  }
  
  getFileName(filePath: string | undefined): string {
    if (!filePath) return 'No file';
    return filePath.split('/').pop() || filePath;
  }

  validateFileType(file: File): boolean {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'application/pdf'];
    return allowedTypes.includes(file.type);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.validateFileType(file)) {
        this.selectedFile = file;
        this.currentFileName = file.name;
        this.fileError = null;
        
        // Update file type indicators
        const lowerCaseFileName = file.name.toLowerCase();
        this.isImageFile = lowerCaseFileName.endsWith('.jpg') || 
                           lowerCaseFileName.endsWith('.jpeg') || 
                           lowerCaseFileName.endsWith('.png');
        this.isPdfFile = lowerCaseFileName.endsWith('.pdf');
      } else {
        this.selectedFile = null;
        this.fileError = 'Please choose a JPG, JPEG, or PDF file.';
      }
    } else {
      this.selectedFile = null;
      // Don't reset currentFileName here as it might contain the existing file
      this.fileError = null;
    }
    this.cdr.detectChanges();
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;

    if (this.employeeUpdateForm.invalid) {
      const missingFields = this.getMissingFields();
      if (missingFields.length > 0) {
        await Swal.fire({
          title: 'Validation Error',
          html: `Please correct the following issues:<br><br>${missingFields.join('<br>')}`,
          icon: 'error'
        });
      }
      return;
    }
  
    const formData = new FormData();
    const formValues = this.employeeUpdateForm.value;
  
    // Add all form fields except file to FormData
    Object.keys(formValues).forEach(key => {
      if (key !== 'employeeFile') {
        formData.append(key, formValues[key] !== null ? formValues[key] : '');
      }
    });
    
    // Add file if selected
    if (this.selectedFile) {
      formData.append('employeeFile', this.selectedFile);
    }
  
    try {
      this.loading = true;
      const response = await this.employeeService.processEmployee(formData, this.employeeId);
      this.loading = false;
      
      if (response.data && response.data.code === 1) {
        await Swal.fire("Updated!", response.data.message, "success");
        this.router.navigate(['/employees']);
      } else {
        await Swal.fire("Failed!", response.data.message || "Unknown error occurred", "error");
      }
    } catch (error: any) {
      this.loading = false;
      const errorMessage = error.response?.data?.message || "An error occurred while updating the Employee entry.";
      await Swal.fire("Failed!", errorMessage, "error");
    }
  }

  phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;
    const valid = /^\d{10}$/.test(value);
    return valid ? null : { invalidPhone: true };
  }

  getMissingFields(): string[] {
    const missingFields: string[] = [];
    Object.keys(this.f).forEach(key => {
      const control = this.f[key];
      if (control && control.errors) {
        if (control.errors['required']) {
          missingFields.push(this.getFieldName(key));
        } else if (key === 'employeeEmail' && control.errors['email']) {
          missingFields.push('Invalid Email Format');
        } else if (key === 'employeePhone' && control.errors['invalidPhone']) {
          missingFields.push('Phone Number (must be 10 digits)');
        }
      }
    });
    return missingFields;
  }

  getFieldName(key: string): string {
    const fieldNames: { [key: string]: string } = {
      employeeName: 'Employee Name',
      employeeEmail: 'Employee Email',
      employeeCountryCode: 'Country Code',
      employeePhone: 'Phone Number',
      employeeAddress: 'Address',
      employeeUserType: 'User Type'
    };
    return fieldNames[key] || key;
  }

  onCancel(): void {
    this.customStylesValidated = false;
    this.router.navigate(['/employees']);
  }

  togglePasswordForm(): void {
    this.showPasswordForm = !this.showPasswordForm;
  }

  async onPasswordSubmit(): Promise<void> {
    this.passwordSubmitted = true;

    if (this.passwordUpdateForm.invalid) {
      return;
    }

    try {
      this.loading = true;
      const response = await this.employeeService.updateEmployeePassword(this.employeeId, this.passwordUpdateForm.value.newPassword);
      this.loading = false;
      
      if (response.data && response.data.code === 1) {
        await Swal.fire("Updated!", "Password updated successfully", "success");
        this.passwordUpdateForm.reset();
        this.passwordSubmitted = false;
        this.showPasswordForm = false;
        this.router.navigate(['/employees']);
      } else {
        await Swal.fire("Failed!", response.data.message || "Unknown error occurred", "error");
      }
    } catch (error: any) {
      this.loading = false;
      const errorMessage = error.response?.data?.message || "An error occurred while updating the password.";
      await Swal.fire("Failed!", errorMessage, "error");
    }
  }
}