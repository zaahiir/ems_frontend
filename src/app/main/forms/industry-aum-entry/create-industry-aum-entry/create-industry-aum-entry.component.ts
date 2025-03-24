import { Component, OnInit } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { IndustryAumEntryService } from '../../../common-service/industry-aum-entry/industry-aum-entry.service'
import { modeCommonInterface } from '../../../interfaces/interfaces'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-industry-aum-entry',
  standalone: true,
  imports: [ NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, TextColorDirective, CardComponent, FormFloatingDirective, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './create-industry-aum-entry.component.html',
  styleUrl: './create-industry-aum-entry.component.scss'
})
export class CreateIndustryAumEntryComponent implements OnInit {

  customStylesValidated = false;
  industryAumEntryForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  mode: modeCommonInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private industryAumEntryService: IndustryAumEntryService,
  )  { 
    this.industryAumEntryForm = this.fb.group({
      industryName: ['', Validators.required],
      industryAumDate: ['', Validators.required],
      industryAumAmount: ['', Validators.required],
      industryAumMode: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> { 
    await this.loadMode(); 
  }

  get f() { return this.industryAumEntryForm.controls; }

  async loadMode(): Promise<void> {
    try {
      const response = await this.industryAumEntryService.getMode();
      this.mode = response.data;
    } catch (error) {
      console.error('Error loading AMC data:', error);
      await Swal.fire('Error', 'Failed to load AMC data', 'error');
    }
  }

  async onSubmit() {
    this.customStylesValidated = true;
    this.submitted = true;
  
    if (this.industryAumEntryForm.invalid) {
      const missingFields = this.getMissingFields();
      await Swal.fire({
        title: 'Missing Required Fields',
        html: `Please fill in the following required fields:<br>${missingFields.join('<br>')}`,
        icon: 'error'
      });
      return;
    }

    if (this.loading) return; // Prevent multiple submissions
    this.loading = true;
  
    const data = {
      industryName: this.f['industryName'].value,
      industryAumDate: this.f['industryAumDate'].value,
      industryAumAmount: this.f['industryAumAmount'].value,
      industryAumMode: this.f['industryAumMode'].value,
      hideStatus: 0,
    };
  
    const id = "0";
  
    try {
      const response = await lastValueFrom(this.industryAumEntryService.processIndustryAumEntry(data, "0"));
      
      if (response.code === 1) {
        await Swal.fire("Added!", response.message, "success");
        await this.router.navigate(['/forms/industryAum']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      console.error('Error processing industry AUM entry:', error);
      await Swal.fire("Failed!", "An unexpected error occurred. Please try again.", "error");
    } finally {
      this.loading = false;
    }
  }

  getMissingFields(): string[] {
    const missingFields: string[] = [];
    Object.keys(this.f).forEach(key => {
      const control = this.f[key];
      if (control.errors?.['required']) {
        missingFields.push(this.getFieldName(key));
      }
    });
    return missingFields;
  }

  getFieldName(key: string): string {
    const fieldNames: { [key: string]: string } = {
      industryName: 'Industry Name',
      industryAumDate: 'Industry AUM Date',
      industryAumAmount: 'Industry AUM Amount',
      industryAumMode: 'Industry AUM Mode'
    };
    return fieldNames[key] || key;
  }

  onReset() {
    this.customStylesValidated = false;
    console.log('Reset... 1');
  }
}