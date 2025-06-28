import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule, formatDate } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, ButtonDirective, SpinnerComponent } from '@coreui/angular';
import { DailyEntryService } from '../../../common-service/daily-entry/daily-entry.service';
import { IssueService } from '../../../common-service/issue/issue.service';
import { AumEntryService } from '../../../common-service/aum-entry/aum-entry.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, forkJoin } from 'rxjs';

@Component({
  selector: 'app-create-daily-entry',
  standalone: true,
  imports: [
    NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent,
    TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,
    ReactiveFormsModule, FormFloatingDirective, FormsModule, FormDirective,
    FormLabelDirective, FormControlDirective, FormFeedbackComponent,
    InputGroupComponent, InputGroupTextDirective, FormSelectDirective,
    ButtonDirective, SpinnerComponent
  ],
  templateUrl: './create-daily-entry.component.html',
  styleUrls: ['./create-daily-entry.component.scss']
})

export class CreateDailyEntryComponent implements OnInit, OnDestroy {
  dailyEntryForm: FormGroup;
  customStylesValidated = false;
  submitted = false;
  loading = false;
  dataLoading = true;

  amcList: any[] = [];
  fundList: any[] = [];
  issueTypes: any[] = [];
  transactionModes: any[] = [];

  selectedFile: File | null = null;
  fileError: string = '';
  selectedFileName: string = '';
  filePreviewUrl: string = '';

