import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgStyle, CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { IndustryAumEntryService } from '../../../common-service/industry-aum-entry/industry-aum-entry.service'
import { modeCommonInterface } from '../../../interfaces/interfaces'
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-industry-aum-entry',
  standalone: true,
  imports: [CommonModule, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, FormFloatingDirective, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './update-industry-aum-entry.component.html',
  styleUrl: './update-industry-aum-entry.component.scss'
})
export class UpdateIndustryAumEntryComponent implements OnInit {

  customStylesValidated = false;
  industryAumUpdateForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  aumId: string = "0";
  modes: modeCommonInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private industryAumEntryService: IndustryAumEntryService,
    private cdr: ChangeDetectorRef
  ) { 
    this.industryAumUpdateForm = this.fb.group({
      industryName: ['', Validators.required],
      industryAumDate: ['', Validators.required],
      industryAumAmount: ['', Validators.required],
      industryAumMode: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.loadModes();
      const params = await new Promise<{id?: string}>(resolve => 
        this.route.params.subscribe(params => resolve(params))
      );
      this.aumId = params.id || '0';
      await this.loadIndustryAumData();
    } catch (error) {
      console.error('Error initializing component:', error);
      await Swal.fire('Error', 'Failed to initialize the component', 'error');
    }
  }

  get f() { return this.industryAumUpdateForm.controls; }

  async loadModes(): Promise<void> {
    try {
      const response = await this.industryAumEntryService.getMode();
      this.modes = response.data;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading Modes:', error);
      await Swal.fire('Error', 'Failed to load Mode data', 'error');
    }
  }

  async loadIndustryAumData(): Promise<void> {
    try {
      const response = await this.industryAumEntryService.getAumById(this.aumId.toString()).toPromise();

      if (response && response.code === 1 && response.data) {
        const aumData = response.data;

        const modeId = this.modes.find(mode => mode.modeName === aumData.industryAumMode)?.id;

        this.industryAumUpdateForm.patchValue({
          industryName: aumData.industryName,
          industryAumDate: aumData.industryAumDate,
          industryAumAmount: aumData.industryAumAmount,
          industryAumMode: modeId
        });
        this.cdr.detectChanges();
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

    if (this.industryAumUpdateForm.invalid) {
      const missingFields = this.getMissingFields();
      await Swal.fire({
        title: 'Missing Required Fields',
        html: `Please fill in the following required fields:<br>${missingFields.join('<br>')}`,
        icon: 'error'
      });
      return;
    }
    
    const formData = this.industryAumUpdateForm.value;

    const data = {
      industryName: formData.industryName,
      industryAumDate: formData.industryAumDate,
      industryAumAmount: formData.industryAumAmount,
      industryAumMode: formData.industryAumMode,
      hideStatus: 0,
    };
    
    this.loading = true;
    try {
      const response = await lastValueFrom(this.industryAumEntryService.processIndustryAumEntry(data, this.aumId));
      if (response.code === 1) {
        await Swal.fire("Updated!", response.message, "success");
        this.router.navigate(['/forms/industryAum']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      console.error('Error updating Industry AUM entry:', error);
      await Swal.fire("Failed!", error instanceof Error ? error.message : "An unknown error occurred", "error");
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

  onCancel(): void {
    this.customStylesValidated = false;
    this.router.navigate(['/forms/industryAum']);
  }
}