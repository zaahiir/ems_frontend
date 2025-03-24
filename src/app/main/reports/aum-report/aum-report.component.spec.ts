import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AumReportComponent } from './aum-report.component';

describe('AumReportComponent', () => {
  let component: AumReportComponent;
  let fixture: ComponentFixture<AumReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AumReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AumReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
