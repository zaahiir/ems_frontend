import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListIndustryAumEntryComponent } from './list-industry-aum-entry.component';

describe('ListIndustryAumEntryComponent', () => {
  let component: ListIndustryAumEntryComponent;
  let fixture: ComponentFixture<ListIndustryAumEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListIndustryAumEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListIndustryAumEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
