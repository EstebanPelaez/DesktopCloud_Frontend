import { TestBed } from '@angular/core/testing';

import { DescargaService } from './descarga.service';

describe('DescargaService', () => {
  let service: DescargaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescargaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
