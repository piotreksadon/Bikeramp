import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { Length } from 'class-validator';

@Entity()
export class Trip {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: 'varchar', name: 'start_address' })
  @Length(1)
  startAddress: string;

  @Column({ nullable: false, type: 'varchar', name: 'destination_address' })
  @Length(1)
  destinationAddress: string;

  @Column()
  price: number;

  @Column({ nullable: false, type: 'timestamp' })
  @Length(1)
  date: Timestamp;

  @Column({ nullable: false })
  distance: number;
}
