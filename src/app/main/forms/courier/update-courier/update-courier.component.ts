import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { cilTrash } from '@coreui/icons';
import { IconDirective } from '@coreui/icons-angular';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TooltipDirective, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { CourierService } from '../../../common-service/courier/courier.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { clientCommonInterface, countryInterface } from '../../../interfaces/interfaces';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-courier',
  standalone: true,
  imports: [ TooltipDirective, IconDirective, NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, TextColorDirective, CardComponent, FormFloatingDirective, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './update-courier.component.html',
  styleUrl: './update-courier.component.scss'
})
export class UpdateCourierComponent implements OnInit {
  icons = { cilTrash };
  tooltipDeleteText = 'Remove';
  @ViewChild('fileInput') fileInput!: ElementRef;

  customStylesValidated = false;
  courierUpdateForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  selectedFiles: File[] = [];
  existingFiles: any[] = [];
  fileErrors: string[] = [];
  courierId: string = '';
  clients: clientCommonInterface[] = [];
  countries: countryInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private courierService: CourierService,
  ) { 
    this.initForm();
  }

  async ngOnInit(): Promise<void> {
    this.courierId = this.route.snapshot.params['id'];
    await this.loadClients();
    await this.loadCountries();
    await this.loadCourierData();
    await this.loadCourierFiles();
  }

  initForm(): void {
    this.courierUpdateForm = this.fb.group({
      courierClientName: ['', Validators.required],
      courierClientAddress: ['', Validators.required],
      courierCountryCode: ['', Validators.required],
      courierMobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      courierEmail: ['', [Validators.required, Validators.email]],
      courierFile: [null]
    });
  }

  get f() { return this.courierUpdateForm.controls; }

  async loadClients(): Promise<void> {
    try {
      this.clients = await this.courierService.getClientNames();
    } catch (error) {
      await Swal.fire("Error", "Failed to load clients", "error");
    }
  }

  async loadCountries(): Promise<void> {
    try {
      this.countries = await this.courierService.getCountries();
    } catch (error) {
      await Swal.fire("Error", "Failed to load countries", "error");
    }
  }

  async loadCourierData(): Promise<void> {
    try {
      const response = await this.courierService.getcourierById(this.courierId).toPromise();
  
      if (response && response.code === 1 && response.data) {
        const courierData = response.data;        
        
        const clientId = this.clients.find(a => String(a.clientName) === String(courierData.courierClientName))?.id;
        
        const countryId = courierData.courierCountryCode;
        const country = this.countries.find(c => c.id === countryId);

        this.courierUpdateForm.patchValue({
          courierClientName: clientId,
          courierClientAddress: courierData.courierClientAddress,
          courierCountryCode: countryId,
          courierMobileNumber: courierData.courierMobileNumber,
          courierEmail: courierData.courierEmail,
        });
      } else {
        await Swal.fire("Error", "Failed to load courier data", "error");
      }
    } catch (error) {
      await Swal.fire("Error", "Failed to load courier data", "error");
    }
  }

  async loadCourierFiles(): Promise<void> {
    try {
      const response = await this.courierService.listsCourierFiles(this.courierId);
      if (response.data.code === 1) {
        this.existingFiles = response.data.data;
        this.updateFormValidity();
      }
    } catch (error) {
      console.error('Error loading courier files:', error);
    }
  }

  getFileName(filePath: string): string {
    return filePath.split('/').pop() || filePath;
  }

  get hasFiles(): boolean {
    return this.existingFiles.length > 0 || this.selectedFiles.length > 0;
  }

  onFileChange(event: any): void {
    const files = event.target.files;
    this.selectedFiles = [];
    this.fileErrors = [];

    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/jpg',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv',
      'text/plain'
    ];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (allowedTypes.includes(file.type)) {
        this.selectedFiles.push(file);
      } else {
        this.fileErrors.push(`${file.name}: Invalid file type. Please select a PDF, Word document, JPEG, Excel, CSV, or text file.`);
      }
    }

    this.updateFormValidity();
  }

  updateFormValidity(): void {
    if (this.hasFiles) {
      this.courierUpdateForm.get('courierFile')?.setErrors(null);
    } else {
      this.courierUpdateForm.get('courierFile')?.setErrors({ required: true });
    }
  }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;
  
    const errors: string[] = [];

    // Check form validity
    Object.keys(this.courierUpdateForm.controls).forEach(key => {
      const control = this.courierUpdateForm.get(key);
      if (control?.invalid) {
        if (key === 'courierMobileNumber' && control.errors?.['pattern']) {
          errors.push('Mobile number must be exactly 10 digits.');
        } else {
          errors.push(`${key.charAt(0).toUpperCase() + key.slice(1)} is required.`);
        }
      }
    });

    // Check file validity
    if (!this.hasFiles) {
      errors.push('At least one file is required.');
    }

    if (errors.length > 0) {
      await Swal.fire({
        title: 'Form Validation Error',
        html: errors.join('<br>'),
        icon: 'error'
      });
      return;
    }
  
    const formData = new FormData();
    formData.append('courierClientName', this.f['courierClientName'].value);
    formData.append('courierClientAddress', this.f['courierClientAddress'].value);
    formData.append('courierCountryCode', this.f['courierCountryCode'].value);
    formData.append('courierMobileNumber', this.f['courierMobileNumber'].value);
    formData.append('courierEmail', this.f['courierEmail'].value);
  
    for (let i = 0; i < this.selectedFiles.length; i++) {
      formData.append('courierFile', this.selectedFiles[i], this.selectedFiles[i].name);
    }
  
    this.existingFiles.forEach(file => {
      formData.append('existingFileIds', file.id);
    });
  
    this.loading = true;
  
    try {
      const response = await lastValueFrom(this.courierService.processCourier(formData, this.courierId));
      if (response.code === 1) {
        await Swal.fire("Updated!", response.message, "success");
        this.router.navigate(['/forms/courier']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      console.error('Error updating Courier:', error);
      await Swal.fire("Failed!", "An error occurred while updating the Courier", "error");
    } finally {
      this.loading = false;
    }
  }

  async removeFile(fileId: string): Promise<void> {
    try {
      const response = await this.courierService.deleteCourierFile(fileId);
      if (response.data.code === 1) {
        this.existingFiles = this.existingFiles.filter(file => file.id !== fileId);
        await Swal.fire("Removed!", "File has been removed successfully.", "success");
        this.updateFormValidity();
      } else {
        await Swal.fire("Failed!", response.data.message || "Unknown error occurred", "error");
      }
    } catch (error) {
      await Swal.fire("Failed!", "An error occurred while removing the file.", "error");
    }
  }

  onCancel(): void {
    this.router.navigate(['/forms/courier']);
  }
}