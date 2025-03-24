import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, FormFloatingDirective, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { CourierService } from '../../../common-service/courier/courier.service';
import { clientCommonInterface, countryInterface  } from '../../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-courier',
  standalone: true,
  imports: [ NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, TextColorDirective, FormFloatingDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './create-courier.component.html',
  styleUrl: './create-courier.component.scss'
})
export class CreateCourierComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

  customStylesValidated = false;
  courierForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  selectedFiles: File[] = [];
  fileErrors: string[] = [];
  clients: clientCommonInterface[] = [];
  countries: countryInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private courierService: CourierService
  ) { 
    this.initForm();
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadCountries();
  }

  initForm(): void {
    this.courierForm = this.fb.group({
      courierClientName: ['', Validators.required],
      courierClientAddress: ['', Validators.required],
      courierCountryCode: ['', Validators.required],
      courierMobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      courierEmail: ['', [Validators.required, Validators.email]],
      courierFile: [null, Validators.required]
    });
  }

  loadClients(): void {
    this.courierService.getClientNames().then(
      (clients: clientCommonInterface[]) => {
        this.clients = clients;
      },
      (error) => {
        console.error('Error fetching clients:', error);
        Swal.fire('Error', 'Failed to load clients', 'error');
      }
    );
  }

  loadCountries(): void {
    this.courierService.getCountries().then(
      (countries: countryInterface[]) => {
        this.countries = countries;
      },
      (error) => {
        console.error('Error fetching countries:', error);
        Swal.fire('Error', 'Failed to load countries', 'error');
      }
    );
  }

  get f() { return this.courierForm.controls; }

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

    if (this.selectedFiles.length === 0) {
      this.fileErrors.push('Please select at least one valid file.');
    }
  }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;

    const errors: string[] = [];

    // Check form validity
    Object.keys(this.courierForm.controls).forEach(key => {
      const control = this.courierForm.get(key);
      if (control?.invalid) {
        if (key === 'courierMobileNumber' && control.errors?.['pattern']) {
          errors.push('Mobile number must be exactly 10 digits.');
        } else {
          errors.push(`${key.charAt(0).toUpperCase() + key.slice(1)} is required.`);
        }
      }
    });

    // Check file validity
    if (this.selectedFiles.length === 0) {
      errors.push('Please choose at least one file.');
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

    formData.append('hideStatus', '0');

    const id = "0";
    this.loading = true;

    try {
      const response = await lastValueFrom(this.courierService.processCourier(formData, "0"));

      if (response.code === 1) {
        await Swal.fire("Added!", "Courier created successfully", "success");
        this.router.navigate(['/forms/courier']);
      } else {
        await Swal.fire("Failed!", "Error creating courier", "error");
      }
    } catch (error) {
      console.error('Error processing Courier:', error);
      let errorMessage = "An error occurred while processing the courier entry.";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      await Swal.fire("Failed!", errorMessage, "error");
    } finally {
      this.loading = false;
    }
  }

  onReset(): void {
    this.customStylesValidated = false;
    this.submitted = false;
    this.selectedFiles = [];
    this.fileErrors = [];
    this.courierForm.reset();
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}