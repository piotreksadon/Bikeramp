import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Trip } from './entities/trips.entity';
import { Repository } from 'typeorm';
import { CreateTripDto } from './dto/create-trips.dto';
import { Client, TravelMode } from '@googlemaps/google-maps-services-js';

@Injectable()
export class TripService {
  constructor(
    @InjectRepository(Trip)
    private readonly tripRepository: Repository<Trip>,
    private readonly googleClient: Client,
  ) {}

  async create(createTripDto: CreateTripDto) {
    const startAddress = this.getAddressWithoutPipe(createTripDto.startAddress);
    const destinationAddress = this.getAddressWithoutPipe(
      createTripDto.destinationAddress,
    );
    const {
      data: { rows },
    } = await this.googleClient
      .distancematrix({
        params: {
          origins: [startAddress],
          destinations: [destinationAddress],
          mode: TravelMode.bicycling,
        } as any,
        /** This interface requires an Api Key for sending request. It is provided in trip.module.ts.  */
      })
      .catch((error) => {
        Logger.log(error);
        throw new BadRequestException('Something went wrong.');
      });

    if (rows.length !== 1 || rows[0].elements.length !== 1) {
      throw new BadRequestException('Address not found.');
    }
    const distance = rows[0].elements[0].distance.value;

    return this.tripRepository.save({
      startAddress: createTripDto.startAddress,
      destinationAddress: createTripDto.destinationAddress,
      price: createTripDto.price,
      date: createTripDto.date,
      distance,
    });
  }

  /** According to Google documentation, multiple start addresses and multiple destination addresses can be provided separated with '|' sign.
   This method splits the string, 'cutting' it before first '|', so only the first address is taken. */

  private getAddressWithoutPipe(address: string): string {
    return address.split('|')[0];
  }
}
