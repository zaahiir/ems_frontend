import { Component, OnInit } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent,
  FormFloatingDirective,
  FormDirective,
  FormLabelDirective,
  FormControlDirective,
  FormFeedbackComponent,
  InputGroupComponent,
  InputGroupTextDirective,
  FormSelectDirective,
  FormCheckComponent,
  FormCheckInputDirective,
  FormCheckLabelDirective,
  ButtonDirective,
  ListGroupDirective,
  ListGroupItemDirective,
  TableDirective,
  TableColorDirective,
  TableActiveDirective,
  BorderDirective,
  AlignDirective
} from '@coreui/angular';
import { AumEntryService } from '../../../../common-service/aum-entry/aum-entry.service';
import { amcMasterCommonInterface, arnMasterCommonInterface } from '../../../../interfaces/interfaces'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import * as XLSX from 'xlsx';

interface ParsedAumData {
  originalAmcName: string;
  amcName: string;
  aumAmount: number;
  amcId?: string;
  matched: boolean;
  matchedAmcName?: string;
  matchType?: 'exact' | 'fuzzy' | 'manual';
  rowIndex: number;
}

@Component({
  selector: 'app-upload-aum-entry',
  standalone: true,
  imports: [
    NgIf,
    CommonModule,
    NgClass,
    NgForOf,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ReactiveFormsModule,
    FormFloatingDirective,
    FormsModule,
    FormDirective,
    FormLabelDirective,
    FormControlDirective,
    FormFeedbackComponent,
    InputGroupComponent,
    InputGroupTextDirective,
    FormSelectDirective,
    FormCheckComponent,
    FormCheckInputDirective,
    FormCheckLabelDirective,
    ButtonDirective,
    ListGroupDirective,
    ListGroupItemDirective,
    NgStyle,
    TableDirective,
    TableColorDirective,
    TableActiveDirective,
    BorderDirective,
    AlignDirective
  ],
  templateUrl: './upload-aum-entry.component.html',
  styleUrl: './upload-aum-entry.component.scss'
})
export class UploadAumEntryComponent implements OnInit {

  uploadForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  customStylesValidated = false;

  arn: arnMasterCommonInterface[] = [];
  amc: amcMasterCommonInterface[] = [];

