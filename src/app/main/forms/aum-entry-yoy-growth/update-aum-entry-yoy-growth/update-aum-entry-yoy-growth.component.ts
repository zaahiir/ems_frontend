import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgStyle, CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { AumEntryYoyGrowthService } from '../../../common-service/aum-entry-yoy-growth/aum-entry-yoy-growth.service'
import { amcMasterCommonInterface } from '../../../interfaces/interfaces'
import Swal from 'sweetalert2';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-update-aum-entry-yoy-growth',
  standalone: true,
  imports: [CommonModule, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, FormFloatingDirective, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './update-aum-entry-yoy-growth.component.html',
  styleUrl: './update-aum-entry-yoy-growth.component.scss'
})
export class UpdateAumEntryYoyGrowthComponent implements OnInit {

  customStylesValidated = false;
  aumYoyUpdateForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  aumId: string = "0";
  amcs: amcMasterCommonInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private aumEntryYoyGrowthService: AumEntryYoyGrowthService,
    private cdr: ChangeDetectorRef
  ) { 
    this.aumYoyUpdateForm = this.fb.group({
      aumYoyGrowthAmcName: ['', Validators.required],
      aumYoyGrowthAmount: ['', Validators.required],
      aumYoyGrowthDate: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.loadAmcs();
      this.route.params.subscribe(params => {
        this.aumId = params['id'] || '0';
        this.loadAumData();
      });
    } catch (error) {
      console.error('Error in ngOnInit:', error);
      await Swal.fire('Error', 'Failed to initialize the component', 'error');
    }
  }

  get f() { return this.aumYoyUpdateForm.controls; }

  async loadAmcs(): Promise<void> {
    try {
      const response = await this.aumEntryYoyGrowthService.getAmc();
      this.amcs = response.data;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading AMCs:', error);
      await Swal.fire('Error', 'Failed to load AMCs', 'error');
    }
  }

  async loadAumData(): Promise<void> {
    try {
      const response = await this.aumEntryYoyGrowthService.getAumYoyGrowthById(this.aumId.toString()).toPromise();

      if (response && response.code === 1 && response.data) {
        const aumData = response.data;

        const amcId = this.amcs.find(amc => amc.amcName === aumData.aumYoyGrowthAmcName)?.id;

        this.aumYoyUpdateForm.patchValue({
            aumYoyGrowthAmcName: amcId,
            aumYoyGrowthAmount: aumData.aumYoyGrowthAmount,
            aumYoyGrowthDate: aumData.aumYoyGrowthDate
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

    if (this.aumYoyUpdateForm.invalid) {
      const missingFields = Object.keys(this.aumYoyUpdateForm.controls)
        .filter(key => this.aumYoyUpdateForm.get(key)?.invalid)
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
    
    if (this.loading) return;
    this.loading = true;
    const formData = this.aumYoyUpdateForm.value;

    const data = {
      aumYoyGrowthAmcName: formData.aumYoyGrowthAmcName,
      aumYoyGrowthAmount: formData.aumYoyGrowthAmount,
      aumYoyGrowthDate: formData.aumYoyGrowthDate,
      hideStatus: 0,
    };
    
    try {
        const response = await lastValueFrom(this.aumEntryYoyGrowthService.processAumYoyGrowthEntry(data, this.aumId));
      if (response.code == 1) {
        await Swal.fire("Updated!", response.message, "success");
        this.router.navigate(['/forms/yoyGrowth']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      console.error('Error updating AUM YoY Growth:', error);
      await Swal.fire("Failed!", "An error occurred while updating", "error");
    } finally {
      this.loading = false;
    }
  }

  onCancel() {
    this.customStylesValidated = false;
    this.router.navigate(['/forms/yoyGrowth']);
  }
}