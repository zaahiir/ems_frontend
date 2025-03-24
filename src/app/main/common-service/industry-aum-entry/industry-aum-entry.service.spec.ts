import { TestBed } from '@angular/core/testing';

import { IndustryAumEntryService } from './industry-aum-entry.service';

describe('IndustryAumEntryService', () => {
  let service: IndustryAumEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndustryAumEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
