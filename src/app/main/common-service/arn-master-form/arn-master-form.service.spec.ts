import { TestBed } from '@angular/core/testing';

import { ArnMasterFormService } from './arn-master-form.service';

describe('ArnMasterFormService', () => {
  let service: ArnMasterFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArnMasterFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
