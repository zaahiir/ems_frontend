import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AumReportYoyGrowthComponent } from './aum-report-yoy-growth.component';

describe('AumReportYoyGrowthComponent', () => {
  let component: AumReportYoyGrowthComponent;
  let fixture: ComponentFixture<AumReportYoyGrowthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AumReportYoyGrowthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AumReportYoyGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
