import { TestBed } from '@angular/core/testing';

import { Player.ServiceService } from './player.service.service';

describe('Player.ServiceService', () => {
  let service: Player.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Player.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
