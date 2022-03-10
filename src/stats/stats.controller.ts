import { Controller, Get } from '@nestjs/common';
import { StatsService } from './stats.service';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}
  @Get('/weekly')
  async findOne() {

    return this.statsService.findOne();
  }

  // @Get('monthly')
  // async findAll() {
  //   console.log('monthly');
  //   return 'monthly';
  // }
}