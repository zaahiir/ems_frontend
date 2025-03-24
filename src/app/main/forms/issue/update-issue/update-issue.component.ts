import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgStyle, CommonModule, formatDate } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, ButtonDirective } from '@coreui/angular';
import { IssueService } from '../../../common-service/issue/issue.service';
import { issueTypeCommonInterface, clientCommonInterface } from '../../../interfaces/interfaces';
import Swal from 'sweetalert2';
import { Subject, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-issue',
  standalone: true,
  imports: [
    NgStyle, CommonModule, RouterLink, RowComponent, ColComponent, 
    TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, 
    ReactiveFormsModule, FormFloatingDirective, FormsModule, FormDirective, 
    FormLabelDirective, FormControlDirective, FormFeedbackComponent, 
    InputGroupComponent, InputGroupTextDirective, FormSelectDirective, 
    ButtonDirective
  ],
  templateUrl: './update-issue.component.html',
  styleUrls: ['./update-issue.component.scss']
})
export class UpdateIssueComponent implements OnInit, OnDestroy {
  issueUpdateForm!: FormGroup;
  customStylesValidated = false;
  submitted = false;
  loading = false;
  dataLoading = true;
  issueTypes: issueTypeCommonInterface[] = [];
  clients: clientCommonInterface[] = [];

  currentDate: string;
  private destroy$ = new Subject<void>();
  issueId: string = "0";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private issueService: IssueService
  ) {
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    this.issueUpdateForm = this.initForm();
  }

  initForm(): FormGroup {
    return this.fb.group({
      issueClientName: ['', Validators.required],
      issueType: ['', Validators.required],
      issueDate: ['', Validators.required],
      issueResolutionDate: ['', Validators.required],
      issueDescription: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.issueId = params['id'] || '0';
      Promise.all([this.loadClient(), this.loadIssueType()])
        .then(() => this.loadInitialData(this.issueId))
        .catch(error => {
          console.error('Error initializing component:', error);
          Swal.fire('Error', 'Failed to initialize the component', 'error');
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  async loadIssueType(): Promise<void> {
    try {
      const response = await this.issueService.getIssueType();
      this.issueTypes = response.data;
    } catch (error) {
      console.error('Error loading Issue Types:', error);
      await Swal.fire('Error', 'Failed to load Issue Types', 'error');
    }
  }

  async loadClient(): Promise<void> {
    try {
      const response = await this.issueService.getClientName();
      this.clients = response.data;
    } catch (error) {
      console.error('Error loading Clients:', error);
      await Swal.fire('Error', 'Failed to load Clients', 'error');
    }
  }

  async loadInitialData(issueId: string): Promise<void> {
    try {
      this.showLoader('Loading data...');
      const response = await this.issueService.getIssueById(issueId).toPromise();
  
      if (response && response.code === 1 && response.data) {
        const issueData = response.data;
        
        const clientId = this.clients.find(client => client.clientName === issueData.issueClientName)?.id;
        const issueTypeId = this.issueTypes.find(issueType => issueType.issueTypeName === issueData.issueType)?.id;
  
        if (!clientId || !issueTypeId) {
          console.error('Could not find matching Client or Issue Type');
          await Swal.fire('Error', 'Failed to match Client or Issue Type data', 'error');
          return;
        }
  
        if (this.issueUpdateForm) {
          this.issueUpdateForm.patchValue({
            issueClientName: clientId,
            issueType: issueTypeId,
            issueDate: issueData.issueDate,
            issueResolutionDate: issueData.issueResolutionDate,
            issueDescription: issueData.issueDescription
          });
        } else {
          console.error('Form is not initialized');
        }
      } else {
        console.error('Invalid response structure:', response);
      }
    } catch (error) {
      console.error('Error loading Issue data:', error);
      await Swal.fire('Error', 'Failed to load Issue data', 'error');
    } finally {
      this.dataLoading = false;
      this.hideLoader();
    }
  }

  onIssueTypeChange(): void {
    this.updateResolutionDate();
  }

  onIssueDateChange(): void {
    this.updateResolutionDate();
  }

  updateResolutionDate(): void {
    const issueTypeId = this.issueUpdateForm.get('issueType')?.value;
    const issueDateStr = this.issueUpdateForm.get('issueDate')?.value;
    
    if (!issueTypeId || !issueDateStr) return;

    const issueDate = new Date(issueDateStr);
    const issueType = this.issueTypes.find(type => type.id === Number(issueTypeId));

    if (issueType) {
      const resolutionDate = this.calculateResolutionDate(issueDate, issueType.estimatedIssueDay);
      this.issueUpdateForm.patchValue({
        issueResolutionDate: formatDate(resolutionDate, 'yyyy-MM-dd', 'en')
      }, { emitEvent: false });
    }
  }

  calculateResolutionDate(issueDate: Date, estimatedDays: number): Date {
    let date = new Date(issueDate.getTime());
    let workingDays = 0;
    while (workingDays < estimatedDays) {
      date.setDate(date.getDate() + 1);
      if (this.isWorkingDay(date)) {
        workingDays++;
      }
    }
    return date;
  }

  isWorkingDay(date: Date): boolean {
    const day = date.getDay();
    return day >= 1 && day <= 5; // Monday to Friday
  }

  get f() { return this.issueUpdateForm.controls; }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;
  
    if (this.issueUpdateForm.invalid) {
      const invalidFields = Object.keys(this.issueUpdateForm.controls)
        .filter(key => this.issueUpdateForm.get(key)?.invalid)
        .map(key => {
          switch(key) {
            case 'issueClientName': return 'Client Name';
            case 'issueType': return 'Issue Type';
            case 'issueDate': return 'Issue Date';
            case 'issueResolutionDate': return 'Resolution Date';
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
    this.showLoader('Updating...');
  
    const formData = this.issueUpdateForm.value;
  
    const issueData = {
      issueClientName: formData.issueClientName,
      issueType: formData.issueType,
      issueDate: formData.issueDate,
      issueResolutionDate: formData.issueResolutionDate,
      issueDescription: formData.issueDescription,
      hideStatus: 0
    };
  
    try {
      const response = await lastValueFrom(this.issueService.processIssue(issueData, this.issueId));
      if (response.code === 1) {
        await Swal.fire("Updated!", response.message, "success");
        this.router.navigate(['/forms/issue']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      console.error('Error updating Issue:', error);
      await Swal.fire("Failed!", "An error occurred while updating the Issue", "error");
    } finally {
      this.loading = false;
      this.hideLoader();
    }
  }

  onCancel(): void {
    this.router.navigate(['/forms/issue']);
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