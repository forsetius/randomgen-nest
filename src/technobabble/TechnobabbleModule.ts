import { Module } from '@nestjs/common';
import { CsvRenderer, RenderingService, XlsxRenderer } from '../app/render';
import { EnglishGeneratorService } from './generators/EnglishGeneratorService';
import { PolishGeneratorService } from './generators/PolishGeneratorService';
import { TechnobabbleController } from './TechnobabbleController';

@Module({
  controllers: [TechnobabbleController],
  providers: [
    PolishGeneratorService,
    EnglishGeneratorService,
    RenderingService,
    CsvRenderer,
    XlsxRenderer,
  ],
})
export class TechnobabbleModule {
}
