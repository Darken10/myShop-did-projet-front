import { TestBed } from '@angular/core/testing';

import { RavitaillementsService } from './ravitaillements.service';

describe('RavitaillementsService', () => {
  let service: RavitaillementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RavitaillementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
