import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TripModule } from './trips/trips.module';
import { StatsModule } from './stats/stats.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigService } from './commons/configs/type-orm-config.service';
import googleMapsConfig from './commons/configs/google-maps.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [googleMapsConfig] }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      inject: [TypeOrmConfigService],
    }),
    TripModule,
    StatsModule,
  ],
})
export class AppModule {}
