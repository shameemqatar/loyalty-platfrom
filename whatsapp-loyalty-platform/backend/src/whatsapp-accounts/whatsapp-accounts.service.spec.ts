import { Test, TestingModule } from '@nestjs/testing';
import { WhatsappAccountsService } from './whatsapp-accounts.service.js';

describe('WhatsappAccountsService', () => {
  let service: WhatsappAccountsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhatsappAccountsService],
    }).compile();

    service = module.get<WhatsappAccountsService>(WhatsappAccountsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
