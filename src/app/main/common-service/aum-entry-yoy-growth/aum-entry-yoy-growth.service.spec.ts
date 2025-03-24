import { TestBed } from '@angular/core/testing';

import { AumEntryYoyGrowthService } from './aum-entry-yoy-growth.service';

describe('AumEntryYoyGrowthService', () => {
  let service: AumEntryYoyGrowthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AumEntryYoyGrowthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
