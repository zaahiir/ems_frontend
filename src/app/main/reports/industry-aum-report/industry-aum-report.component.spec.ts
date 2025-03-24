import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryAumReportComponent } from './industry-aum-report.component';

describe('IndustryAumReportComponent', () => {
  let component: IndustryAumReportComponent;
  let fixture: ComponentFixture<IndustryAumReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndustryAumReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndustryAumReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
