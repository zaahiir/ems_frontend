import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommissionEntryFormComponent } from './list-commission-entry-form.component';

describe('ListCommissionEntryFormComponent', () => {
  let component: ListCommissionEntryFormComponent;
  let fixture: ComponentFixture<ListCommissionEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCommissionEntryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListCommissionEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
