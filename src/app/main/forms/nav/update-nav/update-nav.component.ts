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
  isEditMode = false;
  loadingNavData = false;
  previousAmcId: string = '';

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
      navFundName: [{ value: '', disabled: true }, Validators.required],
      nav: ['', [Validators.required, Validators.min(0)]],
      navDate: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      // Load AMCs first
      await this.loadAmcs();

      // Get route params and determine mode
      this.route.params.subscribe(async params => {
        this.navId = params['id'] || '0';
        this.isEditMode = this.navId !== '0';

        console.log('Route params:', params);
        console.log('Nav ID:', this.navId);
        console.log('Edit mode:', this.isEditMode);

        if (this.isEditMode) {
          await this.loadNavUpdateData();
        } else {
          // For new entries, set up AMC change listener immediately
          this.setupAmcChangeListener();
        }
      });
    } catch (error) {
      console.error('Error during initialization:', error);
      await Swal.fire('Error', 'Failed to initialize the form', 'error');
    }
  }

  private setupAmcChangeListener(): void {
    this.navUpdateForm.get('navAmcName')?.valueChanges.subscribe(async amcId => {
      console.log('AMC changed to:', amcId);

      if (amcId) {
        // Store previous AMC ID for potential rollback
        if (this.isEditMode && this.previousAmcId && this.previousAmcId !== amcId) {
          const result = await this.showAmcChangeNotification();
          if (!result) {
            // User cancelled, restore previous AMC selection
            this.navUpdateForm.get('navAmcName')?.setValue(this.previousAmcId, { emitEvent: false });
            return;
          }
        }

        // Clear the fund selection when AMC changes
        this.navUpdateForm.get('navFundName')?.setValue('');
        this.updateFundOptions(Number(amcId));

        // Update previous AMC ID
        this.previousAmcId = amcId;
      } else {
        this.funds = [];
        this.navUpdateForm.get('navFundName')?.disable();
        this.navUpdateForm.get('navFundName')?.setValue('');
        this.previousAmcId = '';
      }
    });
  }

  private async showAmcChangeNotification(): Promise<boolean> {
    if (this.isEditMode) {
      const result = await Swal.fire({
        title: 'AMC Changed',
        text: 'You have changed the AMC. Please select the appropriate fund for this AMC.',
        icon: 'info',
        confirmButtonText: 'OK, I will select a fund',
        showCancelButton: true,
        cancelButtonText: 'Cancel change',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      });

      return result.isConfirmed;
    }
    return true;
  }

  get f() { return this.navUpdateForm.controls; }

  async loadNavUpdateData(): Promise<void> {
    if (this.navId === '0') return;

    this.loadingNavData = true;
    try {
      console.log('Loading NAV data for ID:', this.navId);
      const response = await this.navService.getNavUpdateData(this.navId);

      console.log('Full API response:', response);

      if (response && response.data) {
        let navData;

        // Handle different response structures
        if (response.data.code === 1 && response.data.data) {
          navData = response.data.data;
        } else if (response.data.navId) {
          navData = response.data;
        } else {
          throw new Error('Invalid response structure');
        }

        console.log('Extracted NAV data:', navData);

        // Validate required fields
        if (!navData.amcId || !navData.fundId) {
          throw new Error('Missing required AMC or Fund ID in response');
        }

        // Store the original AMC ID
        this.previousAmcId = navData.amcId.toString();

        // Load funds for this AMC first
        console.log('Loading funds for AMC ID:', navData.amcId);
        this.loadingFunds = true;

        try {
          this.funds = await this.navService.getFundsByAmc(navData.amcId.toString());
          console.log('Loaded funds:', this.funds);

          // Enable fund dropdown
          this.navUpdateForm.get('navFundName')?.enable();

          // Set form values - Convert IDs to strings for select elements
          this.navUpdateForm.patchValue({
            navAmcName: navData.amcId.toString(),
            navFundName: navData.fundId.toString(),
            nav: navData.nav,
            navDate: navData.navDate
          });

          console.log('Form values after patch:', this.navUpdateForm.value);
          console.log('Form controls status:', {
            navAmcName: this.navUpdateForm.get('navAmcName')?.value,
            navFundName: this.navUpdateForm.get('navFundName')?.value,
            nav: this.navUpdateForm.get('nav')?.value,
            navDate: this.navUpdateForm.get('navDate')?.value
          });

          // Set up change listener after data is loaded
          this.setupAmcChangeListener();

        } catch (fundError) {
          console.error('Error loading funds:', fundError);
          await Swal.fire('Error', 'Failed to load funds for the selected AMC', 'error');
        } finally {
          this.loadingFunds = false;
        }

        this.cdr.detectChanges();

      } else {
        throw new Error('Invalid API response');
      }
    } catch (error) {
      console.error('Error loading NAV update data:', error);
      await Swal.fire('Error', 'Failed to load NAV data', 'error');
    } finally {
      this.loadingNavData = false;
    }
  }

  async updateFundOptions(amcId: number): Promise<void> {
    this.loadingFunds = true;
    try {
      console.log('Updating fund options for AMC ID:', amcId);
      this.funds = await this.navService.getFundsByAmc(amcId.toString());
      console.log('Loaded funds:', this.funds);

      this.navUpdateForm.get('navFundName')?.enable();

      // Only auto-select the first fund if we're in new mode (not edit mode)
      if (!this.isEditMode && this.funds.length > 0) {
        this.navUpdateForm.get('navFundName')?.setValue(this.funds[0].id.toString());
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

      // Handle different response structures for AMCs
      if (response && response.data) {
        if (Array.isArray(response.data)) {
          this.amcs = response.data;
        } else if (response.data.results && Array.isArray(response.data.results)) {
          // Handle paginated response structure with results array
          this.amcs = response.data.results;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          this.amcs = response.data.data;
        } else {
          console.error('AMC data is not an array:', response.data);
          this.amcs = [];
        }
      } else {
        this.amcs = [];
      }

      console.log('AMCs loaded:', this.amcs);
    } catch (error) {
      console.error('Error loading AMCs:', error);
      this.amcs = []; // Ensure it's always an array
      throw error;
    }
  }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;

    // Check if AMC is selected but fund is not selected
    const amcValue = this.navUpdateForm.get('navAmcName')?.value;
    const fundValue = this.navUpdateForm.get('navFundName')?.value;

    if (amcValue && !fundValue) {
      await Swal.fire({
        title: 'Fund Selection Required',
        text: 'Please select a fund for the chosen AMC.',
        icon: 'warning',
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    if (this.navUpdateForm.invalid) {
      const missingFields = this.getMissingFields();
      if (missingFields.length > 0) {
        await Swal.fire({
          title: 'Missing Required Fields',
          html: `Please fill in the following required fields:<br><br>${missingFields.join('<br>')}`,
          icon: 'error',
          confirmButtonColor: '#d33'
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

  private checkFundSelection(): boolean {
    const amcValue = this.navUpdateForm.get('navAmcName')?.value;
    const fundValue = this.navUpdateForm.get('navFundName')?.value;

    return !(amcValue && !fundValue && this.funds.length > 0);
  }

  onCancel(): void {
    this.customStylesValidated = false;
    this.router.navigate(['/forms/nav']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
