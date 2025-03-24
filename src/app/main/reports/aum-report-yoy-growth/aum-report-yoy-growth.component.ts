import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, FormDirective, FormLabelDirective, FormControlDirective,FormFeedbackComponent, FormSelectDirective, ButtonDirective,  TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective  } from '@coreui/angular';

@Component({
  selector: 'app-aum-report-yoy-growth',
  standalone: true,
  imports: [ RouterLink, RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, ReactiveFormsModule, FormsModule, FormDirective, FormLabelDirective, FormSelectDirective, FormControlDirective, FormFeedbackComponent, ButtonDirective, NgStyle,  TableDirective, TableColorDirective, TableActiveDirective, BorderDirective, AlignDirective, PaginationComponent, PageItemComponent, PageLinkDirective ],
  templateUrl: './aum-report-yoy-growth.component.html',
  styleUrl: './aum-report-yoy-growth.component.scss'
})

export class AumReportYoyGrowthComponent implements OnInit {

  customStylesValidated = false;

  constructor() { }
  ngOnInit(): void {}

  onSubmit1() {
    this.customStylesValidated = true;
    console.log('Submit... 1');
  }
}
