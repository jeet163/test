import { TestBed } from '@angular/core/testing';

import { TweeterServiceService } from './tweeter-service.service';

describe('TweeterServiceService', () => {
  let service: TweeterServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TweeterServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
