import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgStyle, CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { StatementService } from '../../../common-service/statement/statement.service'
import { amcMasterCommonInterface, statementCommonInterface } from '../../../interfaces/interfaces'
import Swal from 'sweetalert2';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Subject, debounceTime, takeUntil } from 'rxjs';

@Component({
  selector: 'app-update-statement',
  standalone: true,
  imports: [CommonModule, RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, FormFloatingDirective, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './update-statement.component.html',
  styleUrl: './update-statement.component.scss'
})
export class UpdateStatementComponent implements OnInit {

  customStylesValidated = false;
  statementUpdateForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  statementId: string = "0";
  amcs: amcMasterCommonInterface[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private statementService: StatementService,
    private cdr: ChangeDetectorRef
  ) { 
    this.statementUpdateForm = this.fb.group({
      statementDate: ['', Validators.required],
      statementInvestorName: ['', Validators.required],
      statementInvestorPanNo: ['', Validators.required],
      statementInvestmentDate: ['', Validators.required],
      statementAmcName: ['', Validators.required],
      statementFundName: ['', Validators.required],
      statementCostOfInvestment: ['', Validators.required],
      statementCurrentValue: ['', Validators.required],
      statementSipDate: ['', Validators.required],
      statementSipAmount: ['', Validators.required],
      statementSwpAmount: ['', Validators.required],
      statementSipBankName: ['', Validators.required],
      statementSipBankAccountType: ['', Validators.required],
      statementSipBankAccountLastFourDigit: ['', Validators.required],
      statementPrimaryBankName: ['', Validators.required],
      statementPrimaryBankAccountType: ['', Validators.required],
      statementPrimaryBankAccountLastFourDigit: ['', Validators.required]
    });
  }

  async ngOnInit(): Promise<void> {
    try {
      await this.loadAmcs();
      const params = await firstValueFrom(this.route.params);
      this.statementId = params['id'] || '0';
      await this.loadStatementData();
    } catch (error) {
      console.error('Error initializing component:', error);
    }
  }

  get f() { return this.statementUpdateForm.controls; }

  async loadAmcs(): Promise<void> {
    try {
      const response = await this.statementService.getAmc();
      this.amcs = response.data;
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error loading AMCs:', error);
    }
  }

  async loadStatementData(): Promise<void> {
    try {
      const response = await this.statementService.getStatementById(this.statementId.toString()).toPromise();
      if (response && response.code === 1 && response.data) {
        const statementData = response.data;
        const amcId = this.amcs.find(amc => amc.amcName === statementData.statementAmcName)?.id;
        
        this.statementUpdateForm.patchValue({
          statementDate: statementData.statementDate,
          statementInvestorName: statementData.statementInvestorName,
          statementInvestorPanNo: statementData.statementInvestorPanNo,
          statementInvestmentDate: statementData.statementInvestmentDate,
          statementAmcName: amcId,
          statementFundName: statementData.statementFundName,
          statementCostOfInvestment: statementData.statementCostOfInvestment,
          statementCurrentValue: statementData.statementCurrentValue,
          statementSipDate: statementData.statementSipDate,
          statementSipAmount: statementData.statementSipAmount,
          statementSwpAmount: statementData.statementSwpAmount,
          statementSipBankName: statementData.statementSipBankName,
          statementSipBankAccountType: statementData.statementSipBankAccountType,
          statementSipBankAccountLastFourDigit: statementData.statementSipBankAccountLastFourDigit,
          statementPrimaryBankName: statementData.statementPrimaryBankName,
          statementPrimaryBankAccountType: statementData.statementPrimaryBankAccountType,
          statementPrimaryBankAccountLastFourDigit: statementData.statementPrimaryBankAccountLastFourDigit
        });
        this.cdr.detectChanges();
      }
    } catch (error) {
      console.error('Error loading Statement data:', error);
    }
  }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;

    if (this.statementUpdateForm.invalid) {
      Object.keys(this.statementUpdateForm.controls).forEach(key => {
        const control = this.statementUpdateForm.get(key);
        if (control && control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }

    console.log('Submit...');

    const formData = this.statementUpdateForm.value;

    const data = {
      statementDate: formData.statementDate,
      statementInvestorName: formData.statementInvestorName,
      statementInvestorPanNo: formData.statementInvestorPanNo,
      statementInvestmentDate: formData.statementInvestmentDate,
      statementAmcName: formData.statementAmcName,
      statementFundName: formData.statementFundName,
      statementCostOfInvestment: formData.statementCostOfInvestment,
      statementCurrentValue: formData.statementCurrentValue,
      statementSipDate: formData.statementSipDate,
      statementSipAmount: formData.statementSipAmount,
      statementSwpAmount: formData.statementSwpAmount,
      statementSipBankName: formData.statementSipBankName,
      statementSipBankAccountType: formData.statementSipBankAccountType,
      statementSipBankAccountLastFourDigit: formData.statementSipBankAccountLastFourDigit,
      statementPrimaryBankName: formData.statementPrimaryBankName,
      statementPrimaryBankAccountType: formData.statementPrimaryBankAccountType,
      statementPrimaryBankAccountLastFourDigit: formData.statementPrimaryBankAccountLastFourDigit,
      hideStatus: 0,
    }

    this.loading = true;

    try {
      const response = await lastValueFrom(this.statementService.processStatement(data, this.statementId));
      if (response.code == 1) {
        await Swal.fire("Updated!", response.message, "success");
        this.router.navigate(['/forms/statement']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      console.error('Error updating Statement:', error);
      await Swal.fire("Failed!", "An error occurred while updating the Statement entry.", "error");
    } finally {
      this.loading = false;
    }
  }

  onCancel(): void {
    this.customStylesValidated = false;
    this.router.navigate(['/forms/statement']);
  }
}