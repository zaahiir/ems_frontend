// Updated Component TypeScript file
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, ButtonDirective, SpinnerComponent } from '@coreui/angular';
import { DailyEntryService } from '../../../common-service/daily-entry/daily-entry.service';
import { IssueService } from '../../../common-service/issue/issue.service';
import { AumEntryService } from '../../../common-service/aum-entry/aum-entry.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, forkJoin  } from 'rxjs';

@Component({
  selector: 'app-update-daily-entry',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent,
    FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent,
    InputGroupComponent, InputGroupTextDirective, FormSelectDirective, ButtonDirective, SpinnerComponent
  ],
  templateUrl: './update-daily-entry.component.html',
  styleUrls: ['./update-daily-entry.component.scss']
})
export class UpdateDailyEntryComponent implements OnInit, OnDestroy {
  submitted = false;
  dailyEntryForm: FormGroup;
  customStylesValidated = false;
  loading = false;
  entryId!: number;
  fileError: string = '';
  selectedFile: File | null = null;
  existingFileUrl: string = '';
  existingFileName: string = '';
  hasExistingFile: boolean = false;

  amcList: any[] = [];
  fundList: any[] = [];
  issueTypes: any[] = [];
  transactionModes: any[] = [];

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dailyEntryService: DailyEntryService,
    private issueService: IssueService,
    private amcService: AumEntryService
  ) {
    this.dailyEntryForm = this.initForm();
  }

  ngOnInit(): void {
    this.entryId = this.route.snapshot.params['id'];
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm(): FormGroup {
    return this.fb.group({
      searchTerm: [''],
      applicationDate: ['', Validators.required],
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
      staffName: ['', Validators.required]
    });
  }

  async loadInitialData(): Promise<void> {
    this.showLoader('Loading data...');

    // Use forkJoin to handle multiple Observables properly
    forkJoin({
      amcs: this.amcService.getAmc(),
      issueTypes: this.issueService.getIssueType(),
      transactionModes: this.dailyEntryService.getTransactionModes()
    })
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: async (responses) => {
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

        try {
          await this.loadExistingEntry();
          this.setupFormListeners();
        } catch (error) {
          console.error('Error loading existing entry:', error);
          Swal.fire('Error', 'Failed to load entry data. Please try again.', 'error');
        }
      },
      error: (error) => {
        console.error('Error loading initial data:', error);
        Swal.fire('Error', 'Failed to load initial data. Please try again.', 'error');
      },
      complete: () => {
        this.hideLoader();
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
          this.dailyEntryForm.get('fundName')?.setValue('');
          this.dailyEntryForm.get('fundName')?.disable();
        }
      });
  }

  searchClient(): void {
    const searchTerm = this.dailyEntryForm.get('searchTerm')?.value;
    if (searchTerm) {
      this.showLoader('Searching Client...');
      this.dailyEntryService.getClientDetails(searchTerm)
        .subscribe(
          response => {
            this.hideLoader();
            if (response.code === 1) {
              const clientData = response.data;
              this.patchClientDetails(clientData);
            } else {
              Swal.fire('Not Found', 'No client found with the given PAN or mobile number.', 'info');
            }
          },
          error => {
            this.hideLoader();
            console.error('Error searching client:', error);
            Swal.fire('Error', 'An error occurred while searching for the client.', 'error');
          }
        );
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

  async loadExistingEntry(): Promise<void> {
    try {
      const response = await this.dailyEntryService.getDailyEntryById(this.entryId.toString()).toPromise();
      if (response && response.code === 1 && response.data) {
        const entryData = response.data;

        // Handle existing file
        if (entryData.dailyEntryFile) {
          this.hasExistingFile = true;
          this.existingFileUrl = entryData.dailyEntryFile;
          // Extract filename from URL
          this.existingFileName = this.extractFileNameFromUrl(entryData.dailyEntryFile);
        }

        // Find the AMC ID from the AMC name
        let selectedAmcId = null;
        if (entryData.dailyEntryFundHouse) {
          const selectedAmc = this.amcList.find(amc => amc.amcName === entryData.dailyEntryFundHouse);
          if (selectedAmc) {
            selectedAmcId = selectedAmc.id;
          }
        }

        // Load funds for the selected fund house first
        if (selectedAmcId) {
          await this.loadFundsByAmc(selectedAmcId);
        }

        // Find the correct fund, issue type, and transaction mode
        const fundOption = this.fundList.find(fund => fund.fundName === entryData.dailyEntryFundName);
        const issueTypeOption = this.issueTypes.find(issue => issue.issueTypeName === entryData.dailyEntryIssueType);
        const transactionModeOption = this.transactionModes.find(mode => mode.transcationModeName === entryData.dailyEntryTranscationMode);

        // Patch the form with existing data
        this.dailyEntryForm.patchValue({
          applicationDate: entryData.applicationDate,
          clientPanNumber: entryData.dailyEntryClientPanNumber,
          clientName: entryData.dailyEntryClientName,
          clientPhoneCountryCode: entryData.dailyEntryClientCountryCode,
          clientMobileNumber: entryData.dailyEntryClientMobileNumber,
          clientFolioNumber: entryData.dailyEntryClientFolioNumber,
          fundHouse: selectedAmcId, // Use the found AMC ID
          fundName: fundOption ? fundOption.id : '',
          amount: entryData.dailyEntryAmount,
          clientChequeNumber: entryData.dailyEntryClientChequeNumber,
          transactionType: issueTypeOption ? issueTypeOption.id : '',
          transactionMode: transactionModeOption ? transactionModeOption.id : '',
          sipDate: entryData.dailyEntrySipDate,
          transactionAddDetail: entryData.dailyEntryTransactionAddDetails,
          staffName: entryData.dailyEntryStaffName
        }, { emitEvent: false });

        // Enable fund name dropdown if funds are available
        if (this.fundList.length > 0) {
          this.dailyEntryForm.get('fundName')?.enable();
        }
      } else {
        this.handleErrorResponse('Failed to load entry data or no data found.');
      }
    } catch (error) {
      console.error('Error loading existing entry:', error);
      this.handleErrorResponse('An error occurred while loading the entry data.');
    }
  }

  private async loadFundsByAmc(amcId: number): Promise<void> {
    this.showLoader('Loading funds...', true);
    try {
      const response = await this.dailyEntryService.getFundsByAmc(amcId).toPromise();
      if (response && response.data) {
        this.fundList = response.data;
        const fundNameControl = this.dailyEntryForm.get('fundName');
        if (fundNameControl) {
          if (this.fundList.length > 0) {
            fundNameControl.enable();
          } else {
            fundNameControl.disable();
            fundNameControl.setValue('');
          }
        }
      } else {
        this.fundList = [];
        this.dailyEntryForm.get('fundName')?.disable();
        this.dailyEntryForm.patchValue({ fundName: '' });
      }
    } catch (error) {
      console.error('Error loading funds:', error);
      this.fundList = [];
      this.dailyEntryForm.get('fundName')?.disable();
      this.dailyEntryForm.patchValue({ fundName: '' });
    } finally {
      this.hideLoader();
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.fileError = '';

    if (file) {
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!allowedTypes.includes(file.type)) {
        this.fileError = 'Only PDF, DOC, and DOCX files are allowed.';
        event.target.value = '';
        this.selectedFile = null;
        return;
      }

      if (file.size > maxSize) {
        this.fileError = 'File size must be less than 5MB.';
        event.target.value = '';
        this.selectedFile = null;
        return;
      }

      this.selectedFile = file;
    } else {
      this.selectedFile = null;
    }
  }

  // Method to extract filename from URL
  extractFileNameFromUrl(path: string): string {
    const parts = path.split('/');
    const fileName = parts[parts.length - 1];
    // Remove any query parameters
    return fileName.split('?')[0];
  }

  // Method to get file extension
  getFileExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() || '';
  }

  // Method to check if file can be viewed in browser
  canViewInBrowser(fileName: string): boolean {
    const extension = this.getFileExtension(fileName);
    return ['pdf', 'jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'].includes(extension);
  }

  // Method to handle file click
  onExistingFileClick(): void {
    if (!this.existingFileUrl) return;

    // Always use the service method to get the proper backend URL
    const fullFileUrl = this.dailyEntryService.getFileUrl(this.existingFileUrl);
    console.log('Opening file URL:', fullFileUrl); // Debug log

    if (this.canViewInBrowser(this.existingFileName)) {
      // Open in new tab for viewable files
      window.open(fullFileUrl, '_blank');
    } else {
      // Use service method for downloading with proper authentication
      this.downloadFileWithAuth(this.existingFileUrl, this.existingFileName);
    }
  }

  // Method to download file
  downloadFileWithAuth(relativePath: string, fileName: string): void {
    this.showLoader('Downloading file...', true);

    this.dailyEntryService.downloadFile(relativePath)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (blob: Blob) => {
          this.hideLoader();

          // Create blob URL and trigger download
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = fileName;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        },
        error: (error) => {
          this.hideLoader();
          console.error('Error downloading file:', error);
          Swal.fire('Error', 'Failed to download file. Please try again.', 'error');
        }
      });
  }

  // Fallback download method for direct URL (without auth)
  downloadFile(url: string, fileName: string): void {
    const fullUrl = this.dailyEntryService.getFileUrl(url);

    const link = document.createElement('a');
    link.href = fullUrl;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Method to get file icon based on extension
  getFileIcon(fileName: string): string {
    const extension = this.getFileExtension(fileName);
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'bmp':
      case 'svg':
        return '🖼️';
      default:
        return '📎';
    }
  }

  // Method to remove existing file
  removeExistingFile(): void {
    Swal.fire({
      title: 'Remove File?',
      text: 'Are you sure you want to remove the existing file?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, remove it',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.hasExistingFile = false;
        this.existingFileUrl = '';
        this.existingFileName = '';
      }
    });
  }

  get f() { return this.dailyEntryForm.controls; }

  private handleErrorResponse(message: string): void {
    Swal.fire('Error', message, 'error');
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
      clientPhoneCountryCode: 'Country Code',
      clientMobileNumber: 'Mobile Number',
      fundHouse: 'Fund House',
      fundName: 'Fund Name',
      amount: 'Amount',
      transactionType: 'Transaction Type',
      transactionMode: 'Transaction Mode',
      sipDate: 'SIP Date',
      transactionAddDetail: 'Transaction Details',
      staffName: 'Staff Name'
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
    this.showLoader('Updating...');

    // Prepare form data
    const formData = {
      id: this.entryId,
      applicationDate: this.dailyEntryForm.get('applicationDate')?.value,
      dailyEntryClientPanNumber: this.dailyEntryForm.get('clientPanNumber')?.value,
      dailyEntryClientName: this.dailyEntryForm.get('clientName')?.value,
      clientFolioNumber: this.dailyEntryForm.get('clientFolioNumber')?.value,
      clientPhoneCountryCode: this.dailyEntryForm.get('clientPhoneCountryCode')?.value,
      clientMobileNumber: this.dailyEntryForm.get('clientMobileNumber')?.value,
      dailyEntryFundHouse: this.dailyEntryForm.get('fundHouse')?.value,
      dailyEntryFundName: this.dailyEntryForm.get('fundName')?.value,
      amount: this.dailyEntryForm.get('amount')?.value,
      clientChequeNumber: this.dailyEntryForm.get('clientChequeNumber')?.value,
      dailyEntryIssueType: this.dailyEntryForm.get('transactionType')?.value,
      dailyEntryTranscationMode: this.dailyEntryForm.get('transactionMode')?.value,
      sipDate: this.dailyEntryForm.get('sipDate')?.value,
      staffName: this.dailyEntryForm.get('staffName')?.value,
      transactionAddDetail: this.dailyEntryForm.get('transactionAddDetail')?.value
    };

    // Add file if selected
    if (this.selectedFile) {
      (formData as any).dailyEntryFile = this.selectedFile;
    }

    // Add flag to remove existing file if user chose to remove it
    if (!this.hasExistingFile && this.existingFileUrl) {
      (formData as any).removeExistingFile = true;
    }

    this.dailyEntryService.processDailyEntry(formData, this.entryId.toString())
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      response => {
        this.loading = false;
        this.hideLoader();
        if (response.code === 1) {
          Swal.fire({
            title: "Updated!",
            text: "Daily entry updated successfully",
            icon: "success",
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/forms/dailyEntry']);
            }
          });
        } else {
          Swal.fire({
            title: "Failed!",
            text: response.message || "Error updating daily entry",
            icon: "error",
            confirmButtonText: 'Ok'
          });
        }
      },
      error => {
        this.loading = false;
        this.hideLoader();
        console.error('Error updating entry:', error);
        Swal.fire({
          title: "Failed!",
          text: "An error occurred while updating the entry.",
          icon: "error",
          confirmButtonText: 'Ok'
        });
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['/forms/dailyEntry']);
  }

  private showLoader(message: string, isSmall: boolean = false): void {
    Swal.fire({
      title: message,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: {
        popup: isSmall ? 'swal2-small' : ''
      }
    });
  }

  private hideLoader(): void {
    Swal.close();
  }
}
