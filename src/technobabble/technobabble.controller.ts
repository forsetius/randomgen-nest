import { Controller, Get, Query } from '@nestjs/common';
import { EnglishGeneratorService } from './generators/english-generator.service';
import { PolishGeneratorService } from './generators/polish-generator.service';
import { TechnobabbleRequestModel } from './models/technobabble.request-model';

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
  generate(@Query() query: TechnobabbleRequestModel): string {
    return query.lang === 'en'
      ? this.englishGeneratorService.generate()
      : this.polishGeneratorService.generate();
  }
}
