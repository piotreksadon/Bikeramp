import { Body, Controller, Post } from '@nestjs/common';
import { TripService } from './trips.service';
import { CreateTripDto } from './dto/create-trips.dto';

@Controller()
export class TripController {
  constructor(private readonly tripService: TripService) {}
  @Post('trips')
  create(@Body() createTripsDto: CreateTripDto) {
    return this.tripService.create(createTripsDto);
  }
}
