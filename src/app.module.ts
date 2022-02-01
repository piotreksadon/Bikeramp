import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { appConfig } from './app.config';
import { ConfigModule } from '@nestjs/config';
import { TripsModule } from './trips/trips.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
    }),
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    TripsModule,
    StatsModule,
  ],
})
export class AppModule {}
