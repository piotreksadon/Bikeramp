import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
@Entity()
export class Stats {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    total_distance: number;

    @Column()
    total_price: number;

    @Column({ default: () => 'EXTRACT(week FROM NOW())' })
    week: number;

    @Column({ default: () => 'EXTRACT(year FROM NOW())' })
    year: number;

    @Column()
    count: number;
}