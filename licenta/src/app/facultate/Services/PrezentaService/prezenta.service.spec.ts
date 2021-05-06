import { TestBed } from '@angular/core/testing';

import { PrezentaService } from './prezenta.service';

describe('PrezentaService', () => {
  let service: PrezentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrezentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
