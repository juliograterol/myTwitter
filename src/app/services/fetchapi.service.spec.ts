import { TestBed } from '@angular/core/testing';

import FetchApi from './fetchapi.service';

describe('FetchApi', () => {
  let service: FetchApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
