import { TestBed } from '@angular/core/testing';

import { AumEntryService } from './aum-entry.service';

describe('AumEntryService', () => {
  let service: AumEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AumEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
