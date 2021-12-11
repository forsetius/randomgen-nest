import { Module } from '@nestjs/common';
import { EnglishGeneratorService } from './generators/english-generator.service';
import { PolishGeneratorService } from './generators/polish-generator.service';
import { TechnobabbleController } from './technobabble.controller';

@Module({
  controllers: [TechnobabbleController],
  providers: [PolishGeneratorService, EnglishGeneratorService],
})
export class TechnobabbleModule {
}
