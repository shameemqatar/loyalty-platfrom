import { Test, TestingModule } from '@nestjs/testing';
import { WhatsappAccountsController } from './whatsapp-accounts.controller.js';

describe('WhatsappAccountsController', () => {
  let controller: WhatsappAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WhatsappAccountsController],
    }).compile();

    controller = module.get<WhatsappAccountsController>(WhatsappAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