  currentDate: string;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dailyEntryService: DailyEntryService,
    private issueService: IssueService,
    private amcService: AumEntryService
  ) {
    this.currentDate = new Date().toISOString().split('T')[0];
    this.dailyEntryForm = this.initForm();
  }

  ngOnInit(): void {
    this.loadInitialData();
    this.setupFormListeners();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    // Clean up object URLs to prevent memory leaks
    if (this.filePreviewUrl) {
      URL.revokeObjectURL(this.filePreviewUrl);
    }
  }

  initForm(): FormGroup {
    return this.fb.group({
      searchTerm: [''],
      applicationDate: [this.currentDate, Validators.required],
      clientPanNumber: ['', Validators.required],
      clientName: ['', Validators.required],
      clientPhoneCountryCode: ['', Validators.required],
      clientMobileNumber: ['', Validators.required],
      clientFolioNumber: [''],
      fundHouse: ['', Validators.required],
      fundName: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      clientChequeNumber: [''],
      transactionType: ['', Validators.required],
      transactionMode: ['', Validators.required],
      sipDate: ['', Validators.required],
      transactionAddDetail: ['', Validators.required],
      staffName: [localStorage.getItem('user_name') || localStorage.getItem('username') || '', Validators.required]
    });
  }

  loadInitialData(): void {
    this.showLoader('Loading data...');

    // Use forkJoin to handle multiple Observable calls properly
    forkJoin({
      amcs: this.amcService.getAmc(),
      issueTypes: this.issueService.getIssueType(),
      transactionModes: this.dailyEntryService.getTransactionModes()
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (responses) => {
        console.log('API Responses:', responses);

        // Access the data property from each response
        this.amcList = responses.amcs.data || [];
        this.issueTypes = responses.issueTypes.data || [];

        // Handle transactionModes which might have different response structure
        if (Array.isArray(responses.transactionModes)) {
          // If transactionModes is already an array
          this.transactionModes = responses.transactionModes;
        } else if (responses.transactionModes && responses.transactionModes.data) {
          // If transactionModes has a data property
          this.transactionModes = responses.transactionModes.data;
        } else {
          this.transactionModes = [];
        }

        console.log('Transaction Modes:', this.transactionModes);

        this.dataLoading = false;
        this.hideLoader();
      },
      error: (error) => {
        console.error('Error loading initial data:', error);
        this.dataLoading = false;
        this.hideLoader();
        Swal.fire('Error', 'Failed to initialize the form. Please try again.', 'error');
      }
    });
  }

  setupFormListeners(): void {
    this.dailyEntryForm.get('fundHouse')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(amcId => {
        if (amcId) {
          this.loadFundsByAmc(amcId);
        } else {
          this.fundList = [];
          this.dailyEntryForm.get('fundName')?.disable();
        }
      });
  }

  get f() { return this.dailyEntryForm.controls; }

  loadFundsByAmc(amcId: number): void {
    this.showLoader('Loading Funds...');
    this.dailyEntryService.getFundsByAmc(amcId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.fundList = response.data || [];
          const fundNameControl = this.dailyEntryForm.get('fundName');
          if (fundNameControl) {
            if (this.fundList.length > 0) {
              fundNameControl.enable();
              // Don't auto-select the first fund, let user choose
              fundNameControl.setValue('');
            } else {
              fundNameControl.disable();
              fundNameControl.setValue('');
            }
          }
          this.hideLoader();
        },
        error: (error) => {
          console.error('Error loading funds:', error);
          this.fundList = [];
          this.dailyEntryForm.get('fundName')?.disable();
          this.hideLoader();
          Swal.fire('Error', 'Failed to load funds for the selected AMC.', 'error');
        }
      });
  }

  searchClient(): void {
    const searchTerm = this.dailyEntryForm.get('searchTerm')?.value;
    if (searchTerm) {
      this.showLoader('Searching Client...');
      this.dailyEntryService.getClientDetails(searchTerm)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.hideLoader();
            if (response.code === 1) {
              const clientData = response.data;
              this.patchClientDetails(clientData);
            } else {
              Swal.fire('Not Found', 'No client found with the given PAN or mobile number.', 'info');
            }
          },
          error: (error) => {
            console.error('Error searching client:', error);
            this.hideLoader();
            Swal.fire('Error', 'An error occurred while searching for the client.', 'error');
          }
        });
    } else {
      Swal.fire('Error', 'Please enter a search term.', 'error');
    }
  }

  patchClientDetails(clientData: any): void {
    this.dailyEntryForm.patchValue({
      clientName: clientData.client_name,
      clientPanNumber: clientData.client_pan_no,
      clientPhoneCountryCode: clientData.client_phone_dial_code,
      clientMobileNumber: clientData.client_phone
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const allowedExtensions = ['.pdf', '.doc', '.docx'];

      const isValidType = allowedTypes.includes(file.type) ||
                        allowedExtensions.some(ext => file.name.toLowerCase().endsWith(ext));

      if (!isValidType) {
        this.fileError = 'Please select a valid file format (PDF, DOC, DOCX only)';
        this.resetFileSelection(input);
        return;
      }

      // Validate file size (10MB limit)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        this.fileError = 'File size must be less than 10MB';
        this.resetFileSelection(input);
        return;
      }

      // File is valid
      this.fileError = '';
      this.selectedFile = file;
      this.selectedFileName = file.name;

      // Create preview URL for files (if needed)
      if (this.filePreviewUrl) {
        URL.revokeObjectURL(this.filePreviewUrl);
      }
      this.filePreviewUrl = URL.createObjectURL(file);

      console.log('File selected successfully:', {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: new Date(file.lastModified)
      });
    } else {
      this.resetFileSelection(input);
    }
  }

  private resetFileSelection(input?: HTMLInputElement): void {
    this.selectedFile = null;
    this.selectedFileName = '';
    if (this.filePreviewUrl) {
      URL.revokeObjectURL(this.filePreviewUrl);
      this.filePreviewUrl = '';
    }
    if (input) {
      input.value = '';
    }
  }

  // Method to remove selected file
  removeSelectedFile(): void {
    this.resetFileSelection();
    this.fileError = '';

    // Clear the file input
    const fileInput = document.getElementById('dailyEntryFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  // Method to format file size for display
  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  onSubmit(): void {
    this.customStylesValidated = true;
    this.submitted = true;

    if (this.dailyEntryForm.invalid) {
      const missingFields = this.getMissingRequiredFields();
      if (missingFields.length > 0) {
        this.showMissingFieldsAlert(missingFields);
        return;
      }
    }

    if (this.loading) {
      return;
    }

    this.loading = true;
    this.showLoader('Submitting...');

    // Create FormData object for proper file upload
    const formData = new FormData();

    // Append all form fields with correct field names matching backend expectations
    formData.append('applicationDate', this.dailyEntryForm.get('applicationDate')?.value || '');
    formData.append('dailyEntryClientPanNumber', this.dailyEntryForm.get('clientPanNumber')?.value || '');
    formData.append('dailyEntryClientName', this.dailyEntryForm.get('clientName')?.value || '');
    formData.append('clientFolioNumber', this.dailyEntryForm.get('clientFolioNumber')?.value || '');
    formData.append('clientPhoneCountryCode', this.dailyEntryForm.get('clientPhoneCountryCode')?.value || '');
    formData.append('clientMobileNumber', this.dailyEntryForm.get('clientMobileNumber')?.value || '');
    formData.append('dailyEntryFundHouse', this.dailyEntryForm.get('fundHouse')?.value || '');
    formData.append('dailyEntryFundName', this.dailyEntryForm.get('fundName')?.value || '');
    formData.append('amount', this.dailyEntryForm.get('amount')?.value || '');
    formData.append('clientChequeNumber', this.dailyEntryForm.get('clientChequeNumber')?.value || '');
    formData.append('dailyEntryIssueType', this.dailyEntryForm.get('transactionType')?.value || '');
    formData.append('dailyEntryTranscationMode', this.dailyEntryForm.get('transactionMode')?.value || '');
    formData.append('sipDate', this.dailyEntryForm.get('sipDate')?.value || '');
    formData.append('staffName', this.dailyEntryForm.get('staffName')?.value || '');
    formData.append('transactionAddDetail', this.dailyEntryForm.get('transactionAddDetail')?.value || '');

    // Append file if selected - this is crucial
    if (this.selectedFile) {
      formData.append('dailyEntryFile', this.selectedFile, this.selectedFile.name);
      console.log('File being uploaded:', this.selectedFile.name, 'Size:', this.selectedFile.size);
    }

    // Debug: Log all FormData entries using forEach (compatible with older browsers)
    console.log('FormData being submitted:');
    if (formData && typeof formData.forEach === 'function') {
      formData.forEach((value, key) => {
        console.log(key + ': ' + (value instanceof File ? `File: ${value.name} (${value.size} bytes)` : value));
      });
    }

    // Use the updated service method that handles FormData properly
    this.dailyEntryService.processDailyEntryWithFormData(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.loading = false;
          this.hideLoader();
          console.log('Server response:', response);
          if (response.code === 1) {
            Swal.fire("Added!", "Daily entry and issue created successfully", "success");
            this.router.navigate(['/forms/dailyEntry']);
          } else {
            Swal.fire("Failed!", response.message || "Error creating daily entry and issue", "error");
          }
        },
        error: (error) => {
          console.error('Error submitting form:', error);
          this.loading = false;
          this.hideLoader();

          // More detailed error handling
          let errorMessage = "An error occurred while processing the entry.";
          if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error.message) {
            errorMessage = error.message;
          }

          Swal.fire("Failed!", errorMessage, "error");
        }
      });
  }

  getMissingRequiredFields(): string[] {
    const missingFields: string[] = [];
    Object.keys(this.dailyEntryForm.controls).forEach(key => {
      const control = this.dailyEntryForm.get(key);
      if (control && control.errors && 'required' in control.errors && control.errors['required']) {
        missingFields.push(this.getFieldDisplayName(key));
      }
    });
    return missingFields;
  }

  getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      searchTerm: 'Search Term',
      applicationDate: 'Application Date',
      clientPanNumber: 'Client PAN',
      clientName: 'Client Name',
      clientMobileNumber: 'Mobile Number',
      fundHouse: 'Fund House',
      fundName: 'Fund Name',
      amount: 'Amount',
      transactionType: 'Transaction Type',
      transactionMode: 'Transaction Mode',
      sipDate: 'SIP Date',
      staffName: 'Staff Name',
      transactionAddDetail: 'Transaction Add Detail'
    };
    return displayNames[fieldName] || fieldName;
  }

  showMissingFieldsAlert(missingFields: string[]): void {
    const missingFieldsText = missingFields.join(', ');
    Swal.fire({
      title: 'Required Fields Missing',
      html: `Please fill in the following required fields:<br><br><strong>${missingFieldsText}</strong>`,
      icon: 'warning',
      confirmButtonText: 'Ok'
    });
  }

  showLoader(message: string = 'Loading...'): void {
    Swal.fire({
      title: message,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  hideLoader(): void {
    Swal.close();
  }

  onReset(): void {
    this.customStylesValidated = false;
    this.submitted = false;
    this.resetFileSelection();
    this.fileError = '';

    // Reset file input
    const fileInput = document.getElementById('dailyEntryFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }

    this.dailyEntryForm.reset({
      applicationDate: this.currentDate,
      staffName: localStorage.getItem('user_name') || localStorage.getItem('username') || ''
    });

    this.fundList = [];
    this.dailyEntryForm.get('fundName')?.disable();
  }
}
