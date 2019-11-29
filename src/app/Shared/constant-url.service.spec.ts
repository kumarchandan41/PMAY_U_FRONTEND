import { TestBed } from '@angular/core/testing';

import { ConstantUrlService } from './constant-url.service';

describe('ConstantUrlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConstantUrlService = TestBed.get(ConstantUrlService);
    expect(service).toBeTruthy();
  });
});
