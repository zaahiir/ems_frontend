import { Component, OnInit } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { CommissionEntryFormService } from '../../../common-service/commission-entry-form/commission-entry-form.service'
import { amcMasterCommonInterface, arnMasterCommonInterface } from '../../../interfaces/interfaces'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-commission-entry-form',
  standalone: true,
  imports: [ DatePipe, NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, TextColorDirective, FormFloatingDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  providers: [DatePipe],
  templateUrl: './create-commission-entry-form.component.html',
  styleUrl: './create-commission-entry-form.component.scss'
})
export class CreateCommissionEntryFormComponent implements OnInit {

  customStylesValidated = false;
  commissionEntryForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  arn: arnMasterCommonInterface[] = [];  
  amc: amcMasterCommonInterface[] = [];  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private commissionEntryFormService: CommissionEntryFormService,
  ) {
    this.initForm();
  }

  initForm(): void {
    this.commissionEntryForm = this.fb.group({
      commissionArnNumber: ['', Validators.required],
      commissionAmcName: ['', Validators.required],
      commissionAmount: ['', Validators.required],
      commissionMonth: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}$/)]]
    });
  }

  async ngOnInit(): Promise<void> { 
    try {
      await Promise.all([this.loadArn(), this.loadAmc()]);
    } catch (error) {
      console.error('Error initializing component:', error);
      await Swal.fire('Error', 'Failed to load initial data', 'error');
    }
  }

  get f() { return this.commissionEntryForm.controls; }

  async loadArn(): Promise<void> {
    try {
      const response = await this.commissionEntryFormService.getArn();
      this.arn = response.data;
    } catch (error) {
      console.error('Error loading ARN:', error);
      throw error;
    }
  }

  async loadAmc(): Promise<void> {
    try {
      const response = await this.commissionEntryFormService.getAmc();
      this.amc = response.data;
    } catch (error) {
      console.error('Error loading AMC:', error);
      throw error;
    }
  }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;
  
    if (this.commissionEntryForm.invalid) {
      const missingFields = Object.keys(this.commissionEntryForm.controls)
        .filter(key => this.commissionEntryForm.get(key)?.invalid)
        .map(key => {
          switch (key) {
            case 'commissionArnNumber': return 'ARN Number';
            case 'commissionAmcName': return 'AMC Name';
            case 'commissionAmount': return 'Commission Amount';
            case 'commissionMonth': return 'Commission Month';
            default: return key;
          }
        });

      await Swal.fire({
        title: 'Required Fields Missing',
        html: `Please fill in the following required fields:<br><br>${missingFields.join('<br>')}`,
        icon: 'error'
      });

      Object.values(this.commissionEntryForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }
  
    if (this.loading) return; // Prevent multiple submissions
    this.loading = true;
  
    const formData = this.commissionEntryForm.value;
    const data = {
      commissionArnNumber: formData.commissionArnNumber,
      commissionAmcName: formData.commissionAmcName,
      commissionAmount: formData.commissionAmount,
      commissionMonth: formData.commissionMonth,
      hideStatus: 0,
    };
  
    try {
      const response = await lastValueFrom(this.commissionEntryFormService.processCommission(data, "0"));
      if (response.code === 1) {
        await Swal.fire("Added!", response.message, "success");
        this.router.navigate(['/forms/commission']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      console.error('Error processing Commission:', error);
      let errorMessage = "An error occurred while processing the commission entry.";
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

  onReset(): void {
    this.customStylesValidated = false;
    this.submitted = false;
    this.commissionEntryForm.reset();
  }
}