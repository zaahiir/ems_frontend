import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArnWiseAumReportComponent } from './arn-wise-aum-report.component';

describe('ArnWiseAumReportComponent', () => {
  let component: ArnWiseAumReportComponent;
  let fixture: ComponentFixture<ArnWiseAumReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArnWiseAumReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArnWiseAumReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
