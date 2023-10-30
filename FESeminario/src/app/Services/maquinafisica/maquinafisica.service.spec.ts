import { TestBed } from '@angular/core/testing';

import { MaquinafisicaService } from './maquinafisica.service';

describe('MaquinafisicaService', () => {
  let service: MaquinafisicaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaquinafisicaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
