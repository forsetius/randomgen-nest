import { Module } from '@nestjs/common';
import { EnglishGeneratorService } from './generators/EnglishGeneratorService';
import { PolishGeneratorService } from './generators/PolishGeneratorService';
import { TechnobabbleController } from './TechnobabbleController';

@Module({
  controllers: [TechnobabbleController],
  providers: [PolishGeneratorService, EnglishGeneratorService],
})
export class TechnobabbleModule {
}
