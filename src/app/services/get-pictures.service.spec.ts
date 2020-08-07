import { TestBed } from '@angular/core/testing';

import { GetPicturesService } from './get-pictures.service';

describe('ImageLoaderService', () => {
  let service: GetPicturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPicturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
