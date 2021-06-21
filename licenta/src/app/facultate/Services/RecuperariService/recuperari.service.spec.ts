import { TestBed } from '@angular/core/testing';

import { RecuperariService } from './recuperari.service';

describe('RecuperariService', () => {
  let service: RecuperariService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecuperariService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
