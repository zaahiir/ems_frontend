import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgStyle, CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, SpinnerComponent } from '@coreui/angular';
import { NavService } from '../../../common-service/nav/nav.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-update-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, FormFloatingDirective, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle, SpinnerComponent],
  templateUrl: './update-nav.component.html',
  styleUrl: './update-nav.component.scss'
})
export class UpdateNavComponent implements OnInit {
  customStylesValidated = false;
  navUpdateForm: FormGroup;
  loading = false;
  submitted = false;
  navId = '0';
  amcs: any[] = [];
  funds: any[] = [];
  loadingFunds = false; 

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private navService: NavService,
    private cdr: ChangeDetectorRef
  ) {
    this.navUpdateForm = this.fb.group({
      navAmcName: ['', Validators.required],
      navFundName: ['', Validators.required],
      nav: ['', [Validators.required, Validators.min(0)]],
      navDate: ['', Validators.required]
    });
  }
  
  async ngOnInit(): Promise<void> {
    try {
      await this.loadAmcs();
      
      // Subscribe to AMC changes before loading data
      this.navUpdateForm.get('navAmcName')?.valueChanges.subscribe(amcId => {
        if (amcId) {
          this.updateFundOptions(Number(amcId));
        } else {
          this.funds = [];
          this.navUpdateForm.get('navFundName')?.disable();
          this.navUpdateForm.get('navFundName')?.setValue('');
        }
      });
      
      // Then load the route params and nav data
      this.route.params.subscribe(params => {
        this.navId = params['id'] || '0';
        this.loadNavUpdateData();
      });
    } catch (error) {
      console.error('Error during initialization:', error);
      await Swal.fire('Error', 'Failed to initialize the form', 'error');
    }
  }

  get f() { return this.navUpdateForm.controls; }

  async loadNavUpdateData(): Promise<void> {
    if (this.navId !== '0') {
      try {
        const response = await this.navService.getNavUpdateData(this.navId);
        if (response && response.data && response.data.code === 1) {
          const navData = response.data.data;
          
          // First set AMC value without triggering valueChanges
          this.navUpdateForm.get('navAmcName')?.setValue(navData.amcId, { emitEvent: false });
          
          // Then load the funds for this AMC
          this.loadingFunds = true;
          await this.updateFundOptions(navData.amcId);
          this.loadingFunds = false;
          
          // Now that funds are loaded, set the fund value and other form values
          this.navUpdateForm.patchValue({
            navFundName: navData.fundId,
            nav: navData.nav,
            navDate: navData.navDate
          });
          
          this.cdr.detectChanges();
        } else {
          await Swal.fire('Error', 'Failed to load NAV data', 'error');
        }
      } catch (error) {
        console.error('Error loading NAV update data:', error);
        await Swal.fire('Error', 'Failed to load NAV data', 'error');
      }
    }
  }

  async updateFundOptions(amcId: number): Promise<void> {
    this.loadingFunds = true;
    try {
      this.funds = await this.navService.getFundsByAmc(amcId.toString());
      this.navUpdateForm.get('navFundName')?.enable();
      if (this.funds.length > 0) {
        this.navUpdateForm.get('navFundName')?.setValue(this.funds[0].id);
      }
    } catch (error) {
      console.error('Error fetching funds:', error);
      await Swal.fire('Error', 'An error occurred while fetching funds', 'error');
    } finally {
      this.loadingFunds = false;
      this.cdr.detectChanges();
    }
  }

  async loadAmcs(): Promise<void> {
    try {
      const response = await this.navService.getAmc();
      this.amcs = response.data;
    } catch (error) {
      console.error('Error loading AMCs:', error);
      throw error;
    }
  }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;

    if (this.navUpdateForm.invalid) {
      const missingFields = this.getMissingFields();
      if (missingFields.length > 0) {
        await Swal.fire({
          title: 'Missing Required Fields',
          html: `Please fill in the following required fields:<br><br>${missingFields.join('<br>')}`,
          icon: 'error'
        });
      }
      return;
    }

    const formData = this.navUpdateForm.getRawValue();
    
    const data = {
      navDate: formData.navDate,
      nav: formData.nav,
      navFundName: formData.navFundName,
      navAmcName: formData.navAmcName
    };

    this.loading = true;

    try {
      const response = await this.navService.updateNav(data, this.navId).toPromise();
      
      if (response && response.data && response.data['code'] === 1) {
        await Swal.fire('Updated!', response.data['message'], 'success');
        this.router.navigate(['/forms/nav']);
      } else {
        await Swal.fire('Failed!', response?.data?.['message'] || 'Unknown error occurred', 'error');
      }
    } catch (error) {
      console.error('Error updating NAV:', error);
      await Swal.fire('Failed!', 'An error occurred while updating the NAV entry.', 'error');
    } finally {
      this.loading = false;
    }
  }

  private getMissingFields(): string[] {
    const missingFields: string[] = [];
    const controls = this.navUpdateForm.controls;

    if (controls['navAmcName'].invalid) missingFields.push('AMC Name');
    if (controls['navFundName'].invalid) missingFields.push('Fund Name');
    if (controls['nav'].invalid) missingFields.push('NAV');
    if (controls['navDate'].invalid) missingFields.push('NAV Date');

    return missingFields;
  }

  onCancel(): void {
    this.customStylesValidated = false;
    this.router.navigate(['/forms/nav']);
  }
}