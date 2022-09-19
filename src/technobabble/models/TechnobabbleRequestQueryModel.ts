import { ConfigService } from '@nestjs/config';
import {
  getFromContainer, IsIn, IsInt, IsOptional, IsString, Length, Max, Min,
} from 'class-validator';
import type { technobabbleConfig } from '../TechnobabbleConfig';

const configService = getFromContainer(ConfigService) as
  ConfigService<typeof technobabbleConfig, true>;

export class TechnobabbleRequestQueryModel {
  @IsOptional()
  @IsString()
  @Length(2, 2)
  @IsIn(configService.get('lang.supported', { infer: true }))
    lang: string = configService.get('lang.default', { infer: true });

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(configService.get('repeat.max', { infer: true }))
    repeat = 1;
}
