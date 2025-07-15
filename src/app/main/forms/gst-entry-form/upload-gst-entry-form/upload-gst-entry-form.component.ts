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
  gstRegistered: boolean;
  errors: string[];
  matchScore?: number;
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
  selectedFile: File | null = null;

  private destroy$ = new Subject<void>();

  // Progress tracking
  processingProgress = 0;
  totalRecords = 0;
  processedRecords = 0;

  // Enhanced AMC matching patterns
  private commonStopWords = [
    'MUTUAL', 'FUND', 'FUNDS', 'MANAGEMENT', 'LTD', 'LIMITED', 'COMPANY', 'PVT', 'PRIVATE',
    'ASSET', 'INVESTMENT', 'INVESTMENTS', 'ADVISORS', 'ADVISORS', 'MANAGERS', 'MANAGER',
    'TRUSTEE', 'TRUSTEES', 'SERVICES', 'INDIA', 'INDIAN', 'GLOBAL', 'INTERNATIONAL',
    'SECURITIES', 'CAPITAL', 'FINANCE', 'FINANCIAL', 'GROUP', 'CORPORATION', 'CORP',
    'THE', 'AND', 'OF', 'FOR', 'WITH', 'AMC'
  ];

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
      console.log('Loaded AMC data:', this.amc.length, 'records');
    } catch (error) {
      console.error('Error loading AMC data:', error);
      await Swal.fire('Error', 'Failed to load AMC data', 'error');
    }
  }

  private async loadArnData(): Promise<void> {
    try {
      const response = await this.gstEntryFormsService.getArn();
      this.arn = response.data;
      console.log('Loaded ARN data:', this.arn.length, 'records');
    } catch (error) {
      console.error('Error loading ARN data:', error);
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
        this.selectedFile = null;
        // Mark the form control as invalid
        this.uploadForm.get('excelFile')?.setErrors({ required: true });
        this.uploadForm.get('excelFile')?.markAsTouched();
        return;
      }

      this.selectedFile = file;
      // Set a dummy value to make the form control valid
      this.uploadForm.get('excelFile')?.setValue('file-selected');
      this.uploadForm.get('excelFile')?.setErrors(null);
    } else {
      this.selectedFile = null;
      this.uploadForm.get('excelFile')?.setErrors({ required: true });
      this.uploadForm.get('excelFile')?.markAsTouched();
    }
  }

  async processExcelFile(): Promise<void> {
    if (this.uploadForm.invalid) {
      if (!this.f['selectedArn'].value) {
        await Swal.fire('Error', 'Please select an ARN first', 'error');
        return;
      }
      if (!this.selectedFile) {
        await Swal.fire('Error', 'Please select an Excel file', 'error');
        return;
      }
    }

    this.loading = true;
    this.selectedArn = this.f['selectedArn'].value;

    try {
      if (!this.selectedFile) {
        throw new Error('No file selected');
      }

      const workbook = XLSX.read(await this.selectedFile.arrayBuffer(), { type: 'array' });
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

      // Helper function to round to 2 decimal places
      const roundTo2Decimals = (value: number): number => {
        return Math.round((value + Number.EPSILON) * 100) / 100;
      };

      // Parse numeric values safely
      const parseNumeric = (value: any): number => {
        if (value === null || value === undefined || value === '') return 0;
        const parsed = parseFloat(value.toString().replace(/[^\d.-]/g, ''));
        return isNaN(parsed) ? 0 : parsed;
      };

      const excelRow: ExcelGstData = {
        sNo: parseInt(row[0]) || i - headerRowIndex,
        invoicedTo: row[1]?.toString().trim() || '',
        gstNo: row[2]?.toString().trim() || '',
        invoiceNo: row[3]?.toString().trim() || '',
        invoiceDate: this.parseExcelDate(row[4]),
        taxableValue: roundTo2Decimals(parseNumeric(row[5])),
        igst: roundTo2Decimals(parseNumeric(row[6])),
        cgst: roundTo2Decimals(parseNumeric(row[7])),
        sgst: roundTo2Decimals(parseNumeric(row[8])),
        totalInvoiceValue: roundTo2Decimals(parseNumeric(row[9])),
        selected: true,
        gstRegistered: (parseNumeric(row[6]) > 0 || parseNumeric(row[7]) > 0 || parseNumeric(row[8]) > 0),
        errors: []
      };

      // Validate required fields
      this.validateExcelRow(excelRow);

      // Match AMC using enhanced algorithm
      await this.matchAmc(excelRow);

      this.excelData.push(excelRow);
    }

    // Check for duplicates
    await this.checkDuplicates();
  }

  private validateExcelRow(row: ExcelGstData): void {
    // Basic validation
    if (!row.invoicedTo) row.errors.push('Missing Invoiced To');
    if (!row.invoiceNo) row.errors.push('Missing Invoice Number');
    if (!row.invoiceDate) row.errors.push('Invalid Invoice Date');
    if (row.totalInvoiceValue <= 0) row.errors.push('Invalid Total Invoice Value');

    // Check for negative values
    if (row.taxableValue < 0) row.errors.push('Taxable Value cannot be negative');
    if (row.igst < 0) row.errors.push('IGST cannot be negative');
    if (row.cgst < 0) row.errors.push('CGST cannot be negative');
    if (row.sgst < 0) row.errors.push('SGST cannot be negative');
  }

  private parseExcelDate(dateValue: any): string {
    if (!dateValue) return '';

    try {
      // Handle Excel date serial number
      if (typeof dateValue === 'number') {
        const excelEpoch = new Date(1900, 0, 1);
        const date = new Date(excelEpoch.getTime() + (dateValue - 2) * 24 * 60 * 60 * 1000);

        if (date.getFullYear() < 2000) {
          date.setFullYear(date.getFullYear() + 100);
        }

        return date.toISOString().split('T')[0];
      }

      // Handle string dates
      if (typeof dateValue === 'string') {
        const cleanDate = dateValue.trim().replace(/\s+/g, ' ');
        let parsedDate: Date | null = null;

        if (/^\d{1,2}-\w{3}-\d{2,4}$/.test(cleanDate)) {
          parsedDate = new Date(cleanDate);
        } else {
          parsedDate = new Date(cleanDate);
        }

        if (parsedDate && !isNaN(parsedDate.getTime())) {
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
    console.log(`Matching AMC for: "${invoicedTo}"`);

    let bestMatch: amcMasterCommonInterface | null = null;
    let bestScore = 0;

    // Step 1: Exact match
    for (const amc of this.amc) {
      const amcName = amc.amcName.toUpperCase().trim();
      if (amcName === invoicedTo) {
        bestMatch = amc;
        bestScore = 1;
        console.log(`Exact match found: ${amcName}`);
        break;
      }
    }

    // Step 2: Enhanced fuzzy matching
    if (!bestMatch) {
      const results = this.performFuzzyMatching(invoicedTo, this.amc);
      if (results.length > 0) {
        bestMatch = results[0].amc;
        bestScore = results[0].score;
        console.log(`Fuzzy match found: ${bestMatch.amcName} (Score: ${bestScore})`);
      }
    }

    // Step 3: Keyword-based matching
    if (!bestMatch || bestScore < 0.7) {
      const keywordMatch = this.findKeywordMatch(invoicedTo, this.amc);
      if (keywordMatch && keywordMatch.score > bestScore) {
        bestMatch = keywordMatch.amc;
        bestScore = keywordMatch.score;
        console.log(`Keyword match found: ${bestMatch.amcName} (Score: ${bestScore})`);
      }
    }

    // Step 4: Brand/Company name matching
    if (!bestMatch || bestScore < 0.6) {
      const brandMatch = this.findBrandMatch(invoicedTo, this.amc);
      if (brandMatch && brandMatch.score > bestScore) {
        bestMatch = brandMatch.amc;
        bestScore = brandMatch.score;
        console.log(`Brand match found: ${bestMatch.amcName} (Score: ${bestScore})`);
      }
    }

    // Step 5: Acronym matching
    if (!bestMatch || bestScore < 0.5) {
      const acronymMatch = this.findAcronymMatch(invoicedTo, this.amc);
      if (acronymMatch && acronymMatch.score > bestScore) {
        bestMatch = acronymMatch.amc;
        bestScore = acronymMatch.score;
        console.log(`Acronym match found: ${bestMatch.amcName} (Score: ${bestScore})`);
      }
    }

    // Assign results
    if (bestMatch && bestScore >= 0.4) {
      row.matchedAmcId = bestMatch.id.toString();
      row.matchedAmcName = bestMatch.amcName;
      row.matchScore = bestScore;
      console.log(`Final match: ${bestMatch.amcName} (Score: ${bestScore})`);
    } else {
      row.errors.push(`AMC not matched for: "${row.invoicedTo}"`);
      console.log(`No match found for: "${row.invoicedTo}"`);
    }
  }

  private performFuzzyMatching(invoicedTo: string, amcList: amcMasterCommonInterface[]): { amc: amcMasterCommonInterface, score: number }[] {
    const results: { amc: amcMasterCommonInterface, score: number }[] = [];

    for (const amc of amcList) {
      const amcName = amc.amcName.toUpperCase().trim();

      // Calculate multiple similarity scores
      const levenshteinScore = this.calculateSimilarity(invoicedTo, amcName);
      const jaccardScore = this.calculateJaccardSimilarity(invoicedTo, amcName);
      const containmentScore = this.calculateContainmentScore(invoicedTo, amcName);
      const tokenScore = this.calculateTokenSimilarity(invoicedTo, amcName);

      // Weighted combination of scores
      const combinedScore = (levenshteinScore * 0.3) + (jaccardScore * 0.25) +
                           (containmentScore * 0.25) + (tokenScore * 0.2);

      if (combinedScore > 0.3) {
        results.push({ amc, score: combinedScore });
      }
    }

    return results.sort((a, b) => b.score - a.score);
  }

  private findKeywordMatch(invoicedTo: string, amcList: amcMasterCommonInterface[]): { amc: amcMasterCommonInterface, score: number } | null {
    const invoiceKeywords = this.extractMeaningfulKeywords(invoicedTo);
    let bestMatch: { amc: amcMasterCommonInterface, score: number } | null = null;
    let bestScore = 0;

    for (const amc of amcList) {
      const amcKeywords = this.extractMeaningfulKeywords(amc.amcName);
      const keywordScore = this.calculateKeywordMatchScore(invoiceKeywords, amcKeywords);

      if (keywordScore > bestScore && keywordScore > 0.5) {
        bestScore = keywordScore;
        bestMatch = { amc, score: keywordScore };
      }
    }

    return bestMatch;
  }

  private findBrandMatch(invoicedTo: string, amcList: amcMasterCommonInterface[]): { amc: amcMasterCommonInterface, score: number } | null {
    // Extract potential brand names from invoiced to
    const brands = this.extractBrandNames(invoicedTo);

    for (const brand of brands) {
      if (brand.length >= 3) {
        for (const amc of amcList) {
          const amcUpper = amc.amcName.toUpperCase();
          if (amcUpper.includes(brand)) {
            // Calculate how well the brand matches
            const brandScore = brand.length / Math.max(invoicedTo.length, amcUpper.length);
            const adjustedScore = Math.min(0.8, brandScore + 0.3);
            return { amc, score: adjustedScore };
          }
        }
      }
    }

    return null;
  }

  private findAcronymMatch(invoicedTo: string, amcList: amcMasterCommonInterface[]): { amc: amcMasterCommonInterface, score: number } | null {
    const acronyms = this.extractAcronyms(invoicedTo);

    for (const acronym of acronyms) {
      if (acronym.length >= 2) {
        for (const amc of amcList) {
          const amcUpper = amc.amcName.toUpperCase();

          // Check if acronym matches AMC name
          if (amcUpper.includes(acronym)) {
            return { amc, score: 0.7 };
          }

          // Check if acronym matches first letters of AMC name words
          const amcWords = amcUpper.split(/\s+/).filter(word =>
            !this.commonStopWords.includes(word) && word.length > 1
          );

          const firstLetters = amcWords.map(word => word.charAt(0)).join('');
          if (firstLetters.includes(acronym) || acronym.includes(firstLetters)) {
            return { amc, score: 0.6 };
          }
        }
      }
    }

    return null;
  }

  private extractMeaningfulKeywords(text: string): string[] {
    const words = text.split(/\s+/)
      .map(word => word.replace(/[^A-Z0-9]/g, ''))
      .filter(word => word.length > 2 && !this.commonStopWords.includes(word));

    return [...new Set(words)]; // Remove duplicates
  }

  private extractBrandNames(text: string): string[] {
    // Extract words that are likely brand names (longer meaningful words)
    const words = text.split(/\s+/)
      .map(word => word.replace(/[^A-Z]/g, ''))
      .filter(word => word.length >= 3 && !this.commonStopWords.includes(word));

    return [...new Set(words)];
  }

  private extractAcronyms(text: string): string[] {
    const acronyms = text.match(/\b[A-Z]{2,}\b/g) || [];
    return [...new Set(acronyms)];
  }

  private calculateKeywordMatchScore(keywords1: string[], keywords2: string[]): number {
    if (keywords1.length === 0 || keywords2.length === 0) return 0;

    let totalScore = 0;
    let matchCount = 0;

    for (const keyword1 of keywords1) {
      let bestKeywordScore = 0;

      for (const keyword2 of keywords2) {
        if (keyword1 === keyword2) {
          bestKeywordScore = 1;
          break;
        } else if (keyword1.includes(keyword2) || keyword2.includes(keyword1)) {
          bestKeywordScore = Math.max(bestKeywordScore, 0.8);
        } else {
          const similarity = this.calculateSimilarity(keyword1, keyword2);
          if (similarity > 0.7) {
            bestKeywordScore = Math.max(bestKeywordScore, similarity);
          }
        }
      }

      if (bestKeywordScore > 0) {
        totalScore += bestKeywordScore;
        matchCount++;
      }
    }

    return matchCount > 0 ? totalScore / Math.max(keywords1.length, keywords2.length) : 0;
  }

  private calculateJaccardSimilarity(str1: string, str2: string): number {
    const set1 = new Set(str1.split(''));
    const set2 = new Set(str2.split(''));

    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);

    return intersection.size / union.size;
  }

  private calculateContainmentScore(invoicedTo: string, amcName: string): number {
    // Check how much of the shorter string is contained in the longer string
    const shorter = invoicedTo.length < amcName.length ? invoicedTo : amcName;
    const longer = invoicedTo.length < amcName.length ? amcName : invoicedTo;

    let containmentScore = 0;
    const words = shorter.split(/\s+/).filter(word => word.length > 2);

    for (const word of words) {
      if (longer.includes(word)) {
        containmentScore += word.length / shorter.length;
      }
    }

    return Math.min(1, containmentScore);
  }

  private calculateTokenSimilarity(str1: string, str2: string): number {
    const tokens1 = str1.split(/\s+/).filter(token => token.length > 1);
    const tokens2 = str2.split(/\s+/).filter(token => token.length > 1);

    if (tokens1.length === 0 || tokens2.length === 0) return 0;

    let matchCount = 0;
    let totalScore = 0;

    for (const token1 of tokens1) {
      let bestTokenScore = 0;

      for (const token2 of tokens2) {
        const similarity = this.calculateSimilarity(token1, token2);
        bestTokenScore = Math.max(bestTokenScore, similarity);
      }

      if (bestTokenScore > 0.6) {
        totalScore += bestTokenScore;
        matchCount++;
      }
    }

    return matchCount > 0 ? totalScore / Math.max(tokens1.length, tokens2.length) : 0;
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
    const matrix: number[][] = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(0));

    for (let i = 0; i <= str2.length; i++) {
      matrix[i][0] = i;
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
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
            row.selected = false;
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

  getMatchedCount(): number {
    return this.excelData.filter(row => row.matchedAmcId).length;
  }

  getUnmatchedCount(): number {
    return this.excelData.filter(row => !row.matchedAmcId).length;
  }

  hasErrors(row: ExcelGstData): boolean {
    return row.errors.length > 0;
  }

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

    // Show processing SweetAlert
    Swal.fire({
      title: 'Processing...',
      html: `
        <div>
          <p>Saving GST entries...</p>
          <div class="progress" style="height: 20px; margin: 10px 0;">
            <div class="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style="width: 0%; background-color: #007bff;"
                id="save-progress-bar">
              <span id="save-progress-text">0%</span>
            </div>
          </div>
          <p><span id="save-status">0 of ${selectedRows.length} entries processed</span></p>
        </div>
      `,
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    // Helper function to round to 2 decimal places
    const roundTo2Decimals = (value: number): number => {
      return Math.round((value + Number.EPSILON) * 100) / 100;
    };

    for (const row of selectedRows) {
      try {
        const gstData = {
          gstInvoiceDate: row.invoiceDate,
          gstInvoiceNumber: row.invoiceNo,
          gstAmcName: row.matchedAmcId,
          gstArnNumber: this.selectedArn,
          gstRegistered: row.gstRegistered,
          gstTotalValue: roundTo2Decimals(row.totalInvoiceValue),
          gstTaxableValue: roundTo2Decimals(row.taxableValue),
          gstIGst: roundTo2Decimals(row.igst),
          gstSGst: roundTo2Decimals(row.sgst),
          gstCGst: roundTo2Decimals(row.cgst),
          hideStatus: 0
        };

        const response = await lastValueFrom(
          this.gstEntryFormsService.processGst(gstData, "0")
        );

        if (response.code === 1) {
          successCount++;
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

      // Update progress in SweetAlert
      const progressBar = document.getElementById('save-progress-bar');
      const progressText = document.getElementById('save-progress-text');
      const statusText = document.getElementById('save-status');

      if (progressBar && progressText && statusText) {
        const percentage = Math.round(this.processingProgress);
        progressBar.style.width = `${percentage}%`;
        progressText.textContent = `${percentage}%`;
        statusText.textContent = `${this.processedRecords} of ${this.totalRecords} entries processed`;
      }
    }

    this.processing = false;
    this.loading = false;

    // Close processing SweetAlert
    Swal.close();

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
    this.selectedFile = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
