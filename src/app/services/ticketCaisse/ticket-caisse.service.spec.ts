import { TestBed } from '@angular/core/testing';

import { TicketCaisseService } from './ticket-caisse.service';

describe('TicketCaisseService', () => {
  let service: TicketCaisseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketCaisseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
