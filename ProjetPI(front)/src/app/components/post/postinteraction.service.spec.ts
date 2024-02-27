import { TestBed } from '@angular/core/testing';

import { PostinteractionService } from './postinteraction.service';

describe('PostinteractionService', () => {
  let service: PostinteractionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostinteractionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
