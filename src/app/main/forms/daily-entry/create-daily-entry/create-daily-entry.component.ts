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
import { Subject } from 'rxjs';

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
      sipDate: ['', Validators.required],
      transactionAddDetail: ['', Validators.required],
      staffName: [localStorage.getItem('user_name') || localStorage.getItem('username') || '', Validators.required]
    });
  }

  async loadInitialData(): Promise<void> {
    this.showLoader('Loading data...');
    try {
      const [amcsResponse, issueTypesResponse] = await Promise.all([
        this.amcService.getAmc(),
        this.issueService.getIssueType()
      ]);
  
      this.amcList = amcsResponse.data;
      this.issueTypes = issueTypesResponse.data;
    } catch (error) {
      Swal.fire('Error', 'Failed to initialize the form. Please try again.', 'error');
    } finally {
      this.dataLoading = false;
      this.hideLoader();
    }
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
      .subscribe(
        response => {
          this.fundList = response.data;
          const fundNameControl = this.dailyEntryForm.get('fundName');
          if (fundNameControl) {
            if (this.fundList.length > 0) {
              fundNameControl.enable();
              const firstFund = this.fundList[0];
              fundNameControl.setValue(firstFund.id);
            } else {
              fundNameControl.disable();
              fundNameControl.setValue('');
            }
          }
          this.hideLoader();
        },
        error => {
          this.fundList = [];
          this.dailyEntryForm.get('fundName')?.disable();
          this.hideLoader();
          Swal.fire('Error', 'Failed to load funds for the selected AMC.', 'error');
        }
      );
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
  
    const formData = {
      applicationDate: this.dailyEntryForm.get('applicationDate')?.value,
      dailyEntryClientPanNumber: this.dailyEntryForm.get('clientPanNumber')?.value,
      dailyEntryClientName: this.dailyEntryForm.get('clientName')?.value,
      clientFolioNumber: this.dailyEntryForm.get('clientFolioNumber')?.value || null,
      clientPhoneCountryCode: this.dailyEntryForm.get('clientPhoneCountryCode')?.value,
      clientMobileNumber: this.dailyEntryForm.get('clientMobileNumber')?.value,
      dailyEntryFundHouse: this.dailyEntryForm.get('fundHouse')?.value,
      dailyEntryFundName: this.dailyEntryForm.get('fundName')?.value,
      amount: this.dailyEntryForm.get('amount')?.value,
      clientChequeNumber: this.dailyEntryForm.get('clientChequeNumber')?.value || null,
      dailyEntryIssueType: this.dailyEntryForm.get('transactionType')?.value,
      sipDate: this.dailyEntryForm.get('sipDate')?.value,
      staffName: this.dailyEntryForm.get('staffName')?.value,
      transactionAddDetail: this.dailyEntryForm.get('transactionAddDetail')?.value
    };
  
    console.log('Form data being submitted:', formData); // Add this line for debugging
  
    this.dailyEntryService.processDailyEntry(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {
          this.loading = false;
          this.hideLoader();
          if (response.code === 1) {
            Swal.fire("Added!", "Daily entry and issue created successfully", "success");
            this.router.navigate(['/forms/dailyEntry']);
          } else {
            Swal.fire("Failed!", response.message || "Error creating daily entry and issue", "error");
          }
        },
        error => {
          this.loading = false;
          this.hideLoader();
          console.error('Error submitting form:', error); // Add this line for debugging
          Swal.fire("Failed!", "An error occurred while processing the entry.", "error");
        }
      );
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
    this.dailyEntryForm.reset({
      applicationDate: this.currentDate,
      staffName: localStorage.getItem('staffName') || ''
    });
    this.fundList = [];
    this.dailyEntryForm.get('fundName')?.disable();
  }
}