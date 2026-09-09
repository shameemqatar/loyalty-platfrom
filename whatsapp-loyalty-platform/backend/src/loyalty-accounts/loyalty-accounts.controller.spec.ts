import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyAccountsController } from './loyalty-accounts.controller.js';

describe('LoyaltyAccountsController', () => {
  let controller: LoyaltyAccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltyAccountsController],
    }).compile();

    controller = module.get<LoyaltyAccountsController>(LoyaltyAccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
