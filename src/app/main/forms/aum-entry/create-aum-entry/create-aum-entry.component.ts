import { Component, OnInit } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { AumEntryService } from '../../../common-service/aum-entry/aum-entry.service'
import { amcMasterCommonInterface, arnMasterCommonInterface } from '../../../interfaces/interfaces'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-aum-entry',
  standalone: true,
  imports: [NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormFloatingDirective, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './create-aum-entry.component.html',
  styleUrl: './create-aum-entry.component.scss'
})
export class CreateAumEntryComponent implements OnInit {

  customStylesValidated = false;
  aumEntryForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  arn: arnMasterCommonInterface[] = [];  
  amc: amcMasterCommonInterface[] = [];  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aumEntryService: AumEntryService,
  ) { 
    this.aumEntryForm = this.fb.group({
      aumArnNumber: ['', Validators.required],
      aumAmcName: ['', Validators.required],
      aumInvoiceNumber: ['', Validators.required],
      aumAmount: ['', [Validators.required, Validators.min(0)]],
      aumMonth: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}$/)]]
    });
  }

  async ngOnInit(): Promise<void> { 
    try {
      await Promise.all([this.loadArn(), this.loadAmc()]);
    } catch (error) {
      console.error('Error initializing component:', error);
      await Swal.fire('Error', 'Failed to initialize the form. Please try again.', 'error');
    }
  }

  get f() { return this.aumEntryForm.controls; }

  async loadArn(): Promise<void> {
    try {
      const response = await this.aumEntryService.getArn();
      this.arn = response.data;
    } catch (error) {
      console.error('Error loading ARN:', error);
      throw error;
    }
  }

  async loadAmc(): Promise<void> {
    try {
      const response = await this.aumEntryService.getAmc();
      this.amc = response.data;
    } catch (error) {
      console.error('Error loading AMC:', error);
      throw error;
    }
  }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;

    if (this.aumEntryForm.invalid) {
      const missingFields = Object.keys(this.aumEntryForm.controls)
        .filter(key => this.aumEntryForm.get(key)?.invalid)
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

      Object.keys(this.aumEntryForm.controls).forEach(key => {
        const control = this.aumEntryForm.get(key);
        if (control && control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    if (this.loading) return; // Prevent multiple submissions
    this.loading = true;

    const formattedMonth = this.f['aumMonth'].value;

    const data = {
      aumArnNumber: this.f['aumArnNumber'].value,
      aumAmcName: this.f['aumAmcName'].value,
      aumInvoiceNumber: this.f['aumInvoiceNumber'].value,
      aumAmount: this.f['aumAmount'].value,
      aumMonth: formattedMonth,
      hideStatus: 0,
    };

    try {
      const response = await lastValueFrom(this.aumEntryService.processAum(data, "0"));
      if (response.code === 1) {
        await Swal.fire("Added!", response.message, "success");
        this.router.navigate(['/forms/aum']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      console.error('Error processing AUM:', error);
      await Swal.fire("Failed!", "An error occurred while processing the AUM entry.", "error");
    } finally {
      this.loading = false;
    }
  }

  onReset(): void {
    this.customStylesValidated = false;
    this.submitted = false;
    this.aumEntryForm.reset();
  }
}