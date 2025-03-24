import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIndustryAumEntryComponent } from './create-industry-aum-entry.component';

describe('CreateIndustryAumEntryComponent', () => {
  let component: CreateIndustryAumEntryComponent;
  let fixture: ComponentFixture<CreateIndustryAumEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateIndustryAumEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateIndustryAumEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
