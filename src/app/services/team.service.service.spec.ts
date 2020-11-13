import { TestBed } from '@angular/core/testing';

import { Team.ServiceService } from './team.service.service';

describe('Team.ServiceService', () => {
  let service: Team.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Team.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
