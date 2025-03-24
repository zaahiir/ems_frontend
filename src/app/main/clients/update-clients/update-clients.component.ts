import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, FormControl, AbstractControl, Validators, FormArray } from '@angular/forms';
import { ProgressBarDirective, ProgressComponent as ProgressComponent_1, ProgressBarComponent, FormFloatingDirective, ProgressStackedComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { ClientService } from '../../../main/common-service/client/client.service'
import { stateCommonInterface, genderCommonInterface, maritalstatusCommonInterface, politicallyexposedpersonCommonInterface,
   bankNameCommonInterface, relationshipCommonInterface, accountPreferenceCommonInterface, accountTypeCommonInterface } from '../../../main/interfaces/interfaces'
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject, takeUntil, debounceTime, distinctUntilChanged, lastValueFrom, Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

interface AccountPreference {
  id: number;
  accountPreferenceName: string;
}

interface Country {
  id: number;
  code: string;
  name: string;
  dial_code: string;
}

@Component({
  selector: 'app-update-clients',
  standalone: true,
  imports: [ ProgressBarDirective, ProgressComponent_1, ProgressBarComponent, ProgressStackedComponent, NgIf, FormFloatingDirective, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './update-clients.component.html',
  styleUrl: './update-clients.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UpdateClientsComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>();
  i: number = 1;
  clientId: string = '0';
  clientLastUpdated: string = '';
  clientUpdateForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  customStylesValidated = false;
  showClientGuardianFields: boolean = false;
  maxNominees = 3;

  state: stateCommonInterface[] = [];
  countries: Country[] = [];
  gender: genderCommonInterface[] = [];
  maritalStatus: maritalstatusCommonInterface[] = [];
  politicalExposed: politicallyexposedpersonCommonInterface[] = [];
  bankName: bankNameCommonInterface[] = [];
  relation: relationshipCommonInterface[] = [];
  accountType: accountTypeCommonInterface[] = [];
  accountPreference: AccountPreference[] = [];
  fileObjects: { [key: string]: File | string | SafeUrl } = {};
  fileNames: { [key: string]: string } = {};

  currentStep: number = 1;
  steps: string[] = ['Basic Details', 'Family Details', 'Present Address', 'Permanent Address', 'Office Address', 'Overseas Address', 'Nominee', 'Insurance', 'Upload Files', 'Bank Details', 'Other Details'];

  private primaryPreferenceId: number | null = null;
  private secondaryPreferenceId: number | null = null;
  private maxBankAccounts = 3;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private clientService: ClientService,
    private cdRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer 
  ) { 
    this.initForm();
  }  

  ngOnInit(): void {
    this.setupForm();
    this.loadInitialData();
    this.setupRouteParams();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private setupForm(): void {
    document.documentElement.style.setProperty('--stepNumber', this.steps.length.toString());
    this.clientUpdateForm.get('clientDateOfBirth')?.valueChanges.subscribe(() => {
      this.updateClientGuardianFields();
    });
    this.setupFormValueChanges();
  }

  private setupRouteParams(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      this.clientId = params['id'] || '0';
      if (this.clientId !== '0') {
        this.loadClientData();
      }
    });
  }

  private setupFormValueChanges(): void {
    this.clientUpdateForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.cdRef.markForCheck();
    });
  }

  initForm():void{
    this.clientUpdateForm = this.fb.group({
      clientName: ['',Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientPhoneCountryCode: ['', Validators.required],
      clientPhone: ['',Validators.required],
      clientAlternatePhoneCountryCode: [''],
      clientAlternatePhone: [''],
      clientPanNo: ['',Validators.required],
      clientKycNo: [null],
      clientAadharNo: ['',Validators.required],
      clientVoterId: [null],
      clientDrivingLicenseNo: [null],
      clientDrivingLicenseExpiryDate: [null],
      clientPassportNo: [null],
      clientPassportExpiryDate: [null],
      clientCentralGovtId: [null],
      clientCentralGovtIdNo: [null],
      clientBloodGroup: [''],
      clientDateOfBirth: [null,Validators.required],
      clientGender: ['',Validators.required],
      clientMaritalStatus: ['',Validators.required],
      clientAnniversaryDate: [null],
      clientCountryOfBirth: ['',Validators.required],
      clientPlaceOfBirth: ['',Validators.required],
      clientCitizenship: [''],
      clientResidentialStatus: [''],
      clientOccupation: ['',Validators.required],
      clientAnnualIncome: ['',Validators.required],
      clientPoliticallyExposed: ['',Validators.required],
      familyDetails: this.fb.group({
        clientFatherName: [''],
        clientMotherName: [''],
        clientSpouseName: [''],
        clientSpouseBirthDate: [null]
      }),
      children: this.fb.array([]),
      presentAddress: this.fb.group({
        clientPresentAddress: [''],
        clientPresentLandmark: [''],
        clientPresentCity: [''],
        clientPresentDistrict: [''],
        clientPresentState: [''],
        clientPresentPincode  : [null],
        clientPresentCountry: [''],
        clientPresentCountryCode: [''],
        clientPresentMobile: [''],
        clientPresentLandline: [''],
      }),
      permanentAddress: this.fb.group({
        clientPermanentAddress: [''],
        clientPermanentLandmark: [''],
        clientPermanentCity: [''],
        clientPermanentDistrict: [''],
        clientPermanentState: [''],
        clientPermanentPincode  : [null],
        clientPermanentCountry: [''],
        clientPermanentCountryCode: [''],
        clientPermanentMobile: [''],
        clientPermanentLandline: [''],
      }),
      OfficeAddress: this.fb.group({
        clientOfficeAddress: [''],
        clientOfficeLandline: [''],
        clientOfficeCountryCode: [''],
        clientOfficeMobile: [''],
        clientOfficeCity: [''],
        clientOfficeState  : [''],
        clientOfficePincode: [null],
        clientOfficeCountry: [''],
      }),
      overseasAddress: this.fb.group({
        clientOverseasAddress: [''],
        clientOverseasLandline: [''],
        clientOverseasCountryCode: [''],
        clientOverseasMobile: [''],
        clientOverseasCity: [''],
        clientOverseasState  : [''],
        clientOverseasPincode: [null],
        clientOverseasCountry: [''],
      }),
      nominee: this.fb.array([]),
      policy: this.fb.array([]),
      medPolicy: this.fb.array([]),
      termPolicy: this.fb.array([]),
      uploadFiles: this.fb.group({
        clientPaasPortSizePhoto: [''],
        clientPanCardPhoto: [''],
        clientAadharCard: [''],
        clientDrivingLicense: [''],
        clientVoterIDFrontImage: [''],
        clientVoterIDBackImage: [''],
        clientPassportFrontImage: [''],
        clientPassportBackImage: [''],
        clientForeignAddressProof: [''],
        clientForeignTaxIdentificationProof: [''],
        clientCancelledChequeCopy: [''],
        clientBankAccountStatementOrPassbook: [''],
        clientChildrenBirthCertificate: [''],
        clientPowerOfAttorneyUpload: [''],
      }),
      bank: this.fb.array([]),
      tax: this.fb.group({
        clientTaxIdDetail: [''],
        clientTaxIdNo: [''],
        clientTaxCountry: [''],
      }),
      attorney: this.fb.group({
        clientPowerOfAttorneyName: [''],
        clientPowerOfAttorneyPanNo: [''],
      }),
      guardian: this.fb.group({
        clientGuardianName: [''],
        clientGuardianRelation: [''],
        clientGuardianPanNo: [''],
      }),
    });
  }

  loadInitialData(): void {
    this.loadStates();
    this.loadCountry();
    this.loadGender();
    this.loadMaritalStatus();
    this.loadPoliticalExposed();
    this.loadBank();
    this.loadRelation();
    this.loadAccountTypes();
    this.loadAccountPreference().then(() => {
      const primaryPref = this.accountPreference.find(pref => 
        pref.accountPreferenceName === 'Primary');
      const secondaryPref = this.accountPreference.find(pref => 
        pref.accountPreferenceName === 'Secondary');
      
      if (primaryPref && secondaryPref) {
        this.primaryPreferenceId = primaryPref.id;
        this.secondaryPreferenceId = secondaryPref.id;
        this.setInitialPreferences();
      }
    });
  }  

  private setInitialPreferences(): void {
    if (this.bank.length > 0 && this.primaryPreferenceId !== null) {
      const firstAccount = this.bank.at(0);
      const preferenceControl = firstAccount.get('clientAccountPreference');
      if (preferenceControl) {
        preferenceControl.setValue(this.primaryPreferenceId);
        this.updateOtherAccountsToSecondary(0);
      }
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.clientUpdateForm.controls; }

  loadStates() {
    this.clientService.getStates()
      .then(response => {
        this.state = response.data;
        this.cdRef.detectChanges();
      })
      .catch(error => console.error('Error loading countries:', error));
  }

  loadCountry() {
    this.clientService.getCountries()
      .then(response => {
        this.countries = response.data;
        this.cdRef.detectChanges();
      })
      .catch(error => console.error('Error loading countries:', error));
  }

  loadGender() {
    this.clientService.getGender()
      .then(response => {
        this.gender = response.data;
        this.cdRef.detectChanges();
      })
      .catch(error => console.error('Error loading countries:', error));
  }

  loadMaritalStatus() {
    this.clientService.getMaritalStatus()
      .then(response => {
        this.maritalStatus = response.data;
        this.cdRef.detectChanges();
      })
      .catch(error => console.error('Error loading countries:', error));
  }

  loadPoliticalExposed() {
    this.clientService.getPoliticallyExposedPerson()
      .then(response => {
        this.politicalExposed = response.data;
        this.cdRef.detectChanges();
      })
      .catch(error => console.error('Error loading countries:', error));
  }

  loadBank() {
    this.clientService.getBankName()
      .then(response => {
        this.bankName = response.data;
        this.cdRef.detectChanges();
      })
      .catch(error => console.error('Error loading countries:', error));
  }

  loadRelation() {
    this.clientService.getRelationship()
      .then(response => {
        this.relation = response.data;
        this.cdRef.detectChanges();
      })
      .catch(error => console.error('Error loading countries:', error));
  }

  loadAccountTypes() {
    this.clientService.getAccountType()
      .then(response => {
        this.accountType = response.data;
        this.cdRef.detectChanges();
      })
      .catch(error => console.error('Error loading accountType:', error));
  }

  private loadAccountPreference(): Promise<void> {
    return this.clientService.getAccountPreference()
      .then(response => {
        this.accountPreference = response.data;
        this.cdRef.markForCheck();
      })
      .catch(error => {
        console.error('Error loading account preferences:', error);
        return Promise.reject(error);
      });
  }

  get children(): FormArray {
    return this.clientUpdateForm.get('children') as FormArray;
  }

  createChildFormGroup(): FormGroup {
    return this.fb.group({
      clientChildrenName: [''],
      clientChildrenBirthDate: [null]
    });
  }

  addChild(): void {
    this.children.push(this.createChildFormGroup());
  }

  removeChild(index: number): void {
    this.children.removeAt(index);
  }

  get nominee(): FormArray {
    return this.clientUpdateForm.get('nominee') as FormArray;
  }

  createNomineeFormGroup(): FormGroup {
    return this.fb.group({
      clientNomineeName: [''],
      clientNomineeRelation: [''],
      clientNomineePanNo: [''],
      clientNomineeDob: [null],
      clientNomineePercentageAllocation: [''],
      clientNomineeGuardianName: [''],
      clientNomineeGuardianRelation: [''],
      clientNomineeGuardianPanNo: ['']
    });
  }

  addNominee(): void {
    if (this.nominee.length < this.maxNominees) {
      this.nominee.push(this.createNomineeFormGroup());
    }
  }

  get canAddNominee(): boolean {
    return this.nominee.length < this.maxNominees;
  }

  removeNominee(index: number): void {
    this.nominee.removeAt(index);
  }

  get policy(): FormArray {
    return this.clientUpdateForm.get('policy') as FormArray;
  }

  createPolicyFormGroup(): FormGroup {
    return this.fb.group({      
      clientInsurancePolicyNumber: [''],
      clientInsurancePolicyName: [''],
      clientInsurancePolicyCompanyName: [''],
      clientInsurancePolicyTerm: [''],
      clientInsurancePolicyMaturityAmount: [''],
      clientInsurancePolicyPaymentPerInstallment: [''],
    });
  }

  addPolicy(): void {
    this.policy.push(this.createPolicyFormGroup());
  }

  removePolicy(index: number): void {
    this.policy.removeAt(index);
  }

  get medPolicy(): FormArray {
    return this.clientUpdateForm.get('medPolicy') as FormArray;
  }

  createMedPolicyFormGroup(): FormGroup {
    return this.fb.group({
      clientMedicalInsurancePolicyNumber: [''],
      clientMedicalInsurancePolicyName: [''],
      clientMedicalInsurancePolicyCompanyName: [''],
      clientMedicalInsurancePolicyTerm: [''],
      clientMedicalInsurancePolicyMaturityAmount: [''],
      clientMedicalInsurancePolicyPaymentPerInstallment: [''],
    });
  }

  addMedPolicy(): void {
    this.medPolicy.push(this.createMedPolicyFormGroup());
  }

  removeMedPolicy(index: number): void {
    this.medPolicy.removeAt(index);
  }

  get termPolicy(): FormArray {
    return this.clientUpdateForm.get('termPolicy') as FormArray;
  }

  createTermPolicyFormGroup(): FormGroup {
    return this.fb.group({
      clientTermInsurancePolicyNumber: [''],
      clientTermInsurancePolicyName: [''],
      clientTermInsurancePolicyCompanyName: [''],
      clientTermInsurancePolicyTerm: [''],
      clientTermInsurancePolicyMaturityAmount: [''],
      clientTermInsurancePolicyPaymentPerInstallment: [''],
    });
  }

  get bank(): FormArray {
    return this.clientUpdateForm.get('bank') as FormArray;
  }

  addTermPolicy(): void {
    this.termPolicy.push(this.createTermPolicyFormGroup());
  }

  removeTermPolicy(index: number): void {
    this.termPolicy.removeAt(index);
  }

  createBankFormGroup(): FormGroup {
    const bankGroup = this.fb.group({
      clientBankName: [''],
      clientBankAccountType: [''],
      clientBankAccountNo: [''],
      clientBankIfsc: [''],
      clientBankMicr: [''],
      clientBankAddress: [''],
      clientBankBranch: [''],
      clientBankCity: [''],
      clientBankPincode: [null],
      clientAccountPreference: ['']
    });
  
    // Subscribe to preference changes for this bank group
    const preferenceControl = bankGroup.get('clientAccountPreference');
    if (preferenceControl) {
      const subscription = preferenceControl.valueChanges.subscribe((newValue: string | null) => {
        if (newValue && parseInt(newValue) === this.primaryPreferenceId) {
          const index = this.findBankIndex(bankGroup);
          if (index !== -1) {
            this.updateOtherAccountsToSecondary(index);
          }
        }
      });
      this.subscriptions.push(subscription);
    }
  
    return bankGroup;
  }

  private findBankIndex(targetGroup: AbstractControl): number {
    return this.bank.controls.findIndex(control => control === targetGroup);
  }

  addBank(): void {
    if (this.bank.length < this.maxBankAccounts) {
      const newBank = this.createBankFormGroup();
      
      // Set new bank account to Secondary by default
      if (this.secondaryPreferenceId !== null) {
        const preferenceControl = newBank.get('clientAccountPreference');
        if (preferenceControl) {
          preferenceControl.setValue(this.secondaryPreferenceId, { emitEvent: false });
        }
      }
      
      this.bank.push(newBank);
      this.cdRef.markForCheck();
    }
  }

  removeBank(index: number): void {
    if (this.bank.length > 1) {
      const removedControl = this.bank.at(index);
      const wasPrimary = this.isPrimaryAccount(removedControl);
      
      // Clean up subscription
      if (this.subscriptions[index]) {
        this.subscriptions[index].unsubscribe();
        this.subscriptions.splice(index, 1);
      }
      
      this.bank.removeAt(index);
      
      // If we removed the primary account and there are other accounts,
      // make the first remaining account primary
      if (wasPrimary && this.bank.length > 0) {
        const firstAccount = this.bank.at(0);
        const preferenceControl = firstAccount.get('clientAccountPreference');
        if (preferenceControl && this.primaryPreferenceId !== null) {
          preferenceControl.setValue(this.primaryPreferenceId);
        }
      }
      
      this.cdRef.markForCheck();
    }
  }

  get canAddBank(): boolean {
    return this.bank.length < this.maxBankAccounts;
  }

  private isPrimaryAccount(control: AbstractControl): boolean {
    const preferenceControl = control.get('clientAccountPreference');
    return preferenceControl?.value === this.primaryPreferenceId;
  }

  updateAccountPreferences(changedIndex: number): void {
    const changedControl = this.bank.at(changedIndex);
    const preferenceControl = changedControl.get('clientAccountPreference');
    
    if (!preferenceControl) return;

    const newPreferenceId = preferenceControl.value;
    
    if (newPreferenceId === this.primaryPreferenceId) {
      this.updateOtherAccountsToSecondary(changedIndex);
    }
    
    this.cdRef.markForCheck();
  }

  private updateOtherAccountsToSecondary(primaryIndex: number): void {
    if (this.secondaryPreferenceId === null) return;

    this.bank.controls.forEach((control, index) => {
      if (index !== primaryIndex) {
        const preferenceControl = control.get('clientAccountPreference');
        if (preferenceControl) {
          preferenceControl.setValue(this.secondaryPreferenceId, { emitEvent: false });
        }
      }
    });
  }
  
  async loadClientData(): Promise<void> {
    this.loading = true;
    try {
      const response = await this.clientService.listsClientDetails(this.clientId);
      if (response.data && response.data.code === 1) {
        const clientData = response.data.data;
        this.patchFormWithClientData(clientData);
        this.clientLastUpdated = clientData.lastUpdated || clientData.createdAt || new Date().toISOString();
      } else {
        throw new Error(response.data.message || 'Failed to load client data');
      }
    } catch (error) {
      console.error('Error loading client data:', error);
      await Swal.fire('Error', 'Failed to load client data', 'error');
    } finally {
      this.loading = false;
      this.cdRef.markForCheck();
    }
  }

  isFileInput(fieldName: string): boolean {
    return this.uploadFileFields.includes(fieldName);
  }

  patchFormWithClientData(clientData: any): void {
  
    // Patch main client details
    const clientDetails = clientData.client[0];
    Object.keys(clientDetails).forEach(key => {
      const control = this.clientUpdateForm.get(key);
      if (control && !(control instanceof FormGroup) && !this.isFileInput(key)) {
        control.patchValue(clientDetails[key] ?? '');
      }
    });

    this.clientUpdateForm.patchValue({
      clientName: clientData.client[0].clientName,
      clientEmail: clientData.client[0].clientEmail,
      clientPhone: clientData.client[0].clientPhone,
      clientAlternatePhone: clientData.client[0].clientAlternatePhone,
      clientPanNo: clientData.client[0].clientPanNo,
      clientKycNo: clientData.client[0].clientKycNo,
      clientAadharNo: clientData.client[0].clientAadharNo,
      clientVoterId: clientData.client[0].clientVoterId,
      clientDrivingLicenseNo: clientData.client[0].clientDrivingLicenseNo,
      clientDrivingLicenseExpiryDate: clientData.client[0].clientDrivingLicenseExpiryDate,
      clientPassportNo: clientData.client[0].clientPassportNo,
      clientPassportExpiryDate: clientData.client[0].clientPassportExpiryDate,
      clientCentralGovtId: clientData.client[0].clientCentralGovtId,
      clientCentralGovtIdNo: clientData.client[0].clientCentralGovtIdNo,
      clientBloodGroup: clientData.client[0].clientBloodGroup,
      clientDateOfBirth: clientData.client[0].clientDateOfBirth,
      clientGender: clientData.client[0].clientGender,
      clientMaritalStatus: clientData.client[0].clientMaritalStatus,
      clientAnniversaryDate: clientData.client[0].clientAnniversaryDate,
      clientCountryOfBirth: clientData.client[0].clientCountryOfBirth,
      clientPlaceOfBirth: clientData.client[0].clientPlaceOfBirth,
      clientCitizenship: clientData.client[0].clientCitizenship,
      clientResidentialStatus: clientData.client[0].clientResidentialStatus,
      clientOccupation: clientData.client[0].clientOccupation,
      clientAnnualIncome: clientData.client[0].clientAnnualIncome,
      clientPoliticallyExposed: clientData.client[0].clientPoliticallyExposed,
    });
  
    // Handle nested form groups and arrays
    this.patchNestedFormGroup('familyDetails', clientData.family && clientData.family[0]);
    this.patchNestedFormGroup('presentAddress', clientData.present_address && clientData.present_address[0]);
    this.patchNestedFormGroup('permanentAddress', clientData.permanent_address && clientData.permanent_address[0]);
    this.patchNestedFormGroup('OfficeAddress', clientData.office_address && clientData.office_address[0]);
    this.patchNestedFormGroup('overseasAddress', clientData.overseas_address && clientData.overseas_address[0]);
    this.patchNestedFormGroup('tax', clientData.tax && clientData.tax[0]);
    this.patchNestedFormGroup('attorney', clientData.attorney && clientData.attorney[0]);
    this.patchNestedFormGroup('guardian', clientData.guardian && clientData.guardian[0]);

    this.patchFormArray('children', clientData.children || []);
    this.patchFormArray('nominee', clientData.nominee || []);
    this.patchFormArray('policy', clientData.insurance || []);
    this.patchFormArray('medPolicy', clientData.medical_insurance || []);
    this.patchFormArray('termPolicy', clientData.term_insurance || []);
    this.patchFormArray('bank', clientData.bank || []);
    
    // Handle file uploads
    if (clientData.upload_files && clientData.upload_files[0]) {
      const uploadFiles = clientData.upload_files[0];
      this.patchFileUploads(uploadFiles);
    }   
    this.cdRef.detectChanges();
  }

  patchNestedFormGroup(groupName: string, data: any): void {
    if (data) {
      const formGroup = this.clientUpdateForm.get(groupName) as FormGroup;
      if (formGroup) {
        Object.keys(data).forEach(key => {
          if (!this.isFileInput(key)) {
            formGroup.get(key)?.patchValue(data[key]);
          }
        });
      }
    }
  }

  patchFileUploads(uploadFiles: any): void {
    if (uploadFiles) {
      Object.keys(uploadFiles).forEach(key => {
        if (uploadFiles[key] && typeof uploadFiles[key] === 'string' && this.isFileInput(key)) {
          // Store the file information
          this.fileObjects[key] = uploadFiles[key];
          // Extract the file name from the path or use a default name
          const fileName = uploadFiles[key].split('/').pop() || `${key}.pdf`;
          // Store the file name
          this.fileNames[key] = fileName;
          // Create a safe URL for preview if it's an image
          if (uploadFiles[key].startsWith('data:image')) {
            this.createImagePreview(key, uploadFiles[key]);
          }
        }
      });
    }
    this.cdRef.detectChanges();
  }

  createImagePreview(key: string, base64Data: string): void {
    const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(base64Data);
    this.fileObjects[`${key}Preview`] = safeUrl;
  }

  patchFormArray(arrayName: string, data: any[]): void {
    const formArray = this.clientUpdateForm.get(arrayName) as FormArray;
    if (formArray) {
      formArray.clear();
      data.forEach(item => {
        const formGroup = this.createFormGroupForArray(arrayName);
        formGroup.patchValue(item);
        formArray.push(formGroup);
      });
    }
  }

  createFormGroupForArray(arrayName: string): FormGroup {
    switch (arrayName) {
      case 'children': return this.createChildFormGroup();
      case 'nominee': return this.createNomineeFormGroup();
      case 'policy': return this.createPolicyFormGroup();
      case 'medPolicy': return this.createMedPolicyFormGroup();
      case 'termPolicy': return this.createTermPolicyFormGroup();
      case 'bank': return this.createBankFormGroup();
      default: throw new Error(`Unknown form array: ${arrayName}`);
    }
  }

  calculateAge(birthDate: string): number {
    if (!birthDate) return 0;
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
      age--;
    }
    return age;
  }
  
  updateClientGuardianFields(): void {
    const dob = this.clientUpdateForm.get('clientDateOfBirth')?.value;
    if (dob) {
      const age = this.calculateAge(dob);
      this.showClientGuardianFields = age < 18;
      const guardianGroup = this.clientUpdateForm.get('guardian') as FormGroup;
      
      if (age < 18) {
        guardianGroup.get('clientGuardianName')?.setValidators([Validators.required]);
        guardianGroup.get('clientGuardianRelation')?.setValidators([Validators.required]);
        guardianGroup.get('clientGuardianPanNo')?.setValidators([Validators.required]);
      } else {
        guardianGroup.get('clientGuardianName')?.clearValidators();
        guardianGroup.get('clientGuardianRelation')?.clearValidators();
        guardianGroup.get('clientGuardianPanNo')?.clearValidators();
      }
      
      guardianGroup.get('clientGuardianName')?.updateValueAndValidity();
      guardianGroup.get('clientGuardianRelation')?.updateValueAndValidity();
      guardianGroup.get('clientGuardianPanNo')?.updateValueAndValidity();
    } else {
      this.showClientGuardianFields = false;
      this.clientUpdateForm.get('guardian.clientGuardianName')?.clearValidators();
      this.clientUpdateForm.get('guardian.clientGuardianRelation')?.clearValidators();
      this.clientUpdateForm.get('guardian.clientGuardianPanNo')?.clearValidators();
    }
    this.cdRef.detectChanges();
  }

  updateGuardianFields(index: number): void {
    const nomineeFormGroup = this.nominee.at(index) as FormGroup;
    const dob = nomineeFormGroup.get('clientNomineeDob')?.value;
    
    if (dob) {
      const age = this.calculateAge(dob);
      if (age >= 18) {
        nomineeFormGroup.get('clientNomineeGuardianName')?.disable();
        nomineeFormGroup.get('clientNomineeGuardianRelation')?.disable();
        nomineeFormGroup.get('clientNomineeGuardianPanNo')?.disable();
      } else {
        nomineeFormGroup.get('clientNomineeGuardianName')?.enable();
        nomineeFormGroup.get('clientNomineeGuardianRelation')?.enable();
        nomineeFormGroup.get('clientNomineeGuardianPanNo')?.enable();
      }
    } else {
      // If no date of birth is set, disable and hide guardian fields
      nomineeFormGroup.get('clientNomineeGuardianName')?.disable();
      nomineeFormGroup.get('clientNomineeGuardianRelation')?.disable();
      nomineeFormGroup.get('clientNomineeGuardianPanNo')?.disable();
    }
    this.cdRef.detectChanges(); // Trigger change detection
  }

  showGuardianFields(index: number): boolean {
    const nomineeFormGroup = this.nominee.at(index) as FormGroup;
    const dob = nomineeFormGroup.get('clientNomineeDob')?.value;
    return dob && this.calculateAge(dob) < 18;
  }

  nextStep() {
    if (this.currentStep < this.steps.length) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  async prepareJsonData(): Promise<any> {
    const formValue = this.clientUpdateForm.value;
    
    const uploadFilesJson: { [key: string]: string | { name: string, content: string } } = {};
    for (const key of this.uploadFileFields) {
      if (this.fileObjects[key]) {
        if (this.fileObjects[key] instanceof File) {
          try {
            const base64Content = await this.fileToBase64(this.fileObjects[key] as File);
            uploadFilesJson[key] = {
              name: this.fileNames[key] || `${key}.pdf`,
              content: base64Content.split(',')[1] // Remove the data:image/png;base64, part
            };
          } catch (error) {
            console.error(`Error encoding file ${key}:`, error);
          }
        } else if (typeof this.fileObjects[key] === 'string') {
          uploadFilesJson[key] = this.fileObjects[key] as string;
        }
      }
    }

    return {
      clientJson: {
        clientName: formValue.clientName,
        clientEmail: formValue.clientEmail,
        clientPhoneCountryCode: formValue.clientPhoneCountryCode,
        clientPhone: formValue.clientPhone,
        clientAlternatePhoneCountryCode: formValue.clientAlternatePhoneCountryCode,
        clientAlternatePhone: formValue.clientAlternatePhone,
        clientPanNo: formValue.clientPanNo,
        clientKycNo: formValue.clientKycNo,
        clientAadharNo: formValue.clientAadharNo,
        clientVoterId: formValue.clientVoterId,
        clientDrivingLicenseNo: formValue.clientDrivingLicenseNo,
        clientDrivingLicenseExpiryDate: formValue.clientDrivingLicenseExpiryDate,
        clientPassportNo: formValue.clientPassportNo,
        clientPassportExpiryDate: formValue.clientPassportExpiryDate,
        clientCentralGovtId: formValue.clientCentralGovtId,
        clientCentralGovtIdNo: formValue.clientCentralGovtIdNo,
        clientBloodGroup: formValue.clientBloodGroup,
        clientDateOfBirth: formValue.clientDateOfBirth,
        clientGender: formValue.clientGender,
        clientMaritalStatus: formValue.clientMaritalStatus,
        clientAnniversaryDate: formValue.clientAnniversaryDate,
        clientCountryOfBirth: formValue.clientCountryOfBirth,
        clientPlaceOfBirth: formValue.clientPlaceOfBirth,
        clientCitizenship: formValue.clientCitizenship,
        clientResidentialStatus: formValue.clientResidentialStatus,
        clientOccupation: formValue.clientOccupation,
        clientAnnualIncome: formValue.clientAnnualIncome,
        clientPoliticallyExposed: formValue.clientPoliticallyExposed,
      },familyJson: formValue.familyDetails,
      childrenJson: formValue.children,
      presentAddressJson: formValue.presentAddress,
      permanentAddressJson: formValue.permanentAddress,
      officeAddressJson: formValue.OfficeAddress,
      overseasAddressJson: formValue.overseasAddress,
      nomineeJson: formValue.nominee,
      insuranceJson: formValue.policy,
      medicalInsuranceJson: formValue.medPolicy,
      termInsuranceJson: formValue.termPolicy,
      uploadFilesJson: Object.keys(uploadFilesJson).length > 0 ? uploadFilesJson : null,
      bankJson: formValue.bank,
      taxJson: formValue.tax,
      attorneyJson:formValue.attorney,
      guardianJSON: formValue.guardian
    };
  }
  
  getInvalidFields(): string[] {
    const invalidFields: string[] = [];
    Object.keys(this.clientUpdateForm.controls).forEach(key => {
      const control = this.clientUpdateForm.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(nestedKey => {
          if (control.get(nestedKey)?.invalid) {
            invalidFields.push(`${key}.${nestedKey}`);
          }
        });
      } else if (control instanceof FormArray) {
        control.controls.forEach((arrayControl, index) => {
          if (arrayControl instanceof FormGroup) {
            Object.keys(arrayControl.controls).forEach(arrayKey => {
              if (arrayControl.get(arrayKey)?.invalid) {
                invalidFields.push(`${key}[${index}].${arrayKey}`);
              }
            });
          }
        });
      } else if (control?.invalid) {
        invalidFields.push(key);
      }
    });
    return invalidFields;
  }

  async onSubmit(event: Event | undefined): Promise<void> {
    if (event) {
      event.preventDefault();
    }
    this.customStylesValidated = true;
    this.submitted = true;
  
    // Update client guardian fields before form validation
    this.updateClientGuardianFields();
  
    if (this.clientUpdateForm.invalid) {
      console.error('Form is invalid:', this.clientUpdateForm.errors);
      this.logFormErrors(this.clientUpdateForm);
      
      const invalidFields = this.getInvalidFields();
      let errorMessage = `Please fill all required fields correctly. Missing fields:\n${invalidFields.join('\n')}`;
      
      // Check specifically for guardian fields if client is under 18
      const dob = this.clientUpdateForm.get('clientDateOfBirth')?.value;
      if (dob && this.calculateAge(dob) < 18) {
        const guardianGroup = this.clientUpdateForm.get('guardian') as FormGroup;
        if (guardianGroup.invalid) {
          errorMessage += '\n\nGuardian information is required for clients under 18 years old';
        }
      }
      
      await Swal.fire('Error', errorMessage, 'error');
      return;
    }
  
    this.loading = true;
    try {
      const completeJson = await this.prepareJsonData();
      await this.processClientData(completeJson);
    } catch (error) {
      console.error('Error processing form:', error);
      let errorMessage = "An error occurred while processing the form.";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      await Swal.fire('Error', errorMessage, 'error');
    } finally {
      this.loading = false;
      this.cdRef.markForCheck();
    }
  }

  logFormErrors(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.logFormErrors(control);
      } else if (control instanceof FormArray) {
        control.controls.forEach((arrayControl, index) => {
          if (arrayControl instanceof FormGroup) {
            this.logFormErrors(arrayControl);
          }
        });
      } else {
        if (control && control.invalid) {
          console.error(`Control ${key} is invalid. Errors:`, control.errors);
        }
      }
    });
  }
  
  uploadFileFields = [
    'clientPaasPortSizePhoto',
    'clientPanCardPhoto',
    'clientAadharCard',
    'clientDrivingLicense',
    'clientVoterIDFrontImage',
    'clientVoterIDBackImage',
    'clientPassportFrontImage',
    'clientPassportBackImage',
    'clientForeignAddressProof',
    'clientForeignTaxIdentificationProof',
    'clientCancelledChequeCopy',
    'clientBankAccountStatementOrPassbook',
    'clientChildrenBirthCertificate',
    'clientPowerOfAttorneyUpload'
  ];
  
  isFieldInvalid(fieldName: string): boolean {
    const control = this.clientUpdateForm.get(fieldName);
    return control ? (control.invalid && (control.touched || this.submitted)) : false;
  }

  async prepareFormData(): Promise<FormData> {
    const formData = new FormData();
    const formValue = this.clientUpdateForm.value;
  
    // Append form fields
    Object.keys(formValue).forEach(key => {
      if (typeof formValue[key] === 'object' && !(formValue[key] instanceof File)) {
        formData.append(key, JSON.stringify(formValue[key]));
      } else {
        formData.append(key, formValue[key]);
      }
    });
  
    // Append files
    for (const [key, value] of Object.entries(this.fileObjects)) {
      if (value instanceof File) {
        formData.append(key, value, this.fileNames[key] || `${key}.pdf`);
      }
    }
  
    return formData;
  }

  async prepareUploadFilesJson(): Promise<{ [key: string]: string }> {
    const result: { [key: string]: string } = {};
  
    for (const field of this.uploadFileFields) {
      if (this.fileObjects[field]) {
        if (typeof this.fileObjects[field] === 'string') {
          // If it's already a base64 string, use it directly
          result[field] = this.fileObjects[field] as string;
        } else {
          // If it's a File object, convert to base64
          result[field] = await this.fileToBase64(this.fileObjects[field] as File);
        }
      }
    }
  
    return result;
  }

  async prepareFileData(fileObjects: { [key: string]: File | string }): Promise<{ [key: string]: string }> {
    const fileData: { [key: string]: string } = {};
    for (const key in fileObjects) {
      if (fileObjects[key]) {
        if (typeof fileObjects[key] === 'string') {
          // If it's already a string (base64), use it directly
          fileData[key] = fileObjects[key] as string;
        } else {
          // If it's a File object, convert to base64
          fileData[key] = await this.fileToBase64(fileObjects[key] as File);
        }
      }
    }
    return fileData;
  }

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
  
  async processClientData(completeJson: any): Promise<void> {
  try {
    completeJson.timestamp = new Date().toISOString();

    const response = await lastValueFrom(this.clientService.processClient(completeJson, this.clientId));
    if (response.code === 1) {
      await Swal.fire("Updated!", response.message, "success");
      this.router.navigate(['/clients']);
    } else {
      await Swal.fire("Failed!", response.message, "error");
    }
  } catch (error) {
    console.error('Error updating Client:', error);
    await Swal.fire("Failed!", "An error occurred while updating the Client", "error");
  } finally {
    this.loading = false;
  }
}

  onFileChange(event: any, fieldName: string): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg'];
      if (allowedTypes.includes(file.type)) {
        this.fileObjects[fieldName] = file;
        this.fileNames[fieldName] = file.name;
        if (file.type.startsWith('image/')) {
          this.createImagePreviewFromFile(fieldName, file);
        }
      } else {
        Swal.fire('Invalid File', 'Please upload a PDF, JPG, or JPEG file', 'error');
        event.target.value = ''; // Clear the file input
      }
      this.cdRef.detectChanges();
    }    
  }

  createImagePreviewFromFile(fieldName: string, file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(e.target.result);
      this.fileObjects[`${fieldName}Preview`] = safeUrl;
      this.cdRef.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  onCancel() {
    this.router.navigate(['/clients']);
  }
} 