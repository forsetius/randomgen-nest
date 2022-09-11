import { Controller, Get, Query } from '@nestjs/common';
import { EnglishGeneratorService } from './generators/EnglishGeneratorService';
import { PolishGeneratorService } from './generators/PolishGeneratorService';
import { TechnobabbleRequestQueryModel } from './models/TechnobabbleRequestQueryModel';

@Controller()
export class TechnobabbleController {
  constructor(
    private polishGeneratorService: PolishGeneratorService,
    private englishGeneratorService: EnglishGeneratorService,
  ) {
  }

  @Get([
    '/technobabble',
    '/startrek/technobabble',
  ])
  generate(@Query() query: TechnobabbleRequestQueryModel): string {
    return query.lang === 'en'
      ? this.englishGeneratorService.generate()
      : this.polishGeneratorService.generate();
  }
}
