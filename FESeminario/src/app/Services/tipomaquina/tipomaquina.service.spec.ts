import { TestBed } from '@angular/core/testing';

import { TipomaquinaService } from './tipomaquina.service';

describe('TipomaquinaService', () => {
  let service: TipomaquinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipomaquinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
