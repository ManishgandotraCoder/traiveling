import { TestBed } from '@angular/core/testing';

import { WayService } from './way.service';

describe('WayService', () => {
  let service: WayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
