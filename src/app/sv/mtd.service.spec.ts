import { TestBed } from '@angular/core/testing';

import { MtdService } from './mtd.service';

describe('MtdService', () => {
  let service: MtdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MtdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
