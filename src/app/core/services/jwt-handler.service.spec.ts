import { TestBed, inject } from '@angular/core/testing';

import { JwtHandlerService } from './jwt-handler.service';

describe('JwtHandlerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtHandlerService]
    });
  });

  it('should be created', inject([JwtHandlerService], (service: JwtHandlerService) => {
    expect(service).toBeTruthy();
  }));
});
