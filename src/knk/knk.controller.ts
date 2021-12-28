import {
  Controller, Get, Param, Query, Req,
} from '@nestjs/common';
import { Request } from 'express';
import { GeneratorService } from './generators/generator.service';
import { KnkRequestQueryModel } from './models/knk.request-query.model';

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
      n: query.n ?? 4,
    });
  }
}
