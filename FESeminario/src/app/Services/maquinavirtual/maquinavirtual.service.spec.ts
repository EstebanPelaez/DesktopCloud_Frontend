import { TestBed } from '@angular/core/testing';

import { MaquinavirtualService } from './maquinavirtual.service';

describe('MaquinavirtualService', () => {
  let service: MaquinavirtualService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaquinavirtualService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
