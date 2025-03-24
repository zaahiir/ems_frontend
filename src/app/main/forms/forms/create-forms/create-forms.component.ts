import { Component, OnInit } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, FormFloatingDirective, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { FormsService } from '../../../common-service/forms/forms.service';
import { amcMasterCommonInterface, formTypeCommonInterface } from '../../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-forms',
  standalone: true,
  imports: [NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, TextColorDirective, FormFloatingDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './create-forms.component.html',
  styleUrls: ['./create-forms.component.scss']
})
export class CreateFormsComponent implements OnInit {

  customStylesValidated = false;
  formCreateForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  selectedFile: File | null = null;
  fileError: string | null = null;
  allowedFileTypes = ['.jpeg', '.jpg', '.pdf', '.docx', '.xlsx', '.csv', '.txt'];

  amc: amcMasterCommonInterface[] = [];
  formTypes: formTypeCommonInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private formsService: FormsService,
  ) {
    this.formCreateForm = this.fb.group({
      formsAmcName: ['', Validators.required],
      formsType: ['', Validators.required],
      formsDescription: ['', Validators.required],
      formsFile: [null, Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadAmcData();
    await this.loadFormType(); 
  }

  // Convenience getter for easy access to form fields
  get f() { return this.formCreateForm.controls; }

  async loadAmcData(): Promise<void> {
    try {
      const response = await this.formsService.getAmc();
      this.amc = response.data;
    } catch (error) {
      console.error('Error loading AMC data:', error);
      await Swal.fire("Error", "Failed to load AMC data", "error");
    }
  }

  async loadFormType(): Promise<void> {
    try {
      const response = await this.formsService.getFormTypes();
      this.formTypes = response.data;
    } catch (error) {
      console.error('Error loading AMC data:', error);
      await Swal.fire("Error", "Failed to load AMC data", "error");
    }
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (this.allowedFileTypes.includes(fileExtension)) {
        this.selectedFile = file;
        this.fileError = null;
      } else {
        this.selectedFile = null;
        this.fileError = 'Please choose a file with one of the following extensions: ' + this.allowedFileTypes.join(', ');
      }
    } else {
      this.selectedFile = null;
      this.fileError = 'Please choose a file.';
    }
  }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;

    if (this.formCreateForm.invalid || !this.selectedFile) {
      const missingFields = this.getMissingFields();
      if (missingFields.length > 0) {
        await Swal.fire({
          title: "Missing Fields",
          html: `Please fill in the following required fields:<br>${missingFields.join('<br>')}`,
          icon: "error"
        });
      }
      return;
    }

    const formData = new FormData();
    formData.append('formsAmcName', this.f['formsAmcName'].value);
    formData.append('formsType', this.f['formsType'].value);
    formData.append('formsDescription', this.f['formsDescription'].value);
    formData.append('formsFile', this.selectedFile, this.selectedFile.name);
    formData.append('hideStatus', '0');

    const id = "0";
    this.loading = true;

    try {
      const response = await lastValueFrom(this.formsService.processForms(formData, "0"));

      if (response.code === 1) {
        await Swal.fire("Added!", "Forms created successfully", "success");
        this.router.navigate(['/forms/forms']);
      } else {
        await Swal.fire("Failed!", "Error creating forms", "error");
      }
    } catch (error) {
      console.error('Error processing Forms:', error);
      let errorMessage = "An error occurred while processing the forms entry.";
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

  getMissingFields(): string[] {
    const missingFields: string[] = [];
    
    if (this.f['formsAmcName'].errors) missingFields.push('AMC Name');
    if (this.f['formsType'].errors) missingFields.push('Form Type');
    if (this.f['formsDescription'].errors) missingFields.push('Description');
    if (!this.selectedFile) missingFields.push('File');

    return missingFields;
  }
  
  onReset(): void {
    this.customStylesValidated = false;
    this.submitted = false;
    this.selectedFile = null;
    this.fileError = null;
    this.formCreateForm.reset();
  }
}