import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgStyle, CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, FormFloatingDirective, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { FormsService } from '../../../common-service/forms/forms.service';
import { amcMasterCommonInterface, formsCommonInterface, formTypeCommonInterface  } from '../../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-forms',
  standalone: true,
  imports: [
    CommonModule, NgStyle, ReactiveFormsModule, FormsModule, RowComponent, ColComponent,
    TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective,
    FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective,
    FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, 
    ListGroupItemDirective
  ],
  templateUrl: './update-forms.component.html',
  styleUrls: ['./update-forms.component.scss']
})
export class UpdateFormsComponent implements OnInit {
  customStylesValidated = false;
  formUpdateForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  selectedFile: File | null = null;
  fileError: string | null = null;
  amcs: amcMasterCommonInterface[] = [];
  formTypes: formTypeCommonInterface[] = [];
  formDetails!: formsCommonInterface;
  formId: string = '0';
  currentFileName: string = 'No file currently uploaded';
  allowedFileTypes = ['.jpeg', '.jpg', '.pdf', '.docx', '.xlsx', '.csv', '.txt'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private formsService: FormsService,
    private cdr: ChangeDetectorRef
  ) {
    this.formUpdateForm = this.fb.group({
      formsAmcName: ['', Validators.required],
      formsType: ['', Validators.required],
      formsDescription: ['', Validators.required],
      formsFile: [null]
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.loadAmcs();
      await this.loadFormTypes();
      const params = await new Promise<{id?: string}>(resolve => 
        this.route.params.subscribe(params => resolve(params))
      );
      this.formId = params.id || '0';
      await this.loadFormDetails(this.formId);
    } catch (error) {
      console.error('Error initializing component:', error);
      await Swal.fire('Error', 'Failed to initialize the component', 'error');
    }
  }

  get f() { return this.formUpdateForm.controls; }

  async loadAmcs(): Promise<void> {
    try {
      const response = await this.formsService.getAmc();
      this.amcs = response.data;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading AMCs:', error);
      await Swal.fire('Error', 'Failed to load AMC data', 'error');
    }
  }

  async loadFormTypes(): Promise<void> {
    try {
      const response = await this.formsService.getFormTypes();
      this.formTypes = response.data;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading Form Types:', error);
      await Swal.fire('Error', 'Failed to load Form Types', 'error');
    }
  }

  async loadFormDetails(formId: string): Promise<void> {
    try {
      const response = await this.formsService.getFormsById(formId).toPromise();
  
      if (response && response.code === 1 && response.data) {
        const formData = response.data;
        
        const amcId = this.amcs.find(a => String(a.amcName) === String(formData.formsAmcName))?.id;
        const formTypeId = this.formTypes.find(a => String(a.formTypeName) === String(formData.formsType))?.id;

        this.formUpdateForm.patchValue({
          formsAmcName: amcId,
          formsType: formTypeId, // Use the id
          formsDescription: formData.formsDescription,
        });

        this.currentFileName = formData.formsFile ? this.getFileName(formData.formsFile) : 'No file currently uploaded';
        
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Error loading form details:', error);
      await Swal.fire('Error', 'Failed to load form details', 'error');
    }
  }
  
  // Add this helper method to extract the file name from the path
  getFileName(filePath: string): string {
    return filePath.split('/').pop() || filePath;
  }
  
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      
      if (this.allowedFileTypes.includes(fileExtension)) {
        this.selectedFile = file;
        this.currentFileName = file.name;
        this.fileError = null;
      } else {
        this.selectedFile = null;
        this.currentFileName = 'No file selected';
        this.fileError = 'Please choose a file with one of the following extensions: ' + this.allowedFileTypes.join(', ');
      }
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
  
    if (this.formUpdateForm.invalid) {
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
    if (this.selectedFile) {
      formData.append('formsFile', this.selectedFile, this.selectedFile.name);
    }
    formData.append('hideStatus', '0');
  
    this.loading = true;
  
    try {
      const response = await lastValueFrom(this.formsService.processForms(formData, this.formId));
      if (response.code === 1) {
        await Swal.fire("Updated!", response.message, "success");
        this.router.navigate(['/forms/forms']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      console.error('Error updating Forms:', error);
      await Swal.fire("Failed!", "An error occurred while updating the Forms", "error");
    } finally {
      this.loading = false;
    }
  }

  getMissingFields(): string[] {
    const missingFields: string[] = [];
    
    if (this.f['formsAmcName'].errors) missingFields.push('AMC Name');
    if (this.f['formsType'].errors) missingFields.push('Form Type');
    if (this.f['formsDescription'].errors) missingFields.push('Description');
    
    // Note: We don't check for file here as it might not be required in the update form
    
    return missingFields;
  }


  onCancel(): void {
    this.customStylesValidated = false;
    this.router.navigate(['/forms/forms']);
  }
}