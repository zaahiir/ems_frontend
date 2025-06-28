import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadAumEntryComponent } from './upload-aum-entry.component';

describe('UploadAumEntryComponent', () => {
  let component: UploadAumEntryComponent;
  let fixture: ComponentFixture<UploadAumEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadAumEntryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadAumEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
