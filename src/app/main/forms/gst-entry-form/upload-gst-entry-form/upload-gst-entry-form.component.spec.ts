import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGstEntryFormComponent } from './upload-gst-entry-form.component';

describe('UploadGstEntryFormComponent', () => {
  let component: UploadGstEntryFormComponent;
  let fixture: ComponentFixture<UploadGstEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadGstEntryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadGstEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
