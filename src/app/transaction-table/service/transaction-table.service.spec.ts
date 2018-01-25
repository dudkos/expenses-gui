import { TestBed, inject } from '@angular/core/testing';

import { TransactionTableService } from './transaction-table.service';

describe('TransacionTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionTableService]
    });
  });

  it('should be created', inject([TransactionTableService], (service: TransactionTableService) => {
    expect(service).toBeTruthy();
  }));
});
