import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserInvoice } from '../entities/UserInvoice.entity';
import { UserInvoiceEntityMock } from './invoices.service.spec';

describe('InvoicesController', () => {
  let controller: InvoicesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoicesController],
      providers: [
        InvoicesService,
        {
          provide: getRepositoryToken(UserInvoice),
          useValue: UserInvoiceEntityMock,
        },
      ],
    }).compile();

    controller = module.get<InvoicesController>(InvoicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
