import { TestBed } from '@angular/core/testing';

import { AnuntService} from './anunt-service.service';

describe('AnuntService', () => {
  let service: AnuntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnuntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
