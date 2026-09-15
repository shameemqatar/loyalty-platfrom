import { Test, TestingModule } from '@nestjs/testing';
import { WhatsappWebhookService } from './whatsapp-webhook.service.js';

describe('WhatsappWebhookService', () => {
  let service: WhatsappWebhookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WhatsappWebhookService],
    }).compile();

    service = module.get<WhatsappWebhookService>(WhatsappWebhookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
