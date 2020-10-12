/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LogbookService } from './Logbook.service';

describe('Service: Logbook', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LogbookService]
    });
  });

  it('should ...', inject([LogbookService], (service: LogbookService) => {
    expect(service).toBeTruthy();
  }));
});
