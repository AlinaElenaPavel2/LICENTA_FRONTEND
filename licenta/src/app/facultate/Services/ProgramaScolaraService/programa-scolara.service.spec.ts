import { TestBed } from '@angular/core/testing';

import { ProgramaScolaraService } from './programa-scolara.service';

describe('ProgramaScolaraService', () => {
  let service: ProgramaScolaraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgramaScolaraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
