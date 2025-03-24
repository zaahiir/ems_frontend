  import { ChangeDetectionStrategy, Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
  import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
  import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
  import { ProgressBarDirective, ProgressComponent as ProgressComponent_1, ProgressBarComponent, FormFloatingDirective, ProgressStackedComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
  import { ClientService } from '../../../main/common-service/client/client.service'
  import { stateCommonInterface, countryInterface, genderCommonInterface, maritalstatusCommonInterface, politicallyexposedpersonCommonInterface,
    bankNameCommonInterface, relationshipCommonInterface, accountPreferenceCommonInterface, accountTypeCommonInterface } from '../../../main/interfaces/interfaces'
  import Swal from 'sweetalert2';
  import { ActivatedRoute } from '@angular/router';
  import { Subject, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs';
  import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
    templateUrl: './view-client.component.html',
    styleUrl: './view-client.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
  })

  export class ViewClientComponent implements OnInit, OnDestroy{
    isSelectDisabled: boolean = true; 
    private destroy$ = new Subject<void>();
    i: number = 1;
    clientId: string = '0';
    clientLastUpdated: string = '';
    clientViewForm!: FormGroup;
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
    accountPreference: accountPreferenceCommonInterface[] = [];
    fileObjects: { [key: string]: File | string | SafeUrl } = {};
    fileNames: { [key: string]: string } = {};

    currentStep: number = 1;
    steps: string[] = ['Basic Details', 'Family Details', 'Present Address', 'Permanent Address', 'Office Address', 'Overseas Address', 'Nominee', 'Insurance', 'Upload Files', 'Bank Details', 'Other Details'];

    constructor(
      private fb: FormBuilder,
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
    }

    private setupForm(): void {
      document.documentElement.style.setProperty('--stepNumber', this.steps.length.toString());
      this.clientViewForm.get('clientDateOfBirth')?.valueChanges.subscribe(() => {
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
      this.clientViewForm.valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      ).subscribe(() => {
        this.cdRef.markForCheck();
      });
    }

    initForm():void{
      this.clientViewForm = this.fb.group({
        clientName: [{ value: '', disabled: true }],
        clientEmail: [{ value: '', disabled: true }],
        clientPhoneCountryCode: [{ value: '', disabled: true }],
        clientPhone: [{ value: '', disabled: true }],
        clientAlternatePhoneCountryCode: [{ value: '', disabled: true }],
        clientAlternatePhone: [{ value: '', disabled: true }],
        clientPanNo: [{ value: '', disabled: true }],
        clientKycNo: [{ value: null, disabled: true }],
        clientAadharNo: [{ value: '', disabled: true }],
        clientVoterId: [{ value: null, disabled: true }],
        clientDrivingLicenseNo: [{ value: null, disabled: true }],
        clientDrivingLicenseExpiryDate: [{ value: null, disabled: true }],
        clientPassportNo: [{ value: null, disabled: true }],
        clientPassportExpiryDate: [{ value: null, disabled: true }],
        clientCentralGovtId: [{ value: null, disabled: true }],
        clientCentralGovtIdNo: [{ value: null, disabled: true }],
        clientBloodGroup: [{ value: '', disabled: true }],
        clientDateOfBirth: [{ value: null, disabled: true }],
        clientGender: [{ value: '', disabled: true }],
        clientMaritalStatus: [{ value: '', disabled: true }],
        clientAnniversaryDate: [{ value: null, disabled: true }],
        clientCountryOfBirth: [{ value: '', disabled: true }],
        clientPlaceOfBirth: [{ value: '', disabled: true }],
        clientCitizenship: [{ value: '', disabled: true }],
        clientResidentialStatus: [{ value: '', disabled: true }],
        clientOccupation: [{ value: '', disabled: true }],
        clientAnnualIncome: [{ value: '', disabled: true }],
        clientPoliticallyExposed: [{ value: '', disabled: true }],
        familyDetails: this.fb.group({
          clientFatherName: [{ value: '', disabled: true }],
          clientMotherName: [{ value: '', disabled: true }],
          clientSpouseName: [{ value: '', disabled: true }],
          clientSpouseBirthDate: [{ value: null, disabled: true }]
        }),
        children: this.fb.array([]),
        presentAddress: this.fb.group({
          clientPresentAddress: [{ value: '', disabled: true }],
          clientPresentLandmark: [{ value: '', disabled: true }],
          clientPresentCity: [{ value: '', disabled: true }],
          clientPresentDistrict: [{ value: '', disabled: true }],
          clientPresentState: [{ value: '', disabled: true }],
          clientPresentPincode  : [{ value: null, disabled: true }],
          clientPresentCountryCode: [{ value: '', disabled: true }],
          clientPresentCountry: [{ value: '', disabled: true }],
          clientPresentMobile: [{ value: '', disabled: true }],
          clientPresentLandline: [{ value: '', disabled: true }],
        }),
        permanentAddress: this.fb.group({
          clientPermanentAddress: [{ value: '', disabled: true }],
          clientPermanentLandmark: [{ value: '', disabled: true }],
          clientPermanentCity: [{ value: '', disabled: true }],
          clientPermanentDistrict: [{ value: '', disabled: true }],
          clientPermanentState: [{ value: '', disabled: true }],
          clientPermanentPincode  : [{ value: null, disabled: true }],
          clientPermanentCountry: [{ value: '', disabled: true }],
          clientPermanentCountryCode: [{ value: '', disabled: true }],
          clientPermanentMobile: [{ value: '', disabled: true }],
          clientPermanentLandline: [{ value: '', disabled: true }],
        }),
        OfficeAddress: this.fb.group({
          clientOfficeAddress: [{ value: '', disabled: true }],
          clientOfficeLandline: [{ value: '', disabled: true }],
          clientOfficeCountryCode: [{ value: '', disabled: true }],
          clientOfficeMobile: [{ value: '', disabled: true }],
          clientOfficeCity: [{ value: '', disabled: true }],
          clientOfficeState  : [{ value: '', disabled: true }],
          clientOfficePincode: [{ value: null, disabled: true }],
          clientOfficeCountry: [{ value: '', disabled: true }],
        }),
        overseasAddress: this.fb.group({
          clientOverseasAddress: [{ value: '', disabled: true }],
          clientOverseasLandline: [{ value: '', disabled: true }],
          clientOverseasCountryCode: [{ value: '', disabled: true }],
          clientOverseasMobile: [{ value: '', disabled: true }],
          clientOverseasCity: [{ value: '', disabled: true }],
          clientOverseasState  : [{ value: '', disabled: true }],
          clientOverseasPincode: [{ value: null, disabled: true }],
          clientOverseasCountry: [{ value: '', disabled: true }],
        }),
        nominee: this.fb.array([]),
        policy: this.fb.array([]),
        medPolicy: this.fb.array([]),
        termPolicy: this.fb.array([]),
        uploadFiles: this.fb.group({
          clientPaasPortSizePhoto: [{ value: '', disabled: true }],
          clientPanCardPhoto: [{ value: '', disabled: true }],
          clientAadharCard: [{ value: '', disabled: true }],
          clientDrivingLicense: [{ value: '', disabled: true }],
          clientVoterIDFrontImage: [{ value: '', disabled: true }],
          clientVoterIDBackImage: [{ value: '', disabled: true }],
          clientPassportFrontImage: [{ value: '', disabled: true }],
          clientPassportBackImage: [{ value: '', disabled: true }],
          clientForeignAddressProof: [{ value: '', disabled: true }],
          clientForeignTaxIdentificationProof: [{ value: '', disabled: true }],
          clientCancelledChequeCopy: [{ value: '', disabled: true }],
          clientBankAccountStatementOrPassbook: [{ value: '', disabled: true }],
          clientChildrenBirthCertificate: [{ value: '', disabled: true }],
          clientPowerOfAttorneyUpload: [{ value: '', disabled: true }],
        }),
        bank: this.fb.array([]),
        tax: this.fb.group({
          clientTaxIdDetail: [{ value: '', disabled: true }],
          clientTaxIdNo: [{ value: '', disabled: true }],
          clientTaxCountry: [{ value: '', disabled: true }],
        }),
        attorney: this.fb.group({
          clientPowerOfAttorneyName: [{ value: '', disabled: true }],
          clientPowerOfAttorneyPanNo: [{ value: '', disabled: true }],
        }),
        guardian: this.fb.group({
          clientGuardianName: [{ value: '', disabled: true }],
          clientGuardianRelation: [{ value: '', disabled: true }],
          clientGuardianPanNo: [{ value: '', disabled: true }],
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
      this.loadAccountPreference();
    }  

    // convenience getter for easy access to form fields
    get f() { return this.clientViewForm.controls; }

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

    loadAccountPreference() {
      this.clientService.getAccountPreference()
        .then(response => {
          this.accountPreference = response.data;
          this.cdRef.detectChanges();
        })
        .catch(error => console.error('Error loading accountPreference:', error));
    }

    get children(): FormArray {
      return this.clientViewForm.get('children') as FormArray;
    }

    createChildFormGroup(): FormGroup {
      return this.fb.group({
        clientChildrenName: [{ value: '', disabled: true }],
        clientChildrenBirthDate: [{ value: null, disabled: true }]
      });
    }

    get nominee(): FormArray {
      return this.clientViewForm.get('nominee') as FormArray;
    }

    createNomineeFormGroup(): FormGroup {
      return this.fb.group({
        clientNomineeName: [{ value: '', disabled: true }],
        clientNomineeRelation: [{ value: '', disabled: true }],
        clientNomineePanNo: [{ value: '', disabled: true }],
        clientNomineeDob: [{ value: null, disabled: true }],
        clientNomineePercentageAllocation: [{ value: '', disabled: true }],
        clientNomineeGuardianName: [{ value: '', disabled: true }],
        clientNomineeGuardianRelation: [{ value: '', disabled: true }],
        clientNomineeGuardianPanNo: [{ value: '', disabled: true }]
      });
    }

    get canAddNominee(): boolean {
      return this.nominee.length < this.maxNominees;
    }

    get policy(): FormArray {
      return this.clientViewForm.get('policy') as FormArray;
    }

    createPolicyFormGroup(): FormGroup {
      return this.fb.group({      
        clientInsurancePolicyNumber: [{ value: '', disabled: true }],
        clientInsurancePolicyName: [{ value: '', disabled: true }],
        clientInsurancePolicyCompanyName: [{ value: '', disabled: true }],
        clientInsurancePolicyTerm: [{ value: '', disabled: true }],
        clientInsurancePolicyMaturityAmount: [{ value: '', disabled: true }],
        clientInsurancePolicyPaymentPerInstallment: [{ value: '', disabled: true }],
      });
    }

    get medPolicy(): FormArray {
      return this.clientViewForm.get('medPolicy') as FormArray;
    }

    createMedPolicyFormGroup(): FormGroup {
      return this.fb.group({
        clientMedicalInsurancePolicyNumber: [{ value: '', disabled: true }],
        clientMedicalInsurancePolicyName: [{ value: '', disabled: true }],
        clientMedicalInsurancePolicyCompanyName: [{ value: '', disabled: true }],
        clientMedicalInsurancePolicyTerm: [{ value: '', disabled: true }],
        clientMedicalInsurancePolicyMaturityAmount: [{ value: '', disabled: true }],
        clientMedicalInsurancePolicyPaymentPerInstallment: [{ value: '', disabled: true }],
      });
    }

    get termPolicy(): FormArray {
      return this.clientViewForm.get('termPolicy') as FormArray;
    }

    createTermPolicyFormGroup(): FormGroup {
      return this.fb.group({
        clientTermInsurancePolicyNumber: [{ value: '', disabled: true }],
        clientTermInsurancePolicyName: [{ value: '', disabled: true }],
        clientTermInsurancePolicyCompanyName: [{ value: '', disabled: true }],
        clientTermInsurancePolicyTerm: [{ value: '', disabled: true }],
        clientTermInsurancePolicyMaturityAmount: [{ value: '', disabled: true }],
        clientTermInsurancePolicyPaymentPerInstallment: [{ value: '', disabled: true }],
      });
    }

    get bank(): FormArray {
      return this.clientViewForm.get('bank') as FormArray;
    }

    createBankFormGroup(): FormGroup {
      return this.fb.group({
        clientBankName: [{ value: '', disabled: true }],
        clientBankAccountType: [{ value: '', disabled: true }],
        clientBankAccountNo: [{ value: '', disabled: true }],
        clientBankIfsc: [{ value: '', disabled: true }],
        clientBankMicr: [{ value: '', disabled: true }],
        clientBankAddress: [{ value: '', disabled: true }],
        clientBankBranch: [{ value: '', disabled: true }],
        clientBankCity: [{ value: '', disabled: true }],
        clientBankPincode: [{ value: null, disabled: true }],
        clientAccountPreference: [{ value: '', disabled: true }],
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
        const control = this.clientViewForm.get(key);
        if (control && !(control instanceof FormGroup) && !this.isFileInput(key)) {
          control.patchValue(clientDetails[key] ?? '');
        }
      });

      this.clientViewForm.patchValue({
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
        const formGroup = this.clientViewForm.get(groupName) as FormGroup;
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
            // Store the full file URL
            this.fileObjects[key] = this.clientService.getFullUrl(uploadFiles[key]);
            // Extract the file name from the path
            const fileName = uploadFiles[key].split('/').pop() || `${key}.pdf`;
            // Store the file name
            this.fileNames[key] = fileName;
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
      const formArray = this.clientViewForm.get(arrayName) as FormArray;
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
      const dob = this.clientViewForm.get('clientDateOfBirth')?.value;
      if (dob) {
        const age = this.calculateAge(dob);
        this.showClientGuardianFields = age < 18;
        const guardianGroup = this.clientViewForm.get('guardian') as FormGroup;
        
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
        this.clientViewForm.get('guardian.clientGuardianName')?.clearValidators();
        this.clientViewForm.get('guardian.clientGuardianRelation')?.clearValidators();
        this.clientViewForm.get('guardian.clientGuardianPanNo')?.clearValidators();
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
      const control = this.clientViewForm.get(fieldName);
      return control ? (control.invalid && (control.touched || this.submitted)) : false;
    }

    fileToBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
      });
    }

    openFilePreview(fieldName: string): void {
      const fileUrl = this.fileObjects[fieldName];
      if (fileUrl && typeof fileUrl === 'string') {
        window.open(fileUrl, '_blank');
      } else {
        console.error('No file URL available for', fieldName);
        Swal.fire('Error', 'File not available for preview.', 'error');
      }
    }
  } 