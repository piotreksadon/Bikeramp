import { Module } from '@nestjs/common';
import { TripController } from './trips.controller';
import { TripService } from './trips.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entities/trips.entity';
import { Client } from '@googlemaps/google-maps-services-js';
import { ConfigService } from '@nestjs/config';
import { StatsModule } from '../stats/stats.module';

@Module({
  imports: [TypeOrmModule.forFeature([Trip]), StatsModule],
  controllers: [TripController],
  providers: [
    TripService,
    {
      provide: Client,
      useFactory: (config: ConfigService) => {
        return new Client({
          config: {
            params: { key: config.get<string>('google-maps.api_key') },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class TripModule {}