  selectedFile: File | null = null;
  parsedData: ParsedAumData[] = [];
  extractedMonth: string = '';
  showPreview: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aumEntryService: AumEntryService,
  ) {
    this.uploadForm = this.fb.group({
      aumArnNumber: ['', Validators.required],
      excelFile: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      await Promise.all([this.loadArn(), this.loadAmc()]);
    } catch (error) {
      console.error('Error initializing component:', error);
      await Swal.fire('Error', 'Failed to initialize the form. Please try again.', 'error');
    }
  }

  get f() { return this.uploadForm.controls; }

  async loadArn(): Promise<void> {
    try {
      const response = await this.aumEntryService.getArn();
      this.arn = response.data;
    } catch (error) {
      console.error('Error loading ARN:', error);
      throw error;
    }
  }

  async loadAmc(): Promise<void> {
    try {
      const response = await this.aumEntryService.getAmc();
      this.amc = response.data;
    } catch (error) {
      console.error('Error loading AMC:', error);
      throw error;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          file.type === 'application/vnd.ms-excel') {
        this.selectedFile = file;
        this.parseExcelFile(file);
      } else {
        Swal.fire('Error', 'Please select a valid Excel file (.xlsx or .xls)', 'error');
        event.target.value = '';
      }
    }
  }

  parseExcelFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert to JSON with proper typing
        const jsonData: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false }) as any[][];

        this.extractMonthFromFirstRow(jsonData);
        this.extractAumData(jsonData);

      } catch (error) {
        console.error('Error parsing Excel file:', error);
        Swal.fire('Error', 'Failed to parse Excel file. Please check the file format.', 'error');
      }
    };
    reader.readAsArrayBuffer(file);
  }

  extractMonthFromFirstRow(data: any[][]): void {
    if (data.length > 0 && data[0].length > 0) {
      const firstRow = data[0][0] || '';
      // Extract date from "AUM Report By Fund House As On Date : 25/06/2025"
      const dateMatch = firstRow.toString().match(/(\d{2}\/\d{2}\/\d{4})/);
      if (dateMatch) {
        const dateParts = dateMatch[1].split('/');
        const day = dateParts[0];
        const month = dateParts[1];
        const year = dateParts[2];
        this.extractedMonth = `${year}-${month}`;
      } else {
        Swal.fire('Warning', 'Could not extract date from the first row. Please verify the file format.', 'warning');
      }
    }
  }

  extractAumData(data: any[][]): void {
    this.parsedData = [];

    // Find the header row (look for "AMC Name" and "AUM" columns)
    let headerRowIndex = -1;
    let amcNameColIndex = -1;
    let aumColIndex = -1;

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      if (row && Array.isArray(row)) {
        for (let j = 0; j < row.length; j++) {
          if (row[j] && row[j].toString().toLowerCase().includes('amc name')) {
            headerRowIndex = i;
            amcNameColIndex = j;
          }
          if (row[j] && row[j].toString().toLowerCase() === 'aum') {
            aumColIndex = j;
          }
        }
        if (headerRowIndex !== -1 && amcNameColIndex !== -1 && aumColIndex !== -1) {
          break;
        }
      }
    }

    if (headerRowIndex === -1 || amcNameColIndex === -1 || aumColIndex === -1) {
      Swal.fire('Error', 'Could not find required columns (AMC Name, AUM) in the Excel file.', 'error');
      return;
    }

    // Extract data rows
    for (let i = headerRowIndex + 1; i < data.length; i++) {
      const row = data[i];
      if (row && Array.isArray(row) && row[amcNameColIndex] && row[aumColIndex]) {
        const originalAmcName = row[amcNameColIndex].toString().trim();
        const aumAmount = this.parseAumAmount(row[aumColIndex]);

        if (originalAmcName && aumAmount > 0) {
          const matchResult = this.findMatchingAmc(originalAmcName);
          this.parsedData.push({
            originalAmcName: originalAmcName,
            amcName: originalAmcName,
            aumAmount: aumAmount,
            amcId: matchResult.amc ? matchResult.amc.id.toString() : undefined,
            matched: !!matchResult.amc,
            matchedAmcName: matchResult.amc ? matchResult.amc.amcName : undefined,
            matchType: matchResult.matchType,
            rowIndex: i + 1
          });
        }
      }
    }

    this.showPreview = this.parsedData.length > 0;

    if (this.parsedData.length === 0) {
      Swal.fire('Warning', 'No valid AUM data found in the Excel file.', 'warning');
    }
  }

  parseAumAmount(value: any): number {
    if (!value) return 0;

    // Remove commas and convert to number
    const stringValue = value.toString().replace(/,/g, '');
    const numericValue = parseFloat(stringValue);

    return isNaN(numericValue) ? 0 : numericValue;
  }

  findMatchingAmc(amcName: string): { amc?: amcMasterCommonInterface, matchType?: 'exact' | 'fuzzy' } {
    const normalizedInput = amcName.toLowerCase().trim();

    // Try exact match first (complete name)
    let match = this.amc.find(amc =>
      amc.amcName.toLowerCase().trim() === normalizedInput
    );
    if (match) {
      return { amc: match, matchType: 'exact' };
    }

    // Try matching without "Mutual Fund" suffix (both sides)
    const cleanedInput = normalizedInput.replace(/\s*(mutual\s*fund|mf)\s*$/i, '').trim();
    match = this.amc.find(amc => {
      const cleanedAmcName = amc.amcName.toLowerCase().replace(/\s*(mutual\s*fund|mf)\s*$/i, '').trim();
      return cleanedAmcName === cleanedInput;
    });
    if (match) {
      return { amc: match, matchType: 'fuzzy' };
    }

    // Try matching with first words (for cases like "Kotak" matching "Kotak Mahindra")
    const inputWords = cleanedInput.split(/\s+/);
    const firstInputWord = inputWords[0];

    if (firstInputWord && firstInputWord.length >= 3) { // Minimum 3 characters to avoid false matches
      match = this.amc.find(amc => {
        const cleanedAmcName = amc.amcName.toLowerCase().replace(/\s*(mutual\s*fund|mf)\s*$/i, '').trim();
        const amcWords = cleanedAmcName.split(/\s+/);
        const firstAmcWord = amcWords[0];

        // Check if first word of input matches first word of AMC name
        return firstAmcWord === firstInputWord ||
               // Also check if input is contained in AMC name or vice versa
               cleanedAmcName.includes(cleanedInput) ||
               cleanedInput.includes(cleanedAmcName);
      });
      if (match) {
        return { amc: match, matchType: 'fuzzy' };
      }
    }

    // Try partial match (if one contains the other)
    match = this.amc.find(amc => {
      const cleanedAmcName = amc.amcName.toLowerCase().replace(/\s*(mutual\s*fund|mf)\s*$/i, '').trim();
      return cleanedAmcName.includes(cleanedInput) || cleanedInput.includes(cleanedAmcName);
    });
    if (match) {
      return { amc: match, matchType: 'fuzzy' };
    }

    return {};
  }

  updateAmcSelection(index: number, event: any): void {
    const amcId = event.target.value;
    if (this.parsedData[index]) {
      this.parsedData[index].amcId = amcId;
      this.parsedData[index].matched = !!amcId;

      if (amcId) {
        const selectedAmc = this.amc.find(amc => amc.id.toString() === amcId);
        this.parsedData[index].matchedAmcName = selectedAmc ? selectedAmc.amcName : undefined;
        this.parsedData[index].matchType = 'manual';
      } else {
        this.parsedData[index].matchedAmcName = undefined;
        this.parsedData[index].matchType = undefined;
      }
    }
  }

  getMatchedCount(): number {
    return this.parsedData.filter(item => item.matched).length;
  }

  getUnmatchedCount(): number {
    return this.parsedData.filter(item => !item.matched).length;
  }

  async checkForDuplicates(arnNumber: string, amcId: string, month: string): Promise<boolean> {
    try {
      const response = await lastValueFrom(
        this.aumEntryService.checkDuplicate(arnNumber, amcId, month)
      );
      return response.exists;
    } catch (error) {
      console.error('Error checking duplicates:', error);
      return false;
    }
  }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;

    if (this.uploadForm.invalid) {
      await Swal.fire({
        title: 'Required Fields Missing',
        text: 'Please select ARN and upload an Excel file.',
        icon: 'error'
      });
      return;
    }

    if (!this.showPreview || this.parsedData.length === 0) {
      await Swal.fire('Error', 'No data to upload. Please select a valid Excel file.', 'error');
      return;
    }

    const unmatchedItems = this.parsedData.filter(item => !item.matched);
    if (unmatchedItems.length > 0) {
      const result = await Swal.fire({
        title: 'Unmatched AMCs Found',
        text: `${unmatchedItems.length} AMC(s) could not be matched. Do you want to proceed with only matched items?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Proceed',
        cancelButtonText: 'Cancel'
      });

      if (!result.isConfirmed) {
        return;
      }
    }

    if (this.loading) return;
    this.loading = true;

    try {
      const matchedItems = this.parsedData.filter(item => item.matched);
      let successCount = 0;
      let failureCount = 0;
      let duplicateCount = 0;
      const failedItems: string[] = [];

      // Check for duplicates first
      const arnNumber = this.f['aumArnNumber'].value;
      for (const item of matchedItems) {
        const isDuplicate = await this.checkForDuplicates(arnNumber, item.amcId!, this.extractedMonth);
        if (isDuplicate) {
          duplicateCount++;
          failedItems.push(`${item.matchedAmcName} - Duplicate entry`);
          continue;
        }

        const data = {
          aumArnNumber: arnNumber,
          aumAmcName: item.amcId,
          aumAmount: item.aumAmount,
          aumMonth: this.extractedMonth,
          hideStatus: 0,
        };

        try {
          const response = await lastValueFrom(this.aumEntryService.processAum(data, "0"));
          console.log('API Response:', response); // Debug log

          if (response.code === 1) {
            successCount++;
          } else {
            failureCount++;
            failedItems.push(`${item.matchedAmcName} - ${response.message || 'Unknown error'}`);
            console.error(`Failed to process ${item.matchedAmcName}:`, response);
          }
        } catch (error: any) {
          failureCount++;
          failedItems.push(`${item.matchedAmcName} - API Error`);
          console.error(`Error processing ${item.matchedAmcName}:`, error);
        }
      }

      // Show results
      let message = `Successfully uploaded ${successCount} entries.`;
      if (duplicateCount > 0) {
        message += ` ${duplicateCount} duplicates skipped.`;
      }
      if (failureCount > 0) {
        message += ` ${failureCount} entries failed.`;
      }

      if (failedItems.length > 0) {
        console.log('Failed items:', failedItems); // Debug log
      }

      if (successCount > 0) {
        await Swal.fire(
          "Upload Complete!",
          message,
          successCount === matchedItems.length - duplicateCount ? "success" : "warning"
        );

        if (successCount > 0) {
          this.router.navigate(['/forms/aum']);
        }
      } else {
        await Swal.fire("Upload Failed!", "No entries were uploaded successfully.", "error");
      }

    } catch (error) {
      console.error('Error during bulk upload:', error);
      await Swal.fire("Failed!", "An error occurred during the upload process.", "error");
    } finally {
      this.loading = false;
    }
  }

  onReset(): void {
    this.customStylesValidated = false;
    this.submitted = false;
    this.uploadForm.reset();
    this.selectedFile = null;
    this.parsedData = [];
    this.extractedMonth = '';
    this.showPreview = false;
  }

  removeItem(index: number): void {
    this.parsedData.splice(index, 1);
    if (this.parsedData.length === 0) {
      this.showPreview = false;
    }
  }
}
