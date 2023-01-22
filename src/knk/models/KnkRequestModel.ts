import { Type } from 'class-transformer';
import {
  IsIn, IsInt, IsOptional, IsString, Length, Max, Min,
} from 'class-validator';
import { knkConfig } from '../KnkConfig';

export class KnkRequestModel {
  @IsOptional()
  @IsString()
  @Length(2, 2)
  @IsIn(knkConfig.lang.supported)
    lang: string = knkConfig.lang.default;

  @IsOptional()
  @IsInt()
  @Min(2)
  @Max(8)
  @Type(() => Number)
    numberOfFactions: number = knkConfig.numberOfFactions.max;
}
