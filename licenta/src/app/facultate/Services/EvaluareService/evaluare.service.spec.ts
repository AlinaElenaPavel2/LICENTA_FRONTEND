import { TestBed } from '@angular/core/testing';

import { EvaluareService } from './evaluare.service';

describe('EvaluareService', () => {
  let service: EvaluareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvaluareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
