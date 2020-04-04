/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TravelService } from './travel.service';

describe('Service: Travel', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TravelService]
    });
  });

  it('should ...', inject([TravelService], (service: TravelService) => {
    expect(service).toBeTruthy();
  }));
});
