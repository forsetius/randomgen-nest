import { Module } from '@nestjs/common';
import { ConfigModule, registerAs } from '@nestjs/config';
import { CommonModule } from '../common/CommonModule';
import { EnglishGeneratorService } from './generators/EnglishGeneratorService';
import { PolishGeneratorService } from './generators/PolishGeneratorService';
import { technobabbleConfig } from './TechnobabbleConfig';
import { TechnobabbleController } from './TechnobabbleController';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forFeature(registerAs('technobabble', () => technobabbleConfig)),
  ],
  controllers: [TechnobabbleController],
  providers: [PolishGeneratorService, EnglishGeneratorService],
})
export class TechnobabbleModule {
}
