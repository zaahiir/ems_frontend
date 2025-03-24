import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCommissionEntryFormComponent } from './update-commission-entry-form.component';

describe('UpdateCommissionEntryFormComponent', () => {
  let component: UpdateCommissionEntryFormComponent;
  let fixture: ComponentFixture<UpdateCommissionEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateCommissionEntryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateCommissionEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
