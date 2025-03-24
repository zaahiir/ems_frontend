import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGstEntryFormComponent } from './update-gst-entry-form.component';

describe('UpdateGstEntryFormComponent', () => {
  let component: UpdateGstEntryFormComponent;
  let fixture: ComponentFixture<UpdateGstEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateGstEntryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateGstEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
