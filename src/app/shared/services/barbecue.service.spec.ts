import { TestBed } from '@angular/core/testing';

import { BarbecueService } from './barbecue.service';

describe('BarbecueService', () => {
  let service: BarbecueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarbecueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
