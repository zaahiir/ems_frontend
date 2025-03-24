import { Component, OnInit } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { MarketingService } from '../../../common-service/marketing/marketing.service';
import { amcMasterCommonInterface, fileTypeCommonInterface } from '../../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-marketing',
  standalone: true,
  imports: [NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, TextColorDirective, CardComponent, FormFloatingDirective, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './create-marketing.component.html',
  styleUrls: ['./create-marketing.component.scss']
})
export class CreateMarketingComponent implements OnInit {

  customStylesValidated = false;
  marketingCreateForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  selectedFile: File | null = null;
  fileError: string | null = null;

  amc: amcMasterCommonInterface[] = [];
  fileType: fileTypeCommonInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private marketingService: MarketingService,
  ) {
    this.marketingCreateForm = this.fb.group({
      marketingAmcName: ['', Validators.required],
      marketingType: ['', Validators.required],
      marketingDescription: ['', Validators.required],
      marketingFile: [null, Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadAmcData();
    await this.loadFileType();
  }

  get f() { return this.marketingCreateForm.controls; }

  async loadAmcData(): Promise<void> {
    try {
      const response = await this.marketingService.getAmc();
      this.amc = response.data;
    } catch (error) {
      console.error('Error loading AMC data:', error);
      await Swal.fire('Error', 'Failed to load AMC data', 'error');
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

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.fileError = null;
    } else {
      this.selectedFile = null;
      this.fileError = 'Please choose a file.';
    }
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

    if (!this.selectedFile) {
      invalidFields.push('Marketing File');
      this.fileError = 'Please choose a file.';
    }

    if (invalidFields.length > 0) {
      await Swal.fire({
        title: 'Required Fields Missing',
        html: `Please fill in the following required fields:<br><br>${invalidFields.join('<br>')}`,
        icon: 'error'
      });
      return;
    }

    const formData = new FormData();
    formData.append('marketingAmcName', this.f['marketingAmcName'].value);
    formData.append('marketingType', this.f['marketingType'].value);
    formData.append('marketingDescription', this.f['marketingDescription'].value);
    
    // Add null check before appending the file
    if (this.selectedFile) {
      formData.append('marketingFile', this.selectedFile, this.selectedFile.name);
    }
    
    formData.append('hideStatus', '0');

    const id = "0";
    this.loading = true;

    try {
      const response = await lastValueFrom(this.marketingService.processMarketing(formData, "0"));

      if (response.code === 1) {
        await Swal.fire("Added!", "Marketing created successfully", "success");
        this.router.navigate(['/forms/marketing']);
      } else {
        await Swal.fire("Failed!", "Error creating marketing", "error");
      }
    } catch (error) {
      console.error('Error processing Marketing:', error);
      let errorMessage = "An error occurred while processing the marketing entry.";
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

  private getFieldName(key: string): string {
    const fieldNames: { [key: string]: string } = {
      marketingAmcName: 'AMC Name',
      marketingType: 'Marketing Type',
      marketingDescription: 'Marketing Description',
      marketingFile: 'Marketing File'
    };
    return fieldNames[key] || key;
  }

  onReset(): void {
    this.customStylesValidated = false;
    this.submitted = false;
    this.selectedFile = null;
    this.fileError = null;
    this.marketingCreateForm.reset();
  }
}