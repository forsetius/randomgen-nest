import {
  IsIn, IsInt, IsOptional, IsString, Length, Max, Min,
} from 'class-validator';
import { technobabbleConfig } from '../TechnobabbleConfig';

export class TechnobabbleRequestQueryModel {
  @IsOptional()
  @IsString()
  @Length(2, 2)
  @IsIn(technobabbleConfig.lang.supported)
    lang: string = technobabbleConfig.lang.default;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(technobabbleConfig.repeat.max)
    repeat = 1;
}
