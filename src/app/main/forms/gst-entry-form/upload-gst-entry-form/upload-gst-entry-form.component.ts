import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, TableDirective, ProgressComponent, ProgressBarComponent, BadgeComponent } from '@coreui/angular';
import { GstEntryFormsService } from '../../../common-service/gst-entry-forms/gst-entry-forms.service';
import { amcMasterCommonInterface, arnMasterCommonInterface } from '../../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import * as XLSX from 'xlsx';

interface ExcelGstData {
  sNo: number;
  invoicedTo: string;
  gstNo: string;
  invoiceNo: string;
  invoiceDate: string;
  taxableValue: number;
  igst: number;
  cgst: number;
  sgst: number;
  totalInvoiceValue: number;
  selected: boolean;
  matchedAmcId?: string;
  matchedAmcName?: string;
  duplicateCheck?: boolean;
  isDuplicate?: boolean;
  errors: string[]; // Required property - always initialized as array
}

@Component({
  selector: 'app-upload-gst-entry-form',
  standalone: true,
  imports: [NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, TextColorDirective, CardComponent, FormFloatingDirective, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle, TableDirective, ProgressComponent, ProgressBarComponent, BadgeComponent],
  templateUrl: './upload-gst-entry-form.component.html',
  styleUrl: './upload-gst-entry-form.component.scss'
})
export class UploadGstEntryFormComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef<HTMLInputElement>;

  uploadForm!: FormGroup;
  loading: boolean = false;
  processing: boolean = false;
  uploaded: boolean = false;

  amc: amcMasterCommonInterface[] = [];
  arn: arnMasterCommonInterface[] = [];
  excelData: ExcelGstData[] = [];
  selectedArn: string = '';

  private destroy$ = new Subject<void>();

  // Progress tracking
  processingProgress = 0;
  totalRecords = 0;
  processedRecords = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private gstEntryFormsService: GstEntryFormsService,
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.uploadForm = this.fb.group({
      selectedArn: ['', Validators.required],
      excelFile: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadAmcData();
    await this.loadArnData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get f() { return this.uploadForm.controls; }

  private async loadAmcData(): Promise<void> {
    try {
      const response = await this.gstEntryFormsService.getAmc();
      this.amc = response.data;
    } catch (error) {
      await Swal.fire('Error', 'Failed to load AMC data', 'error');
    }
  }

  private async loadArnData(): Promise<void> {
    try {
      const response = await this.gstEntryFormsService.getArn();
      this.arn = response.data;
    } catch (error) {
      await Swal.fire('Error', 'Failed to load ARN data', 'error');
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
          file.type !== 'application/vnd.ms-excel') {
        Swal.fire('Error', 'Please select a valid Excel file (.xlsx or .xls)', 'error');
        this.fileInput.nativeElement.value = '';
        return;
      }
      this.uploadForm.patchValue({ excelFile: file });
    }
  }

  async processExcelFile(): Promise<void> {
    if (this.uploadForm.invalid) {
      if (!this.f['selectedArn'].value) {
        await Swal.fire('Error', 'Please select an ARN first', 'error');
        return;
      }
      if (!this.f['excelFile'].value) {
        await Swal.fire('Error', 'Please select an Excel file', 'error');
        return;
      }
    }

    this.loading = true;
    this.selectedArn = this.f['selectedArn'].value;

    try {
      const file = this.f['excelFile'].value;
      const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      await this.parseExcelData(jsonData);
      this.uploaded = true;
    } catch (error) {
      console.error('Error processing Excel file:', error);
      await Swal.fire('Error', 'Failed to process Excel file', 'error');
    } finally {
      this.loading = false;
    }
  }

  private async parseExcelData(data: any[]): Promise<void> {
    this.excelData = [];

    // Find the header row (looking for "S.No." or "Serial")
    let headerRowIndex = -1;
    for (let i = 0; i < data.length; i++) {
      if (data[i] && data[i].some((cell: any) =>
        typeof cell === 'string' &&
        (cell.toLowerCase().includes('s.no') ||
         cell.toLowerCase().includes('serial') ||
         cell.toLowerCase().includes('s no')))) {
        headerRowIndex = i;
        break;
      }
    }

    if (headerRowIndex === -1) {
      throw new Error('Header row not found in Excel file. Please ensure your Excel file has a header row with "S.No." column.');
    }

    // Process data rows
    for (let i = headerRowIndex + 1; i < data.length; i++) {
      const row = data[i];
      if (!row || row.length < 10) continue;

      // Skip empty rows
      if (!row[0] || !row[1]) continue;

      const excelRow: ExcelGstData = {
        sNo: parseInt(row[0]) || i - headerRowIndex,
        invoicedTo: row[1]?.toString().trim() || '',
        gstNo: row[2]?.toString().trim() || '',
        invoiceNo: row[3]?.toString().trim() || '',
        invoiceDate: this.parseExcelDate(row[4]),
        taxableValue: parseFloat(row[5]) || 0,
        igst: parseFloat(row[6]) || 0,
        cgst: parseFloat(row[7]) || 0,
        sgst: parseFloat(row[8]) || 0,
        totalInvoiceValue: parseFloat(row[9]) || 0,
        selected: true,
        errors: [] // Always initialize as empty array
      };

      // Validate required fields
      this.validateExcelRow(excelRow);

      // Match AMC using fuzzy logic
      await this.matchAmc(excelRow);

      this.excelData.push(excelRow);
    }

    // Check for duplicates
    await this.checkDuplicates();
  }

  private validateExcelRow(row: ExcelGstData): void {
    if (!row.invoicedTo) row.errors.push('Missing Invoiced To');
    if (!row.invoiceNo) row.errors.push('Missing Invoice Number');
    if (!row.invoiceDate) row.errors.push('Invalid Invoice Date');
    if (row.totalInvoiceValue <= 0) row.errors.push('Invalid Total Value');
    if (row.taxableValue < 0) row.errors.push('Invalid Taxable Value');
    if (row.igst < 0) row.errors.push('Invalid IGST Value');
    if (row.cgst < 0) row.errors.push('Invalid CGST Value');
    if (row.sgst < 0) row.errors.push('Invalid SGST Value');

    // Check if calculated total matches
    const calculatedTotal = row.taxableValue + row.igst + row.cgst + row.sgst;
    if (Math.abs(calculatedTotal - row.totalInvoiceValue) > 0.01) {
      row.errors.push('Total value mismatch with calculated amount');
    }
  }

  private parseExcelDate(dateValue: any): string {
    if (!dateValue) return '';

    try {
      // Handle Excel date serial number
      if (typeof dateValue === 'number') {
        // Excel dates start from 1900-01-01, but Excel treats 1900 as a leap year
        const excelEpoch = new Date(1900, 0, 1);
        const date = new Date(excelEpoch.getTime() + (dateValue - 2) * 24 * 60 * 60 * 1000);

        // Ensure the year is reasonable (between 2000 and 2100)
        if (date.getFullYear() < 2000) {
          date.setFullYear(date.getFullYear() + 100);
        }

        return date.toISOString().split('T')[0];
      }

      // Handle string dates
      if (typeof dateValue === 'string') {
        // Clean the date string
        const cleanDate = dateValue.trim().replace(/\s+/g, ' ');

        // Try different date formats
        const formats = [
          /^\d{1,2}-\w{3}-\d{2,4}$/, // 30-Apr-25 or 30-Apr-2025
          /^\d{1,2}\/\d{1,2}\/\d{2,4}$/, // 30/04/25 or 30/04/2025
          /^\d{4}-\d{1,2}-\d{1,2}$/, // 2025-04-30
          /^\d{1,2}-\d{1,2}-\d{2,4}$/ // 30-04-25 or 30-04-2025
        ];

        let parsedDate: Date | null = null;

        // Try parsing with different approaches
        if (/^\d{1,2}-\w{3}-\d{2,4}$/.test(cleanDate)) {
          // Handle format like "30-Apr-25"
          parsedDate = new Date(cleanDate);
        } else {
          // Try standard Date parsing
          parsedDate = new Date(cleanDate);
        }

        if (parsedDate && !isNaN(parsedDate.getTime())) {
          // Handle 2-digit years by assuming 20xx
          if (parsedDate.getFullYear() < 100) {
            parsedDate.setFullYear(parsedDate.getFullYear() + 2000);
          } else if (parsedDate.getFullYear() < 2000) {
            parsedDate.setFullYear(parsedDate.getFullYear() + 2000);
          }

          return parsedDate.toISOString().split('T')[0];
        }
      }

      return '';
    } catch (error) {
      console.warn('Date parsing error:', error);
      return '';
    }
  }

  private async matchAmc(row: ExcelGstData): Promise<void> {
    if (!row.invoicedTo) {
      row.errors.push('Cannot match AMC - Missing Invoice To field');
      return;
    }

    const invoicedTo = row.invoicedTo.toUpperCase().trim();
    let bestMatch: amcMasterCommonInterface | null = null;
    let bestScore = 0;

    // First, try exact match
    for (const amc of this.amc) {
      const amcName = amc.amcName.toUpperCase().trim();
      if (amcName === invoicedTo) {
        bestMatch = amc;
        bestScore = 1;
        break;
      }
    }

    // If no exact match, try fuzzy matching with higher threshold
    if (!bestMatch) {
      for (const amc of this.amc) {
        const amcName = amc.amcName.toUpperCase().trim();
        const score = this.calculateSimilarity(invoicedTo, amcName);
        if (score > bestScore && score >= 0.8) { // 80% similarity threshold
          bestMatch = amc;
          bestScore = score;
        }
      }
    }

    // Try matching with first word if no good fuzzy match
    if (!bestMatch || bestScore < 0.8) {
      const firstWord = invoicedTo.split(' ')[0];
      if (firstWord.length > 2) { // Only consider meaningful first words
        for (const amc of this.amc) {
          const amcName = amc.amcName.toUpperCase().trim();
          const amcFirstWord = amcName.split(' ')[0];

          if (amcFirstWord === firstWord && firstWord.length > 3) {
            bestMatch = amc;
            bestScore = 0.7;
            break;
          }

          // Check if AMC name contains the first word
          if (amcName.includes(firstWord) && firstWord.length > 3) {
            const containsScore = 0.6;
            if (containsScore > bestScore) {
              bestMatch = amc;
              bestScore = containsScore;
            }
          }
        }
      }
    }

    // Try partial matching with significant words
    if (!bestMatch || bestScore < 0.6) {
      const words = invoicedTo.split(' ').filter(word => word.length > 3);
      for (const amc of this.amc) {
        const amcName = amc.amcName.toUpperCase().trim();
        let matchCount = 0;

        for (const word of words) {
          if (amcName.includes(word)) {
            matchCount++;
          }
        }

        if (matchCount > 0 && words.length > 0) {
          const partialScore = (matchCount / words.length) * 0.5;
          if (partialScore > bestScore) {
            bestMatch = amc;
            bestScore = partialScore;
          }
        }
      }
    }

    if (bestMatch && bestScore >= 0.5) {
      // Fixed: Convert number to string
      row.matchedAmcId = bestMatch.id.toString();
      row.matchedAmcName = bestMatch.amcName;
    } else {
      row.errors.push(`AMC not matched for: "${row.invoicedTo}"`);
    }
  }

  private calculateSimilarity(str1: string, str2: string): number {
    if (str1 === str2) return 1.0;

    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;

    if (longer.length === 0) return 1.0;

    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  private levenshteinDistance(str1: string, str2: string): number {
    // Create a 2D array with proper initialization
    const matrix: number[][] = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(0));

    // Initialize first row and column
    for (let i = 0; i <= str2.length; i++) {
      matrix[i][0] = i;
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    // Fill the matrix
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1, // substitution
            matrix[i][j - 1] + 1,     // insertion
            matrix[i - 1][j] + 1      // deletion
          );
        }
      }
    }

    return matrix[str2.length][str1.length];
  }

  private async checkDuplicates(): Promise<void> {
    this.processing = true;
    this.totalRecords = this.excelData.filter(row => row.matchedAmcId && row.invoiceDate).length;
    this.processedRecords = 0;

    for (const row of this.excelData) {
      if (row.matchedAmcId && row.invoiceDate && row.invoiceNo) {
        try {
          const response = await lastValueFrom(
            this.gstEntryFormsService.checkDuplicate(
              this.selectedArn,
              row.matchedAmcId,
              row.invoiceNo,
              row.invoiceDate
            )
          );

          row.isDuplicate = response.exists;
          row.duplicateCheck = true;

          if (row.isDuplicate) {
            row.selected = false; // Unselect duplicates by default
            row.errors.push('Duplicate entry found for this ARN, AMC, Invoice Number and Date');
          }
        } catch (error) {
          console.error('Error checking duplicate:', error);
          row.duplicateCheck = false;
        }

        this.processedRecords++;
        this.processingProgress = (this.processedRecords / this.totalRecords) * 100;
      }
    }

    this.processing = false;
  }

  toggleRowSelection(index: number): void {
    if (this.excelData[index].errors.length === 0) {
      this.excelData[index].selected = !this.excelData[index].selected;
    }
  }

  toggleAllSelection(): void {
    const validRows = this.excelData.filter(row => row.errors.length === 0);
    const allValidSelected = validRows.every(row => row.selected);

    validRows.forEach(row => {
      row.selected = !allValidSelected;
    });
  }

  getSelectedCount(): number {
    return this.excelData.filter(row => row.selected && row.errors.length === 0).length;
  }

  getValidCount(): number {
    return this.excelData.filter(row => row.errors.length === 0).length;
  }

  getErrorCount(): number {
    return this.excelData.filter(row => row.errors.length > 0).length;
  }

  getDuplicateCount(): number {
    return this.excelData.filter(row => row.isDuplicate).length;
  }

  // Helper method to safely check if row has errors
  hasErrors(row: ExcelGstData): boolean {
    return row.errors.length > 0;
  }

  // Helper method to get error count for a row
  getRowErrorCount(row: ExcelGstData): number {
    return row.errors.length;
  }

  async saveSelectedEntries(): Promise<void> {
    const selectedRows = this.excelData.filter(row => row.selected && row.errors.length === 0);

    if (selectedRows.length === 0) {
      await Swal.fire('Warning', 'No valid entries selected for saving', 'warning');
      return;
    }

    const result = await Swal.fire({
      title: 'Confirm Save',
      text: `Save ${selectedRows.length} GST entries?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Save',
      cancelButtonText: 'Cancel'
    });

    if (!result.isConfirmed) return;

    this.loading = true;
    this.processing = true;
    this.totalRecords = selectedRows.length;
    this.processedRecords = 0;

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    for (const row of selectedRows) {
      try {
        const gstData = {
          gstInvoiceDate: row.invoiceDate,
          gstInvoiceNumber: row.invoiceNo,
          gstAmcName: row.matchedAmcId,
          gstArnNumber: this.selectedArn,
          gstRegistered: (row.igst > 0 || row.cgst > 0 || row.sgst > 0),
          gstTotalValue: row.totalInvoiceValue,
          gstTaxableValue: row.taxableValue,
          gstIGst: row.igst,
          gstSGst: row.sgst,
          gstCGst: row.cgst,
          hideStatus: 0
        };

        const response = await lastValueFrom(
          this.gstEntryFormsService.processGst(gstData, "0")
        );

        if (response.code === 1) {
          successCount++;
          // Mark row as saved
          row.selected = false;
        } else {
          errorCount++;
          const errorMsg = `Row ${row.sNo}: ${response.message}`;
          errors.push(errorMsg);
          row.errors.push(`Save failed: ${response.message}`);
        }
      } catch (error) {
        errorCount++;
        const errorMsg = `Row ${row.sNo}: Network error`;
        errors.push(errorMsg);
        row.errors.push('Save failed: Network error');
      }

      this.processedRecords++;
      this.processingProgress = (this.processedRecords / this.totalRecords) * 100;
    }

    this.processing = false;
    this.loading = false;

    // Show results
    if (successCount > 0 && errorCount === 0) {
      await Swal.fire(
        'Success',
        `All ${successCount} entries saved successfully!`,
        'success'
      );
      this.router.navigate(['/forms/gst']);
    } else if (successCount > 0 && errorCount > 0) {
      await Swal.fire({
        title: 'Partial Success',
        html: `
          <p><strong>${successCount}</strong> entries saved successfully</p>
          <p><strong>${errorCount}</strong> entries failed</p>
          <div style="max-height: 200px; overflow-y: auto; text-align: left;">
            ${errors.map(error => `<small>• ${error}</small>`).join('<br>')}
          </div>
        `,
        icon: 'warning'
      });
    } else {
      await Swal.fire({
        title: 'Save Failed',
        html: `
          <p>All entries failed to save:</p>
          <div style="max-height: 200px; overflow-y: auto; text-align: left;">
            ${errors.map(error => `<small>• ${error}</small>`).join('<br>')}
          </div>
        `,
        icon: 'error'
      });
    }
  }

  onReset(): void {
    this.uploadForm.reset();
    this.excelData = [];
    this.uploaded = false;
    this.processing = false;
    this.processingProgress = 0;
    this.processedRecords = 0;
    this.totalRecords = 0;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  goBack(): void {
    this.router.navigate(['/forms/gst']);
  }
}
