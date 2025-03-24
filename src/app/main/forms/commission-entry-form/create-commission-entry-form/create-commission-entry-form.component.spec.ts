import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommissionEntryFormComponent } from './create-commission-entry-form.component';

describe('CreateCommissionEntryFormComponent', () => {
  let component: CreateCommissionEntryFormComponent;
  let fixture: ComponentFixture<CreateCommissionEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCommissionEntryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCommissionEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
