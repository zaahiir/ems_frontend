import { TestBed } from '@angular/core/testing';

import { DailyEntryService } from './daily-entry.service';

describe('DailyEntryService', () => {
  let service: DailyEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
