import { Test, TestingModule } from '@nestjs/testing';
import { LoyaltyProgramsController } from './loyalty-programs.controller.js';

describe('LoyaltyProgramsController', () => {
  let controller: LoyaltyProgramsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyaltyProgramsController],
    }).compile();

    controller = module.get<LoyaltyProgramsController>(LoyaltyProgramsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
