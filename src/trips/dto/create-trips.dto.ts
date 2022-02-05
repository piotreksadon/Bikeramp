import { Trip } from '../entities/trips.entity';
import {
  IsDateString,
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class CreateTripDto {
  @IsString()
  @Length(1, 200)
  readonly startAddress: Trip['startAddress'];

  @IsString()
  @Length(1, 200)
  readonly destinationAddress: Trip['destinationAddress'];

  @IsNumber()
  @IsInt()
  @IsPositive()
  /**price expressed with cents due to problems with float*/
  readonly price: Trip['price'];

  @IsString()
  @IsDateString()
  readonly date: Trip['date'];
}
