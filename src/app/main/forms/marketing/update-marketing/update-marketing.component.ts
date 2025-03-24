import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgStyle, CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { MarketingService } from '../../../common-service/marketing/marketing.service';
import { amcMasterCommonInterface, marketingCommonInterface, fileTypeCommonInterface } from '../../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-marketing',
  standalone: true,
  imports: [
    CommonModule, NgStyle, ReactiveFormsModule, FormsModule, RowComponent, ColComponent,
    TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormFloatingDirective, 
    FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective,
    FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, 
    ListGroupItemDirective
  ],
  templateUrl: './update-marketing.component.html',
  styleUrls: ['./update-marketing.component.scss']
})
export class UpdateMarketingComponent implements OnInit {
  customStylesValidated = false;
  marketingUpdateForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  selectedFile: File | null = null;
  fileError: string | null = null;
  amcs: amcMasterCommonInterface[] = [];
  fileType: fileTypeCommonInterface[] = [];
  marketingId: string = '0';
  currentFileName: string = 'No file currently uploaded';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private marketingService: MarketingService,
    private cdr: ChangeDetectorRef
  ) {
    this.marketingUpdateForm = this.fb.group({
      marketingAmcName: ['', Validators.required],
      marketingType: ['', Validators.required],
      marketingDescription: ['', Validators.required],
      marketingFile: [null]
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadAmcs();
    await this.loadFileType();
    this.route.params.subscribe(async params => {
      this.marketingId = params['id'] || '0';
      await this.loadMarketingData(this.marketingId);
    });
  }

  get f() { return this.marketingUpdateForm.controls; }

  async loadAmcs(): Promise<void> {
    try {
      const response = await this.marketingService.getAmc();
      this.amcs = response.data;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading AMCs:', error);
      await Swal.fire('Error', 'Failed to load AMCs', 'error');
    }
  }

  async loadFileType(): Promise<void> {
    try {
      const response = await this.marketingService.getFileType();
      this.fileType = response.data;
    } catch (error) {
      console.error('Error loading FileType data:', error);
      await Swal.fire('Error', 'Failed to load AMC data', 'error');
    }
  }

  async loadMarketingData(marketingId: string): Promise<void> {
    try {
      const response = await this.marketingService.getMarketingById(marketingId).toPromise();
  
      if (response && response.code === 1 && response.data) {
        const marketingData = response.data;
        
        const amcId = this.amcs.find(a => String(a.amcName) === String(marketingData.marketingAmcName))?.id;
        const fileTypeId = this.fileType.find(a => String(a.fileTypeName) === String(marketingData.marketingType))?.id;
        
        this.marketingUpdateForm.patchValue({
          marketingAmcName: amcId,
          marketingType: fileTypeId,
          marketingDescription: marketingData.marketingDescription,
        });
        this.currentFileName = marketingData.marketingFile ? this.getFileName(marketingData.marketingFile) : 'No file currently uploaded';
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Error loading Marketing data:', error);
      await Swal.fire('Error', 'Failed to load marketing data', 'error');
    }
  }
  
  // Add this helper method to extract the file name from the path
  getFileName(filePath: string): string {
    return filePath.split('/').pop() || filePath;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      // Extract only the filename with extension
      this.currentFileName = this.selectedFile.name.split('\\').pop()?.split('/').pop() || 'No file selected';
      this.fileError = null;
    } else {
      this.selectedFile = null;
      this.currentFileName = 'No file selected';
      this.fileError = 'Please choose a file.';
    }
    this.cdr.detectChanges();
  }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;

    const invalidFields: string[] = [];

    Object.keys(this.f).forEach(key => {
      if (this.f[key].invalid) {
        invalidFields.push(this.getFieldName(key));
      }
    });

    if (invalidFields.length > 0) {
      await Swal.fire({
        title: 'Required Fields Missing',
        html: `Please fill in the following required fields:<br><br>${invalidFields.join('<br>')}`,
        icon: 'error'
      });
      return;
    }

    console.log('Submit...');

    const formData = new FormData();
    const formValues = this.marketingUpdateForm.value;

    formData.append('marketingAmcName', formValues.marketingAmcName);
    formData.append('marketingType', formValues.marketingType);
    formData.append('marketingDescription', formValues.marketingDescription);
    if (this.selectedFile) {
      formData.append('marketingFile', this.selectedFile, this.selectedFile.name);
    }
    formData.append('hideStatus', '0');

    this.loading = true;

    try {
      const response = await lastValueFrom(this.marketingService.processMarketing(formData, this.marketingId));
      if (response.code === 1) {
        await Swal.fire("Updated!", response.message, "success");
        this.router.navigate(['/forms/marketing']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      console.error('Error updating Marketing:', error);
      await Swal.fire("Failed!", "An error occurred while updating the Marketing", "error");
    } finally {
      this.loading = false;
    }
  }

  private getFieldName(key: string): string {
    const fieldNames: { [key: string]: string } = {
      marketingAmcName: 'AMC Name',
      marketingType: 'Marketing Type',
      marketingDescription: 'Marketing Description',
      marketingFile: 'Marketing File'
    };
    return fieldNames[key] || key;
  }

  onCancel(): void {
    this.customStylesValidated = false;
    this.router.navigate(['/forms/marketing']);
  }
}