import {
  Controller, Get, Param, Query, Req,
} from '@nestjs/common';
import { Request } from 'express';
import { GeneratorService } from './generators/GeneratorService';
import { KnkRequestQueryModel } from './models/KnkRequestQueryModel';

@Controller()
export class KnkController {
  constructor(
    private generatorService: GeneratorService,
  ) {
  }

  @Get([
    '/knk/:template',
    '/ep/factions/:template',
  ])
  generate(
    @Req() request: Request,
    @Param('template') template: string,
    @Query() query: KnkRequestQueryModel,
  ): string {
    const gamePrefix = request.path.split('/', 2)[1];
    const lang = query.lang ?? 'pl';

    return this.generatorService.generate({
      templateName: `${gamePrefix}-${template}-${lang}`,
      lang,
      numberOfFactions: query.numberOfFactions ?? 4,
    });
  }
}
