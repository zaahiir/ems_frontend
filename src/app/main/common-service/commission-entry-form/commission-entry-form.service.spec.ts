import { TestBed } from '@angular/core/testing';

import { CommissionEntryFormService } from './commission-entry-form.service';

describe('CommissionEntryFormService', () => {
  let service: CommissionEntryFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommissionEntryFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
