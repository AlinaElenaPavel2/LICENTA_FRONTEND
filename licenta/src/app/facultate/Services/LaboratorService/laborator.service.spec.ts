import { TestBed } from '@angular/core/testing';

import { LaboratorService } from './laborator.service';

describe('LaboratorService', () => {
  let service: LaboratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaboratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
