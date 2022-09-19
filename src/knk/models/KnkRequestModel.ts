import { ConfigService } from '@nestjs/config';
import {
  getFromContainer, IsIn, IsInt, IsOptional, IsString, Length, Max, Min,
} from 'class-validator';
import type { knkConfig } from '../KnkConfig';

const configService = getFromContainer(ConfigService) as ConfigService<typeof knkConfig, true>;

export class KnkRequestModel {
  @IsOptional()
  @IsString()
  @Length(2, 2)
  @IsIn(configService.get('lang.supported', { infer: true }))
    lang: string = configService.get('lang.default', { infer: true });

  @IsOptional()
  @IsInt()
  @Min(2)
  @Max(configService.get('numberOfFactions.max', { infer: true }))
    numberOfFactions: number = configService.get('numberOfFactions.default', { infer: true });
}
