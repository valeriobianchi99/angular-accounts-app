import { TestBed } from '@angular/core/testing';

import { AccountcontrolService } from './accountcontrol.service';

describe('AccountcontrolService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountcontrolService = TestBed.get(AccountcontrolService);
    expect(service).toBeTruthy();
  });
});
