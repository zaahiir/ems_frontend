import { Component, OnInit } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { ArnMasterFormService } from '../../../common-service/arn-master-form/arn-master-form.service';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

interface Country {
  id: number;
  code: string;
  name: string;
  dial_code: string;
}

@Component({
  selector: 'app-update-arn-master-form',
  standalone: true,
  imports: [
    NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, TextColorDirective, CardComponent, FormFloatingDirective, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle
  ],
  templateUrl: './update-arn-master-form.component.html',
  styleUrl: './update-arn-master-form.component.scss'
})
export class UpdateArnMasterFormComponent implements OnInit {

  customStylesValidated = false;
  arnEntryForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  states: any[] = [];
  countries: Country[] = [];
  defaultCountry: Country = {
    id: 1,
    code: 'IN',
    name: 'India',
    dial_code: '+91'
  };

  arnId: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private arnMasterFormService: ArnMasterFormService,
  ) {
    this.arnEntryForm = this.fb.group({
      arnNumber: ['', Validators.required],
      arnName: ['', Validators.required],
      arnCountryCode: [{ value: '', disabled: true }, Validators.required],
      arnMobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      arnAddress: ['', Validators.required],
      arnCountry: [{ value: '', disabled: true }, Validators.required],
      arnPinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      arnEmail: ['', [Validators.required, Validators.email]],
      arnEuin: ['', Validators.required],
      arnGstNo: ['', [Validators.required, Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')]],
      arnState: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.loadStates();
      await this.loadCountries();
      
      this.route.params.subscribe(params => {
        this.arnId = params['id'];
        this.loadArnData(this.arnId);
      });
    } catch (error) {
      console.error('Error during initialization:', error);
      await this.showError('An error occurred during initialization.');
    }
  }

  get f() { return this.arnEntryForm.controls; }

  async loadCountries(): Promise<void> {
    try {
      const response = await this.arnMasterFormService.getCountries();
      this.countries = response.data;
      
      const indiaCountry = this.countries.find(country => country.code === 'IN');
      if (indiaCountry) {
        this.defaultCountry = indiaCountry;
      }
    } catch (error) {
      console.error('Error loading countries:', error);
      throw error;
    }
  }

  async loadStates(): Promise<void> {
    try {
      const response = await this.arnMasterFormService.getStates();
      this.states = response.data;
    } catch (error) {
      console.error('Error loading states:', error);
      throw error;
    }
  }

  async loadArnData(arnId: string): Promise<void> {
    try {
      const response = await this.arnMasterFormService.listsArn(arnId);
      if (response.data.code === 1 && response.data.data.length > 0) {
        const arnData = response.data.data[0];
        
        const country = this.countries.find(c => c.id === arnData.arnCountry);
        
        this.arnEntryForm.patchValue({
          ...arnData,
          arnState: typeof arnData.arnState === 'object' ? arnData.arnState.id : arnData.arnState,
          arnCountry: country ? country.name : this.defaultCountry.name,
          arnCountryCode: country ? country.dial_code : this.defaultCountry.dial_code
        });
      }
    } catch (error) {
      console.error('Error loading ARN data:', error);
      await this.showError('Failed to load ARN data.');
    }
  }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;

    if (this.arnEntryForm.invalid) {
      let errorMessage = '';
      
      if (this.f['arnPinCode'].errors?.['pattern']) {
        errorMessage += 'PIN code must be 6 digits.\n';
      }
      
      if (this.f['arnGstNo'].errors?.['pattern']) {
        errorMessage += 'GST number is invalid. It should be in the format: 22AAAAA0000A1Z5\n';
      }
      
      if (this.f['arnMobile'].errors?.['pattern']) {
        errorMessage += 'Mobile number must be 10 digits.\n';
      }

      if (errorMessage) {
        await this.showError(errorMessage);
      }

      Object.values(this.arnEntryForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }
    
    this.loading = true;

    const formData = this.arnEntryForm.getRawValue();

    const country = this.countries.find(c => c.name === formData.arnCountry);

    const data = {
      ...formData,
      arnCountryCode: country ? country.id : this.defaultCountry.id,
      arnCountry: country ? country.id : this.defaultCountry.id,
      hideStatus: 0
    };

    try {
      const response = await this.arnMasterFormService.processArn(data, this.arnId);
      if (response.data['code'] === 1) {
        await Swal.fire("Updated!", response.data['message'], "success");
        this.router.navigate(['/forms/arn']);
      } else {
        let errorMessage = '';
        if (response.data['error']) {
          const errors = response.data['error'];
          if (errors.arnEmail) {
            errorMessage += `ARN Email: ${errors.arnEmail[0]}\n`;
          }
          if (errors.arnNumber) {
            errorMessage += `ARN Number: ${errors.arnNumber[0]}\n`;
          }
          if (errors.arnGstNo) {
            errorMessage += `ARN GST Number: ${errors.arnGstNo[0]}\n`;
          }
        }
        if (errorMessage) {
          await this.showError(errorMessage);
        } else {
          await this.showError(response.data['message']);
        }
      }
    } catch (error) {
      console.error('Error updating ARN:', error);
      await this.showError("An error occurred while updating the ARN.");
    } finally {
      this.loading = false;
    }
  }

  onCancel(): void {
    this.router.navigate(['/forms/arn']);
  }

  private async showError(message: string): Promise<void> {
    await Swal.fire("Failed!", message, "error");
  }
}