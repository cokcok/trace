import { TestBed } from '@angular/core/testing';

import { Trac2Service } from './trac2.service';

describe('Trac2Service', () => {
  let service: Trac2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Trac2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
