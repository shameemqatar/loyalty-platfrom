import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service.js';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('health')
  health() {
    return {
      status: 'ok',
    };
  }

  @Get('health/database')
  async databaseHealth() {
    try {
      const businesses =
        await this.prisma.db.orm.public.Business.all();

      return {
        status: 'ok',
        database: 'connected',
        businesses: businesses.length,
      };
    } catch (error) {
      return {
        status: 'error',
        database: 'disconnected',
      };
    }
  }
}