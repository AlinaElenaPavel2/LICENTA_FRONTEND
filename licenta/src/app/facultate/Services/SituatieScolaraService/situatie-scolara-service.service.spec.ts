import { TestBed } from '@angular/core/testing';

import { SituatieScolaraService } from './situatie-scolara-service.service';

describe('SituatieScolaraService', () => {
  let service: SituatieScolaraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SituatieScolaraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
