import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllArnWiseAumReportComponent } from './all-arn-wise-aum-report.component';

describe('AllArnWiseAumReportComponent', () => {
  let component: AllArnWiseAumReportComponent;
  let fixture: ComponentFixture<AllArnWiseAumReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllArnWiseAumReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllArnWiseAumReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
