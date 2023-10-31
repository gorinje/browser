import { TestBed } from '@angular/core/testing';

import { BrowsingService } from './browsing.service';

describe('BrowsingService', () => {
  let service: BrowsingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowsingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
