import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesService } from './invoices.service';
import { UserInvoice } from '../entities/UserInvoice.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

export const UserInvoiceEntityMock: Partial<UserInvoice> = {};

describe('InvoicesService', () => {
  let service: InvoicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoicesService,
        {
          provide: getRepositoryToken(UserInvoice),
          useValue: UserInvoiceEntityMock,
        },
      ],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
