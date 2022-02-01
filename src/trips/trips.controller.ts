import { Controller, Post } from '@nestjs/common';

@Controller('trips')
export class TripsController {
  @Post('trips')
  create() {
    //todo
  }
}
