import { TestBed } from '@angular/core/testing';

import { AngularService } from './angular.service';

describe('AngularService', () => {
  let service: AngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
