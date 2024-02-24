import { TestBed } from '@angular/core/testing';

import { StagebyidService } from './stagebyid.service';

describe('StagebyidService', () => {
  let service: StagebyidService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StagebyidService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
