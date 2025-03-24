import { TestBed } from '@angular/core/testing';

import { AmcMasterFormService } from './amc-master-form.service';

describe('AmcMasterFormService', () => {
  let service: AmcMasterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmcMasterFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
