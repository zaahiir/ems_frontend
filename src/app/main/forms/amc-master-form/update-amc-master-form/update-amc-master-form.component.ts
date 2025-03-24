import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgStyle } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormFloatingDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { AmcMasterFormService } from '../../../common-service/amc-master-form/amc-master-form.service'
import { stateCommonInterface, amcMasterCommonInterface, gstTypeCommonInterface } from '../../../interfaces/interfaces'
import Swal from 'sweetalert2';

interface Country {
  id: number;
  code: string;
  name: string;
  dial_code: string;
}

@Component({
  selector: 'app-update-amc-master-form',
  standalone: true,
  imports: [CommonModule, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, FormFloatingDirective, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './update-amc-master-form.component.html',
  styleUrl: './update-amc-master-form.component.scss'
})
export class UpdateAmcMasterFormComponent implements OnInit {

  customStylesValidated = false;
  amcForm: FormGroup;
  countries: Country[] = [];
  defaultCountry: Country = {
    id: 1,
    code: 'IN',
    name: 'India',
    dial_code: '+91'
  };
  states: stateCommonInterface[] = [];
  gstTypes: gstTypeCommonInterface[] = [];  
  amcId: string = "0";
  loading: boolean = false;
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private amcService: AmcMasterFormService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.amcForm = this.fb.group({
      amcName: ['', Validators.required],
      amcAddress: ['', Validators.required],
      amcState: ['', Validators.required],
      amcCountry: [{ value: '', disabled: true }, Validators.required],
      amcPinCode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      amcGstNo: ['', [Validators.required, Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')]],
      amcGstType: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> { 
    try {
      await Promise.all([
        this.loadCountries(),
        this.loadGstTypes(),
        this.loadStates()
      ]);

      this.route.params.subscribe(async params => {
        this.amcId = params['id'] || '0';
        await this.loadAmcData(this.amcId);
      });
    } catch (error) {
      console.error('Error during initialization:', error);
      await this.showError('An error occurred during initialization.');
    }
  }

  get f() { return this.amcForm.controls; }

  async loadCountries(): Promise<void> {
    try {
      const response = await this.amcService.getCountries();
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
      const response = await this.amcService.getStates();
      this.states = response.data;
    } catch (error) {
      console.error('Error loading states:', error);
      throw error;
    }
  }

  async loadGstTypes(): Promise<void> {
    try {
      const response = await this.amcService.getGstTypes();
      this.gstTypes = response.data;
    } catch (error) {
      console.error('Error loading GST types:', error);
      throw error;
    }
  }

  async loadAmcData(amcId: string): Promise<void> {
    try {
      const response = await this.amcService.listsAmc(amcId);
      if (response.data.code === 1 && response.data.data.length > 0) {
        const amcData: amcMasterCommonInterface = response.data.data[0];
        
        // Find the corresponding GST Type ID, or use null if not found
        const gstTypeId = this.gstTypes.find(gt => gt.gstTypeName === amcData.amcGstType)?.id || null;
  
        // Handle amcState correctly
        let stateValue: number | null = null;
        if (typeof amcData.amcState === 'object' && amcData.amcState !== null) {
          stateValue = amcData.amcState.id;
        } else if (typeof amcData.amcState === 'number') {
          stateValue = amcData.amcState;
        }
  
        // Convert amcCountry to number if it's a string
        const countryId = typeof amcData.amcCountry === 'string' ? parseInt(amcData.amcCountry, 10) : amcData.amcCountry;
        const country = this.countries.find(c => c.id === countryId);
  
        this.amcForm.patchValue({
          amcName: amcData.amcName || '',
          amcAddress: amcData.amcAddress || '',
          amcState: stateValue,
          amcCountry: country ? country.name : this.defaultCountry.name,
          amcPinCode: amcData.amcPinCode || '',
          amcGstNo: amcData.amcGstNo || '',
          amcGstType: gstTypeId
        });
  
        // Disable the country field
        this.amcForm.get('amcCountry')?.disable();
  
        console.log('Loaded AMC data:', amcData);
        console.log('Form values after patch:', this.amcForm.value);
      }
    } catch (error) {
      console.error('Error loading AMC data:', error);
      throw error;
    }
  }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;

    if (this.amcForm.invalid) {
      let errorMessage = '';
      
      if (this.f['amcPinCode'].errors?.['pattern']) {
        errorMessage += 'PIN code must be 6 digits.\n';
      }
      
      if (this.f['amcGstNo'].errors?.['pattern']) {
        errorMessage += 'GST number is invalid. It should be in the format: 22AAAAA0000A1Z5\n';
      }

      if (errorMessage) {
        await this.showError(errorMessage);
      }

      Object.keys(this.amcForm.controls).forEach(key => {
        const control = this.amcForm.get(key);
        if (control && control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    this.loading = true;

    const formValue = this.amcForm.value;

    const country = this.countries.find(c => c.name === formValue.amcCountry);

    const data = {
      ...formValue,
      amcCountry: country ? country.id : this.defaultCountry.id,
      hideStatus: 0
    };

    console.log('Data being sent:', data);

    try {
      const response = await this.amcService.processAmc(data, this.amcId);
      if (response.data['code'] === 1) {
        await Swal.fire("Updated!", response.data['message'], "success");
        this.router.navigate(['/forms/amc']);
      } else {
        let errorMessage = '';
        if (response.data['error']) {
          const errors = response.data['error'];
          if (errors.amcName) {
            errorMessage += `AMC Name: ${errors.amcName[0]}\n`;
          }
          if (errors.amcGstNo) {
            errorMessage += `AMC GST Number: ${errors.amcGstNo[0]}\n`;
          }
        }
        if (errorMessage) {
          await this.showError(errorMessage);
        } else {
          await this.showError(response.data['message']);
        }
      }
    } catch (error) {
      console.error('Error updating AMC:', error);
      await this.showError("An error occurred while updating the AMC.");
    } finally {
      this.loading = false;
    }
  }

  onCancel(): void {
    this.router.navigate(['/forms/amc']);
  }

  private async showError(message: string): Promise<void> {
    await Swal.fire("Failed!", message, "error");
  }
}