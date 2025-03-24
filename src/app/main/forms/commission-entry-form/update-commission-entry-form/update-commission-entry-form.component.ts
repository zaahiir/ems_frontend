import { Component, OnInit } from '@angular/core';
import { NgStyle, DatePipe, CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { CommissionEntryFormService } from '../../../common-service/commission-entry-form/commission-entry-form.service'
import { amcMasterCommonInterface, arnMasterCommonInterface } from '../../../interfaces/interfaces'
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-commission-entry-form',
  standalone: true,
  imports: [DatePipe, CommonModule, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, FormFloatingDirective, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  providers: [DatePipe],
  templateUrl: './update-commission-entry-form.component.html',
  styleUrl: './update-commission-entry-form.component.scss'
})
export class UpdateCommissionEntryFormComponent implements OnInit {

  customStylesValidated = false;
  commissionUpdateForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  commissionId: string = "0";
  arns: arnMasterCommonInterface[] = [];  
  amcs: amcMasterCommonInterface[] = []; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private commissionEntryFormService: CommissionEntryFormService,
  ) { 
    this.initForm();
  }

  async ngOnInit(): Promise<void> { 
    try {
      await Promise.all([this.loadArn(), this.loadAmc()]);
      this.route.params.subscribe(params => {
        this.commissionId = params['id'] || '0';
        this.loadCommissionData(this.commissionId);
      });
    } catch (error) {
      console.error('Error initializing component:', error);
      await Swal.fire('Error', 'Failed to initialize the component', 'error');
    }
  }

  initForm(): void {
    this.commissionUpdateForm = this.fb.group({
      commissionArnNumber: ['', Validators.required],
      commissionAmcName: ['', Validators.required],
      commissionAmount: ['', [Validators.required, Validators.min(0)]],
      commissionMonth: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}$/)]]
    });
  }

  get f() { return this.commissionUpdateForm.controls; }

  async loadArn(): Promise<void> {
    try {
      const response = await this.commissionEntryFormService.getArn();
      this.arns = response.data;
    } catch (error) {
      console.error('Error loading ARNs:', error);
      await Swal.fire('Error', 'Failed to load ARNs', 'error');
    }
  }

  async loadAmc(): Promise<void> {
    try {
      const response = await this.commissionEntryFormService.getAmc();
      this.amcs = response.data;
    } catch (error) {
      console.error('Error loading AMCs:', error);
      await Swal.fire('Error', 'Failed to load AMCs', 'error');
    }
  }

  async loadCommissionData(commissionId: string): Promise<void> {
    try {
      const response = await this.commissionEntryFormService.getCommissionById(commissionId).toPromise();

      if (response && response.code === 1 && response.data) {
        const commissionData = response.data;
        
        const arnId = this.arns.find(arn => arn.arnNumber === commissionData.commissionArnNumber)?.id;
        const amcId = this.amcs.find(amc => amc.amcName === commissionData.commissionAmcName)?.id;

        if (!arnId || !amcId) {
          console.error('Could not find matching ARN or AMC');
          await Swal.fire('Error', 'Failed to match ARN or AMC data', 'error');
          return;
        }

        this.commissionUpdateForm.patchValue({
          commissionArnNumber: arnId,
          commissionAmcName: amcId,
          commissionAmount: commissionData.commissionAmount,
          commissionMonth: this.datePipe.transform(commissionData.commissionMonth, 'yyyy-MM'),
        });
      }else {
        console.error('Invalid response structure:', response);
      }
    } catch (error) {
      console.error('Error loading Commission data:', error);
      await Swal.fire('Error', 'Failed to load Commission data', 'error');
    }
  }
  
  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;
  
    if (this.commissionUpdateForm.invalid) {
      const missingFields = Object.keys(this.commissionUpdateForm.controls)
        .filter(key => this.commissionUpdateForm.get(key)?.invalid)
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

      Object.keys(this.commissionUpdateForm.controls).forEach(key => {
        const control = this.commissionUpdateForm.get(key);
        if (control && control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }
  
    if (this.loading) return;
    this.loading = true;

    const formData = this.commissionUpdateForm.value;
  
    const data = {
      commissionArnNumber: formData.commissionArnNumber,
      commissionAmcName: formData.commissionAmcName,
      commissionAmount: formData.commissionAmount,
      commissionMonth: formData.commissionMonth,
      hideStatus: 0,
    };
  
    try {
      const response = await lastValueFrom(this.commissionEntryFormService.processCommission(data, this.commissionId));
      if (response.code === 1) {
        await Swal.fire("Updated!", response.message, "success");
        this.router.navigate(['/forms/commission']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      console.error('Error updating Commission:', error);
      await Swal.fire("Failed!", "An error occurred while updating the Commission", "error");
    } finally {
      this.loading = false;
    }
  }   

  onCancel(): void {
    this.router.navigate(['/forms/commission']);
  }
}