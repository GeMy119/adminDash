import { TestBed } from '@angular/core/testing';

import { AddWorkerService } from './add-worker.service';

describe('AddWorkerService', () => {
  let service: AddWorkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddWorkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
