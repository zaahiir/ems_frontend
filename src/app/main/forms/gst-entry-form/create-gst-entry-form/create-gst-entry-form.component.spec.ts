import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateGstEntryFormComponent } from './create-gst-entry-form.component';

describe('CreateGstEntryFormComponent', () => {
  let component: CreateGstEntryFormComponent;
  let fixture: ComponentFixture<CreateGstEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGstEntryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateGstEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
