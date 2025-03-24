import { Component, OnInit } from '@angular/core';
import { NgStyle, NgClass, NgForOf, NgIf, CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormFloatingDirective, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective } from '@coreui/angular';
import { StatementService } from '../../../common-service/statement/statement.service'
import { amcMasterCommonInterface } from '../../../interfaces/interfaces'
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-create-statement',
  standalone: true,
  imports: [ NgIf, CommonModule, NgClass, NgForOf, RowComponent, ColComponent, TextColorDirective, CardComponent, FormFloatingDirective, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormControlDirective, FormFeedbackComponent, InputGroupComponent, InputGroupTextDirective, FormSelectDirective, FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective, ButtonDirective, ListGroupDirective, ListGroupItemDirective, NgStyle],
  templateUrl: './create-statement.component.html',
  styleUrl: './create-statement.component.scss'
})
export class CreateStatementComponent implements OnInit {

  customStylesValidated = false;
  statementCreateForm!: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;

  amc: amcMasterCommonInterface[] = [];  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private statementService: StatementService,
  )  { 
    this.statementCreateForm = this.fb.group({
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
    await this.loadAmcData();
  }

  get f() { return this.statementCreateForm.controls; }

  async loadAmcData(): Promise<void> {
    try {
      const response = await this.statementService.getAmc();
      this.amc = response.data;
    } catch (error) {
      console.error('Error loading AMCs:', error);
    }
  }

  async onSubmit(): Promise<void> {
    this.customStylesValidated = true;
    this.submitted = true;

    if (this.statementCreateForm.invalid) {
      Object.keys(this.statementCreateForm.controls).forEach(key => {
        const control = this.statementCreateForm.get(key);
        if (control && control.invalid) {
          control.markAsTouched();
        }
      });
      return;
    }
    
    console.log('Submit...');

    const data = {
      statementDate: this.f['statementDate'].value,
      statementInvestorName: this.f['statementInvestorName'].value,
      statementInvestorPanNo: this.f['statementInvestorPanNo'].value,
      statementInvestmentDate: this.f['statementInvestmentDate'].value,
      statementAmcName: this.f['statementAmcName'].value,
      statementFundName: this.f['statementFundName'].value,
      statementCostOfInvestment: this.f['statementCostOfInvestment'].value,
      statementCurrentValue: this.f['statementCurrentValue'].value,
      statementSipDate: this.f['statementSipDate'].value,
      statementSipAmount: this.f['statementSipAmount'].value,
      statementSwpAmount: this.f['statementSwpAmount'].value,
      statementSipBankName: this.f['statementSipBankName'].value,
      statementSipBankAccountType: this.f['statementSipBankAccountType'].value,
      statementSipBankAccountLastFourDigit: this.f['statementSipBankAccountLastFourDigit'].value,
      statementPrimaryBankName: this.f['statementPrimaryBankName'].value,
      statementPrimaryBankAccountType: this.f['statementPrimaryBankAccountType'].value,
      statementPrimaryBankAccountLastFourDigit: this.f['statementPrimaryBankAccountLastFourDigit'].value,
      hideStatus: 0,
    };

    const id = "0";
    this.loading = true;

    try {
      const response = await lastValueFrom(this.statementService.processStatement(data, "0"));
      if (response.code == 1) {
        await Swal.fire("Added!", response.message, "success");
        this.router.navigate(['/forms/statement']);
      } else {
        await Swal.fire("Failed!", response.message, "error");
      }
    } catch (error) {
      await Swal.fire("Failed!", "An error occurred while processing the statement.", "error");
      console.error('Error processing statement:', error);
    } finally {
      this.loading = false;
    }
  }

  onReset(): void {
    this.customStylesValidated = false;
    console.log('Reset... 1');
  }
}