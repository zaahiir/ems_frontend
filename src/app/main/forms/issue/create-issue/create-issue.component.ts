import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule, formatDate } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormFloatingDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, ButtonDirective } from '@coreui/angular';
import { IssueService } from '../../../common-service/issue/issue.service';
import { issueTypeCommonInterface, clientCommonInterface } from '../../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subject, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-issue',
  standalone: true,
  imports: [
    NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, 
    TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, 
    ReactiveFormsModule, FormFloatingDirective, FormsModule, FormDirective, 
    FormLabelDirective, FormControlDirective, FormFeedbackComponent, 
    InputGroupComponent, InputGroupTextDirective, FormSelectDirective, 
    ButtonDirective, NgStyle
  ],
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit, OnDestroy {
  issueForm: FormGroup;
  customStylesValidated = false;
  submitted = false;
  loading = false;
  dataLoading = true;

  issueTypes: issueTypeCommonInterface[] = [];
  clients: clientCommonInterface[] = [];

  currentDate: string;
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private issueService: IssueService
  ) {
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.issueForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      issueClientName: ['', Validators.required],
      issueType: ['', Validators.required],
      issueDate: [this.currentDate, Validators.required],
      issueDescription: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadInitialData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async loadInitialData(): Promise<void> {
    try {
      this.showLoader('Loading data...');
      const [issueTypesResponse, clientsResponse] = await Promise.all([
        this.issueService.getIssueType(),
        this.issueService.getClientName()
      ]);

      this.issueTypes = issueTypesResponse.data;
      this.clients = clientsResponse.data;
    } catch (error) {
      await Swal.fire('Error', 'Failed to initialize the form. Please try again.', 'error');
    } finally {
      this.dataLoading = false;
      this.hideLoader();
    }
  }

  get f() { return this.issueForm.controls; }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;
  
    if (this.issueForm.invalid) {
      const invalidFields = Object.keys(this.issueForm.controls)
        .filter(key => this.issueForm.get(key)?.invalid)
        .map(key => {
          switch(key) {
            case 'issueClientName': return 'Client Name';
            case 'issueType': return 'Issue Type';
            case 'issueDate': return 'Issue Date';
            case 'issueDescription': return 'Issue Description';
            default: return key;
          }
        });
  
      await Swal.fire({
        title: 'Form Validation Error',
        html: `Please fill in the following required fields:<br>${invalidFields.join('<br>')}`,
        icon: 'error'
      });
      return;
    }
  
    if (this.loading) return;
    this.loading = true;
    this.showLoader('Submitting...');
  
    const formData = this.issueForm.value;
  
    try {
      const response = await lastValueFrom(this.issueService.processIssue(formData, "0"));
  
      if (response.code === 1) {
        await Swal.fire("Added!", "Issue created successfully", "success");
        this.router.navigate(['/forms/issue']);
      } else {
        await Swal.fire("Failed!", "Error creating issue", "error");
      }
    } catch (error) {
      console.error('Error processing Issue:', error);
      let errorMessage = "An error occurred while processing the issue entry.";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      await Swal.fire("Failed!", errorMessage, "error");
    } finally {
      this.loading = false;
      this.hideLoader();
    }
  }

  onReset(): void {
    this.customStylesValidated = false;
    this.submitted = false;
    this.issueForm.reset({
      issueDate: this.currentDate
    });
  }

  showLoader(message: string = 'Loading...'): void {
    Swal.fire({
      title: message,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  }

  hideLoader(): void {
    Swal.close();
  }
}