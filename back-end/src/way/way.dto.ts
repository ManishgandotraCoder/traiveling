// travel.dto.ts
import {
  IsString,
  IsArray,
  IsEmail,
  IsNumber,
  Min,
  ArrayNotEmpty,
} from 'class-validator';

export class WayDTO {
  @IsString()
  currentLocation: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  travelLocations: string[];

  @IsNumber()
  @Min(0)
  minStayHours: number;

  // @IsEmail()
  email?: string;
}

export class Path {
  @IsString()
  from: string;

  @IsString()
  to: string;
}

export class TrainPathDto {
  @IsArray()
  @ArrayNotEmpty()
  paths: Path[];
}
