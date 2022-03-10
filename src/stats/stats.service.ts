import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { Stats } from './entities/stats.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatsService {
    constructor(
        @InjectRepository(Stats)
        private readonly statsRepository: Repository<Stats>,
    ) {}

    async getWeek(date: Date) {
        return moment(date).get('week');
    }

    async getYear(date: Date) {
        return moment(date).get('year');
    }

    async findOne() {
        const today = new Date();

        const stats = await this.getCurrentWeekStats(today);
        if (stats) {
            const totalDistanceInKm = stats.total_distance / 1000;
            const totalDistanceToFixed = totalDistanceInKm.toFixed(2);

            return {
                total_distance: totalDistanceToFixed + 'km',
                total_price: stats.total_price / 100 + 'PLN',
            };
        }
        return {
            total_distance: 0.0 + 'km',
            total_price: 0.0 + 'PLN',
        };
    }

    async generateWeeklyStats(
        distance: number,
        price: number,
        date: Date,
    ): Promise<Stats> {
        const week = await this.getWeek(date);
        const year = await this.getYear(date);
        const weeklyStats = await this.getCurrentWeekStats(date);
        if (weeklyStats) {
            weeklyStats.total_distance = weeklyStats.total_distance + distance;
            weeklyStats.total_price = weeklyStats.total_price + price;
            weeklyStats.count = weeklyStats.count + 1;

            return this.statsRepository.save(weeklyStats);
        }

        return this.statsRepository.save({
            total_distance: distance,
            total_price: price,
            week,
            year,
            count: 1,
        });
    }

    async getCurrentWeekStats(date: Date) {
        const week = await this.getWeek(date);
        const year = await this.getYear(date);

        return await this.statsRepository
            .createQueryBuilder('s')
            .where('s.week=:week')
            .andWhere('s.year=:year')
            .setParameters({ week, year })
            .getOne();
    }
}