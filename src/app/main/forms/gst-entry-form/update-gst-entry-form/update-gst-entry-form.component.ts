import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { GstEntryFormsService } from '../../../common-service/gst-entry-forms/gst-entry-forms.service'
import { amcMasterCommonInterface, arnMasterCommonInterface, gstCommonInterface } from '../../../interfaces/interfaces'
import Swal from 'sweetalert2';
import { Subject, debounceTime, takeUntil, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-gst-entry-form',
  standalone: true,
  imports: [NgIf, CommonModule, NgClass, NgForOf, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, FormFloatingDirective, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './update-gst-entry-form.component.html',
  styleUrl: './update-gst-entry-form.component.scss'
})
export class UpdateGstEntryFormComponent implements OnInit, OnDestroy {

  customStylesValidated = false;
  gstUpdateForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  gstId: string = "0";

  amc: amcMasterCommonInterface[] = [];
  arn: arnMasterCommonInterface[] = [];

  private destroy$ = new Subject<void>();
  private calculateGst$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private gstEntryFormsService: GstEntryFormsService,
    private cdr: ChangeDetectorRef
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.gstUpdateForm = this.fb.group({
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
    try {
      await this.loadAumData();
      await this.loadArnData();
      const params = await new Promise<{id?: string}>(resolve =>
        this.route.params.subscribe(params => resolve(params))
      );
      this.gstId = params.id || '0';
      await this.loadGstData();
      this.setupFormValueChanges();
      this.setupGstCalculation();
    } catch (error) {
      console.error('Error initializing component:', error);
      await Swal.fire('Error', 'Failed to initialize the component', 'error');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get f() { return this.gstUpdateForm.controls; }

  private async loadAumData(): Promise<void> {
    try {
      const response = await this.gstEntryFormsService.getAmc();
      this.amc = response.data;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading AMCs:', error);
      await Swal.fire('Error', 'Failed to load AMC data', 'error');
    }
  }

  private async loadArnData(): Promise<void> {
    try {
      const response = await this.gstEntryFormsService.getArn();
      this.arn = response.data;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading ARNs:', error);
      await Swal.fire('Error', 'Failed to load ARN data', 'error');
    }
  }

  async loadGstData(): Promise<void> {
    try {
      const response = await this.gstEntryFormsService.getGstById(this.gstId.toString()).toPromise();
      if (response && response.code === 1 && response.data) {
        const gstData = response.data;
        const amcId = this.amc.find(amc => amc.amcName === gstData.gstAmcName)?.id;
        const arnId = this.arn.find(arn => arn.arnNumber === gstData.gstArnNumber)?.id;

        this.gstUpdateForm.patchValue({
          gstInvoiceDate: gstData.gstInvoiceDate,
          gstInvoiceNumber: gstData.gstInvoiceNumber,
          gstAmcName: amcId,
          gstArnNumber: arnId,
          gstRegistered: gstData.gstRegistered !== undefined ? gstData.gstRegistered : true,
          gstTotalValue: gstData.gstTotalValue,
          gstTaxableValue: gstData.gstTaxableValue,
          gstIGst: gstData.gstIGst,
          gstSGst: gstData.gstSGst,
          gstCGst: gstData.gstCGst
        });
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Error loading GST data:', error);
      await Swal.fire('Error', 'Failed to load GST data', 'error');
    }
  }

  private setupFormValueChanges(): void {
    this.gstUpdateForm.get('gstAmcName')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.calculateGst$.next());

    this.gstUpdateForm.get('gstTotalValue')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.calculateGst$.next());

    // Listen to GST registration status changes
    this.gstUpdateForm.get('gstRegistered')?.valueChanges
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

          this.gstUpdateForm.patchValue(updatedValues, { emitEvent: false });
        } else {
          // Not GST Registered - Total value equals taxable value, no GST
          const updatedValues = {
            gstTaxableValue: totalValue.toFixed(2),
            gstIGst: '0.00',
            gstSGst: '0.00',
            gstCGst: '0.00'
          };

          this.gstUpdateForm.patchValue(updatedValues, { emitEvent: false });
        }

        this.gstUpdateForm.updateValueAndValidity();
        this.cdr.detectChanges();
      }
    } else {
      this.resetGstFields();
    }
  }

  private resetGstFields(): void {
    this.gstUpdateForm.patchValue({
      gstTaxableValue: '',
      gstIGst: '',
      gstSGst: '',
      gstCGst: ''
    });
  }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;

    if (this.gstUpdateForm.invalid) {
      const invalidFields = Object.keys(this.gstUpdateForm.controls)
        .filter(key => this.gstUpdateForm.get(key)?.invalid)
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

    const formData = this.gstUpdateForm.getRawValue();
    const data = {
      ...formData,
      hideStatus: 0,
    };

    this.loading = true;
    try {
      const response = await lastValueFrom(this.gstEntryFormsService.processGst(data, this.gstId));
      if (response.code === 1) {
        await Swal.fire("Updated!", response.message, "success");
        this.router.navigate(['/forms/gst']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      console.error('Error updating GST entry:', error);
      await Swal.fire("Failed!", error instanceof Error ? error.message : "An unknown error occurred", "error");
    } finally {
      this.loading = false;
    }
  }

  onCancel(): void {
    this.customStylesValidated = false;
    this.router.navigate(['/forms/gst']);
  }
}
