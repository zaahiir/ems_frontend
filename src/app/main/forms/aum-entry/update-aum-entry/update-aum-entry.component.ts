import { Component, OnInit } from '@angular/core';
import { NgStyle, DatePipe, CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { AumEntryService } from '../../../common-service/aum-entry/aum-entry.service'
import { amcMasterCommonInterface, arnMasterCommonInterface } from '../../../interfaces/interfaces'
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-aum-entry',
  standalone: true,
  imports: [DatePipe, CommonModule, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, FormFloatingDirective, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  providers: [DatePipe],
  templateUrl: './update-aum-entry.component.html',
  styleUrl: './update-aum-entry.component.scss'
})
export class UpdateAumEntryComponent implements OnInit {

  customStylesValidated = false;
  aumUpdateForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  aumId: string = "0";
  arns: arnMasterCommonInterface[] = [];  
  amcs: amcMasterCommonInterface[] = []; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private aumEntryService: AumEntryService,
  ) { 
    this.initForm();
  }

  async ngOnInit(): Promise<void> { 
    try {
      await Promise.all([this.loadArn(), this.loadAmc()]);
      this.route.params.subscribe(params => {
        this.aumId = params['id'] || '0';
        this.loadAumData();
      });
    } catch (error) {
      console.error('Error initializing component:', error);
      await Swal.fire('Error', 'Failed to initialize the form. Please try again.', 'error');
    }
  }

  initForm(): void {
    this.aumUpdateForm = this.fb.group({
      aumArnNumber: ['', Validators.required],
      aumAmcName: ['', Validators.required],
      aumInvoiceNumber: ['', Validators.required],
      aumAmount: ['', [Validators.required, Validators.min(0)]],
      aumMonth: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}$/)]]
    });
  }

  get f() { return this.aumUpdateForm.controls; }

  async loadArn(): Promise<void> {
    try {
      const response = await this.aumEntryService.getArn();
      this.arns = response.data;
    } catch (error) {
      console.error('Error loading ARNs:', error);
      await Swal.fire('Error', 'Failed to load ARNs', 'error');
    }
  }

  async loadAmc(): Promise<void> {
    try {
      const response = await this.aumEntryService.getAmc();
      this.amcs = response.data;
    } catch (error) {
      console.error('Error loading AMCs:', error);
      await Swal.fire('Error', 'Failed to load AMCs', 'error');
    }
  }

  async loadAumData(): Promise<void> {
    try {
      const response = await this.aumEntryService.getAumById(this.aumId.toString()).toPromise();

      if (response && response.code === 1 && response.data) {
        const aumData = response.data;

        const arnId = this.arns.find(arn => arn.arnNumber === aumData.aumArnNumber)?.id;

        const amcId = this.amcs.find(amc => amc.amcName === aumData.aumAmcName)?.id;

        if (!arnId || !amcId) {
          console.error('Could not find matching ARN or AMC');
          await Swal.fire('Error', 'Failed to match ARN or AMC data', 'error');
          return;
        }

        this.aumUpdateForm.patchValue({
          aumArnNumber: arnId,
          aumAmcName: amcId,
          aumInvoiceNumber: aumData.aumInvoiceNumber,
          aumAmount: aumData.aumAmount,
          aumMonth: this.datePipe.transform(aumData.aumMonth, 'yyyy-MM'),
        });
      } else {
        console.error('Invalid response structure:', response);
      }
    } catch (error) {
      console.error('Error loading AUM data:', error);
      await Swal.fire('Error', 'Failed to load AUM data', 'error');
    }
  }
  
  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;
  
    if (this.aumUpdateForm.invalid) {
      const missingFields = Object.keys(this.aumUpdateForm.controls)
        .filter(key => this.aumUpdateForm.get(key)?.invalid)
        .map(key => {
          switch (key) {
            case 'aumArnNumber': return 'ARN Number';
            case 'aumAmcName': return 'AMC Name';
            case 'aumInvoiceNumber': return 'Invoice Number';
            case 'aumAmount': return 'Amount';
            case 'aumMonth': return 'Month';
            default: return key;
          }
        });

      await Swal.fire({
        title: 'Required Fields Missing',
        html: `Please fill in the following required fields:<br><br>${missingFields.join('<br>')}`,
        icon: 'error'
      });

      Object.keys(this.aumUpdateForm.controls).forEach(key => {
        const control = this.aumUpdateForm.get(key);
        if (control && control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }
  
    if (this.loading) return;
    this.loading = true;
    
    const formData = this.aumUpdateForm.value;
  
    const data = {
      aumArnNumber: formData.aumArnNumber,
      aumAmcName: formData.aumAmcName,
      aumInvoiceNumber: formData.aumInvoiceNumber,
      aumAmount: formData.aumAmount,
      aumMonth: formData.aumMonth,
      hideStatus: 0,
    };
  
    try {
      const response = await lastValueFrom(this.aumEntryService.processAum(data, this.aumId));
      if (response.code === 1) {
        await Swal.fire("Updated!", response.message, "success");
        this.router.navigate(['/forms/aum']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      console.error('Error updating AUM:', error);
      await Swal.fire("Failed!", "An error occurred while updating the AUM", "error");
    } finally {
      this.loading = false;
    }
  }

  onCancel(): void {
    this.router.navigate(['/forms/aum']);
  }
}