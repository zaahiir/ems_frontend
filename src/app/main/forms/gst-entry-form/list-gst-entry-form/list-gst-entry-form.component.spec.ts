import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGstEntryFormComponent } from './list-gst-entry-form.component';

describe('ListGstEntryFormComponent', () => {
  let component: ListGstEntryFormComponent;
  let fixture: ComponentFixture<ListGstEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGstEntryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListGstEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
