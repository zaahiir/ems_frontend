export interface userTypeMasterCommonInterface {
    id: number,
    userTypeName: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface countryInterface {
    id: number;
    countryName: string;
    countryCode: string;
    dailCode: string;
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface stateCommonInterface {
    id: number,
    stateName: string,
    stateCountry: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface modeCommonInterface {
    id: number,
    modeName: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface issueTypeCommonInterface {
    id: number,
    issueTypeName: string,
    estimatedIssueDay: number,
    reminderIssueDay: number,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface formTypeCommonInterface {
    id: number,
    formTypeName: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface gstTypeCommonInterface {
    id: number,
    gstTypeName: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface fileTypeCommonInterface {
    id: number,
    fileTypeName: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface countryInterface {
    code: string;
    name: string;
}

export interface genderCommonInterface {
    id: number,
    genderName: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface maritalstatusCommonInterface {
    id: number,
    maritalStatusName: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface politicallyexposedpersonCommonInterface {
    id: number,
    politicallyExposedPersonName: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface bankNameCommonInterface {
    id: number,
    bankName: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface relationshipCommonInterface {
    id: number,
    relationship: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface accountTypeCommonInterface {
    id: number,
    accountTypeName: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface accountPreferenceCommonInterface {
    id: number,
    accountPreferenceName: string,
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface amcMasterCommonInterface {
    id: number,
    amcName: string;
    amcMobile: string;
    amcAddress: string;
    amcState: stateCommonInterface | number | null ;
    amcCountry: string; 
    amcPinCode: number;
    amcGstNo: string;
    amcGstType: string;
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface fundNameCommonInterface {
    id: number,
    fundAmcName: string;
    amcMobile: string;
    fundName: string;
    schemeCode: string; 
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface arnMasterCommonInterface {
    id: number,
    arnNumber: string;
    arnName: string;
    arnMobile: string;    
    fullMobile: string;
    arnAddress: string;
    arnState: stateCommonInterface | number;
    arnCountry: string; 
    arnPinCode: number;
    arnEmail: string;
    arnEuin: string;
    arnGstNo: string;
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface aumMasterCommonInterface {
    id: number,
    aumArnNumber: arnMasterCommonInterface | number;
    aumAmcName: amcMasterCommonInterface | number;
    aumInvoiceNumber: string;
    aumAmount: number;
    aumMonth: string;
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface commissionMasterCommonInterface {
    id: number,
    commissionArnNumber: arnMasterCommonInterface | number;
    commissionAmcName: amcMasterCommonInterface | number;
    commissionAmount: number;
    commissionMonth: string;
    hideStatus: number,
    createdAt: string,
    updatedAt: string,
}

export interface aumYoyGrowthEntryCommonInterface {
    id: number,
    aumYoyGrowthAmcName: amcMasterCommonInterface | number;
    aumYoyGrowthAmount: number;
    aumYoyGrowthDate: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface industryAumCommonInterface {
    id: number,
    industryName: string;
    industryAumDate: string;
    industryAumAmount: number;
    industryAumMode: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface gstCommonInterface {
    id: number,
    gstInvoiceDate: string;
    gstInvoiceNumber: string;
    gstAmcName: amcMasterCommonInterface | number;
    gstTotalValue: number;
    gstTaxableValue: number;
    gstIGst: number;
    gstSGst: number;
    gstCGst: number;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface navCommonInterface {
    id: number;
    nav: string;
    navDate: string;
    navFundName: string;
    amcName: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface issueCommonInterface {
    id: number,
    issueClientName: string;
    issueType: string;
    issueDate: string;
    issueResolutionDate: string;
    issueDescription: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface statementCommonInterface {
    id: number,
    statementDate: string;
    statementInvestorName: string;
    statementInvestorPanNo: string; 
    statementInvestmentDate: string;
    statementAmcName: amcMasterCommonInterface | number;
    statementFundName: string;
    statementCostOfInvestment: number;
    statementCurrentValue: number;
    statementSipDate: string;
    statementSipAmount: number;
    statementSwpAmount: number;
    statementSipBankName: string;
    statementSipBankAccountType: string;
    statementSipBankAccountLastFourDigit: number;
    statementPrimaryBankName: string;
    statementPrimaryBankAccountType: string;
    statementPrimaryBankAccountLastFourDigit: number;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface courierCommonInterface {
    id: number,
    courierClientName: number;
    courierClientAddress: string;
    courierCountryCode: string;
    courierMobileNumber: string;
    full_mobile: string;
    courierEmail: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface courierFilesCommonInterface {
    id: number,
    courier: number;
    courierFile?: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface formsCommonInterface {
    id: number,
    formsAmcName: number;
    formsType: string;
    formsDescription: string;
    formsFile?: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface marketingCommonInterface {
    id: number,
    marketingAmcName: number;
    marketingType: string;
    marketingDescription: string;
    marketingFile?: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface taskCommonInterface {
    id: number,
    taskTitle: string;
    taskClient: number;
    taskDate: string;
    taskTime: string;
    taskLatitude: number;
    taskLongtitude: number;
    taskDescription: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface employeeCommonInterface {
    id: number,
    employeeName: string;
    employeeEmail: string;
    employeePhone: string;   
    fullMobile: string;
    employeePassword: string;
    employeeAddress: string;
    employeeCountryCode: string;
    employeeOtherDetail: string;
    employeeFile?: string;
    employeePhotoUrl?: string;
    employeeUserType: number;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface clientCommonInterface {
    id: number,
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    clientAlternatePhone: string; 
    full_mobile: string;
    clientPanNo: string;
    clientKycNo: string;
    clientAadharNo: string;
    clientVoterId: string;
    clientDrivingLicenseNo: string;
    clientDrivingLicenseExpiryDate: string;
    clientPassportNo: string;
    clientPassportExpiryDate: string;
    clientCentralGovtId: string;
    clientCentralGovtIdNo: string;
    clientBloodGroup: string;
    clientDateOfBirth: string;
    clientGender: number;
    clientMaritalStatus: number;
    clientAnniversaryDate: string;
    clientCountryOfBirth: string;
    clientPlaceOfBirth: string;
    clientCitizenship: string;
    clientResidentialStatus: string;
    clientOccupation: string;
    clientAnnualIncome: string;
    clientPoliticallyExposed: number;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface clientfamilyCommonInterface {
    id: number,
    clientFamilyDetailId: number;
    clientFatherName: string;
    clientMotherName: string;
    clientSpouseName: string;
    clientSpouseBirthDate: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface clientchildrenCommonInterface {
    id: number,
    clientChildrenId: number;
    clientChildrenName: string;
    clientChildrenBirthDate: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface clientpresentaddressCommonInterface {
    id: number,
    clientPresentAddressId:  number;
    clientPresentAddress: string;
    clientPresentLandmark: string;
    clientPresentCity: string;
    clientPresentDistrict: string;
    clientPresentState: number;
    clientPresentPincode: number;
    clientPresentCountry: string;
    clientPresentMobile: string;
    clientPresentLandline: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface clientPermanentaddressCommonInterface {
    id: number,
    clientPermanentAddressId: number;
    clientPermanentAddress: string;
    clientPermanentLandmark: string;
    clientPermanentCity: string;
    clientPermanentDistrict: string;
    clientPermanentState: number;
    clientPermanentPincode: number;
    clientPermanentCountry: string;
    clientPermanentMobile: string;
    clientPermanentLandline: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface clientOfficeaddressCommonInterface {
    id: number,
    clientOfficeAddressId: number;
    clientOfficeAddress: string;
    clientOfficeLandline: string;
    clientOfficeMobile: string;
    clientOfficeCity: string;
    clientOfficeState: number;
    clientOfficePincode: number;
    clientOfficeCountry: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface clientOverseasaddressCommonInterface {
    id: number,
    clientOverseasAddressId: number;
    clientOverseasAddress: string;
    clientOverseasLandline: string;
    clientOverseasMobile: string;
    clientOverseasCity: string;
    clientOverseasState: number;
    clientOverseasPincode: number;
    clientOverseasCountry: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface clientNomineeCommonInterface {
    id: number,
    clientGuardianId: number;
    clientGuardianName: string;
    clientGuardianRelation: string;
    clientGuardianPanNo: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface clientInsuranceCommonInterface {
    id: number,
    clientInsuranceId: number;
    clientInsurancePolicyNumber: string;
    clientInsurancePolicyName: string;
    clientInsurancePolicyCompanyName: string;
    clientInsurancePolicyTerm: string;
    clientInsurancePolicyMaturityAmount: number;
    clientInsurancePolicyPaymentPerInstallment: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface clientMedicalInsuranceCommonInterface {
    id: number,
    clientMedicalInsuranceId: number;
    clientMedicalInsurancePolicyNumber: string;
    clientMedicalInsurancePolicyName: string;
    clientMedicalInsurancePolicyCompanyName: string;
    clientMedicalInsurancePolicyTerm: string;
    clientMedicalInsurancePolicyMaturityAmount:  number;
    clientMedicalInsurancePolicyPaymentPerInstallment: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface clientTermInsuranceCommonInterface {
    id: number,
    clientTermInsuranceId: string;
    clientTermInsurancePolicyNumber: number;
    clientTermInsurancePolicyName: string;
    clientTermInsurancePolicyCompanyName: string;
    clientTermInsurancePolicyTerm: string;
    clientTermInsurancePolicyMaturityAmount: number;
    clientTermInsurancePolicyPaymentPerInstallment: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface clientUploadFilesCommonInterface {
    id: number,
    clientUploadFileId: number;
    clientPaasPortSizePhoto?: string | null ;
    clientPanCardPhoto?: string | null;
    clientAadharCard?: string | null;
    clientDrivingLicense?: string | null;
    clientVoterIDFrontImage?: string | null;
    clientVoterIDBackImage?: string | null;
    clientPassportFrontImage?: string | null;
    clientPassportBackImage?: string | null;
    clientForeignAddressProof?: string | null;
    clientForeignTaxIdentificationProof?: string | null;
    clientCancelledChequeCopy?: string | null;
    clientBankAccountStatementOrPassbook?: string | null;
    clientChildrenBirthCertificate?: string | null;
    clientPowerOfAttorneyUpload?: string | null;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface clientBankCommonInterface {
    id: number,
    clientBankId: number;
    clientBankName: string;
    clientBankAccountType: string;
    clientBankAccountNo: number;
    clientBankIfsc: string;
    clientBankMicr: string;
    clientBankAddress: string;
    clientBankBranch: string;
    clientBankCity: string;
    clientBankPincode: number;
    clientAccountPreference: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface clientTaxCommonInterface {
    id: number,
    clientTaxId: number;
    clientTaxIdDetail: string;
    clientTaxIdNo: string;
    clientTaxCountry: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

export interface clientPowerOfAttorneyCommonInterface {
    id: number,
    clientPowerOfAttorneyId: number;
    clientPowerOfAttorneyName: string;
    clientPowerOfAttorneyPanNo: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}   

export interface clientGuardianCommonInterface {
    id: number,
    clientGuardianId: number;
    clientGuardianName: string;
    clientGuardianRelation: string;
    clientGuardianPanNo: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}   

export interface dailyEntryCommonInterface {
    id: number,
    applicationDate: string;
    dailyEntryClientPanNumber: string;
    dailyEntryClientName: string;
    dailyEntryClientFolioNumber: string;
    dailyEntryClientMobileNumber: string;
    dailyEntryFundHouse: string;
    dailyEntryFundName: string;
    dailyEntryAmount: string;
    dailyEntryClientChequeNumber: string;
    dailyEntryIssueType: string;
    dailyEntrySipDate: string;
    dailyEntryStaffName: string;
    dailyEntryTransactionAddDetails: string;
    hideStatus: number;
    createdAt: string;
    updatedAt: string;
}

