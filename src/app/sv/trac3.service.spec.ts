import { TestBed } from '@angular/core/testing';

import { Trac3Service } from './trac3.service';

describe('Trac3Service', () => {
  let service: Trac3Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Trac3Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
