import { TestBed } from '@angular/core/testing';

import { GstEntryFormsService } from './gst-entry-forms.service';

describe('GstEntryFormsService', () => {
  let service: GstEntryFormsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GstEntryFormsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
