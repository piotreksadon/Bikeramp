import { Controller, Get } from '@nestjs/common';

@Controller('stats')
export class StatsController {
  @Get('weekly')
  async findOne() {
    console.log('weekly');
    return 'weekly';
  }

  @Get('monthly')
  async findAll() {
    console.log('monthly');
    return 'monthly';
  }
}
