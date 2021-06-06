import { TestBed } from '@angular/core/testing';

import { EvenimentService } from './eveniment.service';

describe('EvenimentService', () => {
  let service: EvenimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvenimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
