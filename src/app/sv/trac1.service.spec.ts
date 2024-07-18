import { TestBed } from '@angular/core/testing';

import { Trac1Service } from './trac1.service';

describe('Trac1Service', () => {
  let service: Trac1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Trac1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
