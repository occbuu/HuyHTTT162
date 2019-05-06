import { TestBed, inject } from '@angular/core/testing';

import { SnortDbService } from './snort-db.service';

describe('SnortDbService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnortDbService]
    });
  });

  it('should be created', inject([SnortDbService], (service: SnortDbService) => {
    expect(service).toBeTruthy();
  }));
});
