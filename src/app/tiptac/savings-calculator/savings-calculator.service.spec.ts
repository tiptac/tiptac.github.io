import { TestBed } from '@angular/core/testing';

import { SavingsCalculatorService } from './savings-calculator.service';

describe('SavingsCalculatorService', () => {
  let service: SavingsCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SavingsCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
