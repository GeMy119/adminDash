import { TestBed } from '@angular/core/testing';
import { UpdateVisitService } from './update-visit-service.service';



describe('UpdateVisitServiceService', () => {
  let service: UpdateVisitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateVisitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
