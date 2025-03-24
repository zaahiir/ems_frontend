import { Component, OnInit } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { AumEntryYoyGrowthService } from '../../../common-service/aum-entry-yoy-growth/aum-entry-yoy-growth.service'
import { amcMasterCommonInterface } from '../../../interfaces/interfaces'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-aum-entry-yoy-growth',
  standalone: true,
  imports: [ NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, TextColorDirective, CardComponent, FormFloatingDirective, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './create-aum-entry-yoy-growth.component.html',
  styleUrl: './create-aum-entry-yoy-growth.component.scss'
})
export class CreateAumEntryYoyGrowthComponent implements OnInit {

  customStylesValidated = false;
  aumYoyGrowthEntryForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  amc: amcMasterCommonInterface[] = [];  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private aumEntryYoyGrowthService: AumEntryYoyGrowthService,
  ) { 
    this.aumYoyGrowthEntryForm = this.fb.group({
      aumYoyGrowthAmcName: ['', Validators.required],
      aumYoyGrowthAmount: ['', [Validators.required, Validators.min(0)]],
      aumYoyGrowthDate: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.loadAmcData();
    } catch (error) {
      console.error('Error initializing component:', error);
      await Swal.fire('Error', 'Failed to load AMC data. Please try again.', 'error');
    }
  }

  get f() { return this.aumYoyGrowthEntryForm.controls; }

  async loadAmcData(): Promise<void> {
    try {
      const response = await this.aumEntryYoyGrowthService.getAmc();
      this.amc = response.data;
    } catch (error) {
      console.error('Error loading AMC data:', error);
      throw error;
    }
  }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;

    if (this.aumYoyGrowthEntryForm.invalid) {
      const missingFields = Object.keys(this.aumYoyGrowthEntryForm.controls)
        .filter(key => this.aumYoyGrowthEntryForm.get(key)?.invalid)
        .map(key => {
          switch(key) {
            case 'aumYoyGrowthAmcName':
              return 'AMC Name';
            case 'aumYoyGrowthAmount':
              return 'AUM YoY Growth Amount';
            case 'aumYoyGrowthDate':
              return 'AUM YoY Growth Date';
            default:
              return key;
          }
        });

      await Swal.fire({
        title: 'Required Fields Missing',
        html: `Please fill in the following required fields:<br>${missingFields.join('<br>')}`,
        icon: 'error'
      });
      return;
    }

    if (this.loading) return; // Prevent multiple submissions
    this.loading = true;

    const data = {
      aumYoyGrowthAmcName: this.f['aumYoyGrowthAmcName'].value,
      aumYoyGrowthAmount: this.f['aumYoyGrowthAmount'].value,
      aumYoyGrowthDate: this.f['aumYoyGrowthDate'].value,
      hideStatus: 0,
    };

    try {
      const response = await lastValueFrom(this.aumEntryYoyGrowthService.processAumYoyGrowthEntry(data, "0"));
      if (response.code === 1) {
        await Swal.fire("Added!", response.message, "success");
        this.router.navigate(['/forms/yoyGrowth']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      console.error('Error processing AUM YoY Growth entry:', error);
      await Swal.fire("Failed!", "An error occurred while processing the entry.", "error");
    } finally {
      this.loading = false;
    }
  }

  onReset(): void {
    this.customStylesValidated = false;
    this.submitted = false;
    this.aumYoyGrowthEntryForm.reset();
  }
}