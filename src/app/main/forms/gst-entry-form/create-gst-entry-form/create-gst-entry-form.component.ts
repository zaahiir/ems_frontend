import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { GstEntryFormsService } from '../../../common-service/gst-entry-forms/gst-entry-forms.service'
import { amcMasterCommonInterface, arnMasterCommonInterface } from '../../../interfaces/interfaces'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-gst-entry-form',
  standalone: true,
  imports: [NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, TextColorDirective, CardComponent, FormFloatingDirective, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './create-gst-entry-form.component.html',
  styleUrl: './create-gst-entry-form.component.scss'
})
export class CreateGstEntryFormComponent implements OnInit, OnDestroy {

  customStylesValidated = false;
  gstEntryForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  amc: amcMasterCommonInterface[] = [];
  arn: arnMasterCommonInterface[] = [];

  private destroy$ = new Subject<void>();
  private calculateGst$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private gstEntryFormsService: GstEntryFormsService,
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.gstEntryForm = this.fb.group({
      gstInvoiceDate: ['', Validators.required],
      gstInvoiceNumber: ['', Validators.required],
      gstAmcName: ['', Validators.required],
      gstArnNumber: ['', Validators.required],
      gstRegistered: [true], // Default to GST registered
      gstTotalValue: ['', [Validators.required, Validators.min(0)]],
      gstTaxableValue: [{ value: '', disabled: true }],
      gstIGst: [{ value: '', disabled: true }],
      gstSGst: [{ value: '', disabled: true }],
      gstCGst: [{ value: '', disabled: true }]
    });
  }

  async ngOnInit(): Promise<void> {
    await this.loadAumData();
    await this.loadArnData();
    this.setupFormValueChanges();
    this.setupGstCalculation();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get f() { return this.gstEntryForm.controls; }

  private async loadAumData(): Promise<void> {
    try {
      const response = await this.gstEntryFormsService.getAmc();
      this.amc = response.data;
    } catch (error) {
      await Swal.fire('Error', 'Failed to load AMC data', 'error');
    }
  }

  private async loadArnData(): Promise<void> {
    try {
      const response = await this.gstEntryFormsService.getArn();
      this.arn = response.data;
    } catch (error) {
      await Swal.fire('Error', 'Failed to load ARN data', 'error');
    }
  }

  private setupFormValueChanges(): void {
    this.gstEntryForm.get('gstAmcName')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.calculateGst$.next());

    this.gstEntryForm.get('gstTotalValue')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.calculateGst$.next());

    // Listen to GST registration status changes
    this.gstEntryForm.get('gstRegistered')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.calculateGst$.next());
  }

  private setupGstCalculation(): void {
    this.calculateGst$
      .pipe(
        debounceTime(300),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.calculateGst());
  }

  private calculateGst(): void {
    const selectedAmcId = this.f['gstAmcName'].value;
    const totalValue = parseFloat(this.f['gstTotalValue'].value);
    const isGstRegistered = this.f['gstRegistered'].value;

    if (selectedAmcId && !isNaN(totalValue) && totalValue > 0) {
      const selectedAmc = this.amc.find(amc => amc.id == selectedAmcId);

      if (selectedAmc) {
        if (isGstRegistered) {
          // GST Registered - Calculate GST
          const isIGst = selectedAmc.amcGstType === 'IGST';
          const gstRate = 0.18;

          const taxableValue = totalValue / (1 + gstRate);
          const gstValue = totalValue - taxableValue;

          const updatedValues = {
            gstTaxableValue: taxableValue.toFixed(2),
            gstIGst: isIGst ? gstValue.toFixed(2) : '0.00',
            gstSGst: isIGst ? '0.00' : (gstValue / 2).toFixed(2),
            gstCGst: isIGst ? '0.00' : (gstValue / 2).toFixed(2)
          };

          this.gstEntryForm.patchValue(updatedValues, { emitEvent: false });
        } else {
          // Not GST Registered - Total value equals taxable value, no GST
          const updatedValues = {
            gstTaxableValue: totalValue.toFixed(2),
            gstIGst: '0.00',
            gstSGst: '0.00',
            gstCGst: '0.00'
          };

          this.gstEntryForm.patchValue(updatedValues, { emitEvent: false });
        }

        this.gstEntryForm.updateValueAndValidity();
      }
    } else {
      this.resetGstFields();
    }
  }

  private resetGstFields(): void {
    this.gstEntryForm.patchValue({
      gstTaxableValue: '',
      gstIGst: '',
      gstSGst: '',
      gstCGst: ''
    });
  }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;

    if (this.gstEntryForm.invalid) {
      const invalidFields = Object.keys(this.gstEntryForm.controls)
        .filter(key => this.gstEntryForm.get(key)?.invalid)
        .map(key => {
          switch(key) {
            case 'gstInvoiceDate': return 'Invoice Date';
            case 'gstInvoiceNumber': return 'Invoice Number';
            case 'gstAmcName': return 'AMC Name';
            case 'gstArnNumber': return 'ARN Number';
            case 'gstTotalValue': return 'Total Value';
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

    const formValue = this.gstEntryForm.getRawValue();
    const data = {
      ...formValue,
      hideStatus: 0,
    };
    const id = "0";

    this.loading = true;
    try {
      const response = await lastValueFrom(this.gstEntryFormsService.processGst(data, "0"));
      if (response.code === 1) {
        await Swal.fire("Added!", response.message, "success");
        this.router.navigate(['/forms/gst']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      console.error('Error processing GST entry:', error);
      await Swal.fire("Failed!", "An unexpected error occurred. Please try again.", "error");
    } finally {
      this.loading = false;
    }
  }

  onReset(): void {
    this.customStylesValidated = false;
    this.gstEntryForm.reset();
    // Reset to default values
    this.gstEntryForm.patchValue({
      gstRegistered: true
    });
    this.resetGstFields();
  }
}
