import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, AbstractControl, Validators, FormArray } from '@angular/forms';
import { ProgressBarDirective, ProgressComponent as ProgressComponent_1, ProgressBarComponent, FormFloatingDirective, ProgressStackedComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { ClientService } from '../../../main/common-service/client/client.service'
import { stateCommonInterface, genderCommonInterface, maritalstatusCommonInterface, politicallyexposedpersonCommonInterface, bankNameCommonInterface, relationshipCommonInterface, accountPreferenceCommonInterface, accountTypeCommonInterface } from '../../../main/interfaces/interfaces'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { lastValueFrom, Subscription  } from 'rxjs';

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
  selector: 'app-create-clients',
  standalone: true,
  imports: [ ProgressBarDirective, ProgressComponent_1, ProgressBarComponent, ProgressStackedComponent, FormFloatingDirective, NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './create-clients.component.html',
  styleUrls: ['./create-clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateClientsComponent implements OnInit {
  i: number = 1;
  clientForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  customStylesValidated = false;
  max = 3;
  isClientUnder18: boolean = false;

  state: stateCommonInterface[] = [];
  countries: Country[] = [];
  gender: genderCommonInterface[] = [];
  maritalStatus: maritalstatusCommonInterface[] = [];
  politicalExposed: politicallyexposedpersonCommonInterface[] = [];
  bankName: any[] = [];
  relation: relationshipCommonInterface[] = [];
  accountType: accountTypeCommonInterface[] = [];
  accountPreference: AccountPreference[] = [];
  fileObjects: { [key: string]: string } = {};
  fileNames: { [key: string]: string } = {};
  showClientGuardianFields: boolean = false;

  currentStep: number = 1;
  steps: string[] = ['Basic Details', 'Family Details', 'Present Address', 'Permanent Address', 'Office Address', 'Overseas Address', 'Nominee', 'Insurance', 'Upload Files', 'Bank Details', 'Other Details'];
  
  private primaryPreferenceId: number | null = null;
  private secondaryPreferenceId: number | null = null;
  private maxBankAccounts = 3;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clientService: ClientService,
    private cdRef: ChangeDetectorRef
  ) { 
    this.initForm();
  }  

  ngOnInit(): void {
    document.documentElement.style.setProperty('--stepNumber', this.steps.length.toString());
    this.clientForm.get('clientDateOfBirth')?.valueChanges.subscribe(() => {
      this.updateClientGuardianFields();
    });
    this.loadInitialData();
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  initForm():void{
    this.clientForm = this.fb.group({
      clientName: ['', Validators.required],
      clientEmail: ['', [Validators.required, Validators.email]],
      clientPhoneCountryCode: ['', Validators.required],
      clientPhone: ['', Validators.required],
      clientAlternatePhoneCountryCode: [''],
      clientAlternatePhone: [''],
      clientPanNo: ['', Validators.required],
      clientKycNo: [null],
      clientAadharNo: ['', Validators.required],
      clientVoterId: [null],
      clientDrivingLicenseNo: [null],
      clientDrivingLicenseExpiryDate: [null],
      clientPassportNo: [null],
      clientPassportExpiryDate: [null],
      clientCentralGovtId: [null],
      clientCentralGovtIdNo: [null],
      clientBloodGroup: [''],
      clientDateOfBirth: [null, Validators.required],
      clientGender: ['', Validators.required],
      clientMaritalStatus: ['', Validators.required],
      clientAnniversaryDate: [null],
      clientCountryOfBirth: ['', Validators.required],
      clientPlaceOfBirth: ['', Validators.required],
      clientCitizenship: [''],
      clientResidentialStatus: [''],
      clientOccupation: ['', Validators.required],
      clientAnnualIncome: ['', Validators.required],
      clientPoliticallyExposed: ['', Validators.required],
      familyDetails: this.fb.group({
        clientFatherName: [''],
        clientMotherName: [''],
        clientSpouseName: [''],
        clientSpouseBirthDate: [null]
      }),
      children: this.fb.array([this.createChildFormGroup()]),
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
      nominee: this.fb.array([this.createNomineeFormGroup()]),
      policy: this.fb.array([this.createPolicyFormGroup()]),
      medPolicy: this.fb.array([this.createMedPolicyFormGroup()]),
      termPolicy: this.fb.array([this.createTermPolicyFormGroup()]),
      uploadFiles: this.fb.group({
        clientPaasPortSizePhoto: [null],
        clientPanCardPhoto: [null],
        clientAadharCard: [null],
        clientDrivingLicense: [null],
        clientVoterIDFrontImage  : [null],
        clientVoterIDBackImage: [null],
        clientPassportFrontImage: [null],
        clientPassportBackImage: [null],
        clientForeignAddressProof: [null],
        clientForeignTaxIdentificationProof: [null],
        clientCancelledChequeCopy: [null],
        clientBankAccountStatementOrPassbook: [null],
        clientChildrenBirthCertificate: [null],
        clientPowerOfAttorneyUpload: [null],
      }),
      bank: this.fb.array([this.createBankFormGroup()]),
      tax: this.fb.group({
        clientTaxIdDetail: [''],
        clientTaxIdNo: [''],
        clientTaxCountry: [''],
      }),
      attorney: this.fb.group({
        clientPowerOfAttorneyName: [''],
        clientPowerOfAttorneyPanNo: ['']
      }),
      guardian: this.fb.group({
        clientGuardianName: ['', Validators.required],
        clientGuardianRelation: ['', Validators.required],
        clientGuardianPanNo: ['', Validators.required],
      })
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
  get f() { return this.clientForm.controls; }

  loadStates() {
    this.clientService.getStates()
      .then(response => {
        this.state = response.data;
        this.cdRef.detectChanges();
      })
      .catch(error => console.error('Error loading States:', error));
  }

  loadCountry() {
    this.clientService.getCountries()
      .then(response => {
        this.countries = response.data;
        // Sort countries by dial code
        this.countries.sort((a, b) => parseInt(a.dial_code) - parseInt(b.dial_code));
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
      .catch(error => console.error('Error loading Gender:', error));
  }

  loadMaritalStatus() {
    this.clientService.getMaritalStatus()
      .then(response => {
        this.maritalStatus = response.data;
        this.cdRef.detectChanges();
      })
      .catch(error => console.error('Error loading Marital Status:', error));
  }

  loadPoliticalExposed() {
    this.clientService.getPoliticallyExposedPerson()
      .then(response => {
        this.politicalExposed = response.data;
        this.cdRef.detectChanges();
      })
      .catch(error => console.error('Error loading Political Exposed:', error));
  }

  loadBank() {
    this.clientService.getBankName()
      .then(response => {
        this.bankName = response.data;
        this.cdRef.detectChanges();
      })
      .catch(error => console.error('Error loading bank:', error));
  }

  loadRelation() {
    this.clientService.getRelationship()
      .then(response => {
        this.relation = response.data;
        this.cdRef.detectChanges();
      })
      .catch(error => console.error('Error loading relation:', error));
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
    return this.clientForm.get('children') as FormArray;
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
    return this.clientForm.get('nominee') as FormArray;
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
    if (this.nominee.length < this.max) {
      this.nominee.push(this.createNomineeFormGroup());
    }
  }

  get canAddNominee(): boolean {
    return this.nominee.length < this.max;
  }

  removeNominee(index: number): void {
    this.nominee.removeAt(index);
  }

  get policy(): FormArray {
    return this.clientForm.get('policy') as FormArray;
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
    return this.clientForm.get('medPolicy') as FormArray;
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
    return this.clientForm.get('termPolicy') as FormArray;
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

  addTermPolicy(): void {
    this.termPolicy.push(this.createTermPolicyFormGroup());
  }

  removeTermPolicy(index: number): void {
    this.termPolicy.removeAt(index);
  }

  get bank(): FormArray {
    return this.clientForm.get('bank') as FormArray;
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

  validatePrimaryAccount(): boolean {
    if (!this.primaryPreferenceId) return false;
    
    const primaryAccounts = this.bank.controls.filter(control => 
      control.get('clientAccountPreference')?.value === this.primaryPreferenceId
    );
    return primaryAccounts.length === 1;
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
    const dob = this.clientForm.get('clientDateOfBirth')?.value;
    if (dob) {
      const age = this.calculateAge(dob);
      this.showClientGuardianFields = age < 18;
      const guardianGroup = this.clientForm.get('guardian') as FormGroup;
      
      if (age < 18) {
        guardianGroup.enable();
        guardianGroup.get('clientGuardianName')?.setValidators([Validators.required]);
        guardianGroup.get('clientGuardianRelation')?.setValidators([Validators.required]);
        guardianGroup.get('clientGuardianPanNo')?.setValidators([Validators.required]);
      } else {
        guardianGroup.disable();
        guardianGroup.get('clientGuardianName')?.clearValidators();
        guardianGroup.get('clientGuardianRelation')?.clearValidators();
        guardianGroup.get('clientGuardianPanNo')?.clearValidators();
      }
      
      guardianGroup.get('clientGuardianName')?.updateValueAndValidity();
      guardianGroup.get('clientGuardianRelation')?.updateValueAndValidity();
      guardianGroup.get('clientGuardianPanNo')?.updateValueAndValidity();
    } else {
      this.isClientUnder18 = false;
      this.showClientGuardianFields = false;
      const guardianGroup = this.clientForm.get('guardian') as FormGroup;
      guardianGroup.disable();
      guardianGroup.get('clientGuardianName')?.clearValidators();
      guardianGroup.get('clientGuardianRelation')?.clearValidators();
      guardianGroup.get('clientGuardianPanNo')?.clearValidators();
    }
    this.cdRef.detectChanges();
  }

  isGuardianInfoComplete(): boolean {
    const guardianGroup = this.clientForm.get('guardian') as FormGroup;
    return guardianGroup.valid && 
           guardianGroup.get('clientGuardianName')?.value &&
           guardianGroup.get('clientGuardianRelation')?.value &&
           guardianGroup.get('clientGuardianPanNo')?.value;
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

  async onSubmit(event: Event | undefined) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.submitted = true;
  
    if (!this.clientForm.valid) {
      const missingFields = this.getMissingFields();
      if (missingFields.length > 0) {
        const errorMessage = `Please fill in the following required fields:\n${missingFields.join('\n')}`;
        await Swal.fire('Error', errorMessage, 'error');
      } else {
        await Swal.fire('Error', 'Please fill all required fields correctly.', 'error');
      }
      return;
    }
  
    if (this.isClientUnder18 && !this.isGuardianInfoComplete()) {
      await Swal.fire('Error', 'Guardian information is required for clients under 18 years old.', 'error');
      return;
    }
  
    this.loading = true;    
    try {
      const completeJson = await this.prepareJsonData();
      await this.processClientData(completeJson);
    } catch (error) {
      console.error('Error processing form:', error);
      await Swal.fire('Error', 'An error occurred while processing the form.', 'error');
    } finally {
      this.loading = false;
      this.cdRef.detectChanges();
    }
  }
  
  private getMissingFields(): string[] {
    const missingFields: string[] = [];
    Object.keys(this.clientForm.controls).forEach(key => {
      const control = this.clientForm.get(key);
      if (control && control.invalid) {
        if (control instanceof FormGroup) {
          Object.keys(control.controls).forEach(subKey => {
            const subControl = control.get(subKey);
            if (subControl && subControl.invalid && subControl.errors?.['required']) {
              missingFields.push(this.getFieldName(key, subKey));
            }
          });
        } else if (control.errors?.['required']) {
          missingFields.push(this.getFieldName(key));
        }
      }
    });
    return missingFields;
  }
  
  private getFieldName(key: string, subKey?: string): string {
    const fieldNames: { [key: string]: string } = {
      clientName: 'Client Name',
      clientEmail: 'Email',
      clientPhoneCountryCode: 'Phone Country Code',
      clientPhone: 'Phone Number',
      clientPanNo: 'PAN Number',
      clientAadharNo: 'Aadhar Number',
      clientDateOfBirth: 'Date of Birth',
      clientGender: 'Gender',
      clientMaritalStatus: 'Marital Status',
      clientCountryOfBirth: 'Country of Birth',
      clientPlaceOfBirth: 'Place of Birth',
      clientOccupation: 'Occupation',
      clientAnnualIncome: 'Annual Income',
      clientPoliticallyExposed: 'Politically Exposed Person',
      // Add more field names as needed
    };
  
    if (subKey) {
      return `${fieldNames[key] || key} - ${fieldNames[subKey] || subKey}`;
    }
    return fieldNames[key] || key;
  }
  
  isFieldInvalid(fieldName: string): boolean {
    const control = this.clientForm.get(fieldName);
    return control ? (control.invalid && (control.touched || this.submitted)) : false;
  }
  
  async prepareJsonData(): Promise<any> {
    const formValue = this.clientForm.value;

    const uploadFilesJson: { [key: string]: { name: string, content: string } } = {};
    for (const [key, value] of Object.entries(this.fileObjects)) {
      if (value) {
        uploadFilesJson[key] = {
          name: this.fileNames[key] || `${key}.jpg`,
          content: value
        };
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
      uploadFilesJson: uploadFilesJson,
      bankJson: formValue.bank,
      taxJson: formValue.tax,
      attorneyJson: formValue.attorney,
      guardianJSON: formValue.guardian
    };
  }

  async prepareFileData(uploadFiles: any): Promise<{ [key: string]: string }> {
    const fileData: { [key: string]: string } = {};
    for (const key in uploadFiles) {
      if (uploadFiles[key]) {
        fileData[key] = uploadFiles[key];
      }
    }
    return fileData;
  }

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64Data = result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = error => reject(error);
    });
  }
  
  async processClientData(completeJson: any): Promise<void> {
    try {
      const response = await lastValueFrom(this.clientService.processClient(completeJson, "0"));

      if (response.code === 1) {
        await Swal.fire("Added!", "Client created successfully", "success");
        this.router.navigate(['/clients']);
      } else {
        await Swal.fire("Failed!", "Error creating client", "error");
      }
    } catch (error) {
      console.error('Error processing Client:', error);
      let errorMessage = "An error occurred while processing the client entry.";
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

  onFileChange(event: any, fieldName: string): void {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/jpg', 'application/pdf'];
      if (allowedTypes.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const base64String = e.target.result.split(',')[1];
          this.fileObjects[fieldName] = base64String;
          this.fileNames[fieldName] = file.name;
          
          const control = this.clientForm.get(`uploadFiles.${fieldName}`);
          if (control) {
            control.markAsTouched();
            control.updateValueAndValidity();
          }
          this.cdRef.detectChanges();
        };
        reader.readAsDataURL(file);
      } else {
        console.error('Invalid file type. Please upload a JPG, JPEG, or PDF file.');
        Swal.fire('Error', 'Invalid file type. Please upload a JPG, JPEG, or PDF file.', 'error');
      }
    }
  }
} 

