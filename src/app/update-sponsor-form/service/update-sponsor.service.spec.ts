import { TestBed } from '@angular/core/testing';

import { UpdateSponsorService } from './update-sponsor.service';

describe('UpdateSponsorService', () => {
  let service: UpdateSponsorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateSponsorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
