import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIndustryAumEntryComponent } from './update-industry-aum-entry.component';

describe('UpdateIndustryAumEntryComponent', () => {
  let component: UpdateIndustryAumEntryComponent;
  let fixture: ComponentFixture<UpdateIndustryAumEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateIndustryAumEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateIndustryAumEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
