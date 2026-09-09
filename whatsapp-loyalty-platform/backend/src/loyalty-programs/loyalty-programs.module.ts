import { Module } from '@nestjs/common';
import { LoyaltyProgramsController } from './loyalty-programs.controller.js';
import { LoyaltyProgramsService } from './loyalty-programs.service.js';

@Module({
  controllers: [LoyaltyProgramsController],
  providers: [LoyaltyProgramsService],
})
export class LoyaltyProgramsModule {}