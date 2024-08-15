import { TestBed } from '@angular/core/testing';

import { SysmenuService } from './sysmenu.service';

describe('SysmenuService', () => {
  let service: SysmenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SysmenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
