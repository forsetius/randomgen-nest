import {
  Controller, Get, Param, Query, Req, StreamableFile,
} from '@nestjs/common';
import type { Request } from 'express';
import { CsvRenderer, XlsxRenderer } from '../app/render';
import { KnkGeneratorService } from './KnkGeneratorService';
import type { KnkResponseModel } from './models';
import { KnkRequestModel } from './models';

@Controller()
export class KnkController {
  constructor(
    private generatorService: KnkGeneratorService,
    private csvRenderer: CsvRenderer,
    private xlsxRenderer: XlsxRenderer,
  ) {
  }

  @Get([
    '/knk/:template',
    '/ep/factions/:template',
  ])
  public getJson(
    @Req() request: Request,
    @Param('template') template: string,
    @Query() query: KnkRequestModel,
  ): KnkResponseModel {
    return this.generate(request.path, template, query);
  }

  @Get([
    '/knk/:template/csv',
    '/ep/factions/:template/csv',
  ])
  public getCsv(
    @Req() request: Request,
    @Param('template') template: string,
    @Query() query: KnkRequestModel,
  ): StreamableFile {
    const result = this.generate(request.path, template, query);
    const tabularizedData = this.generatorService.tabularize(result);

    return this.csvRenderer.render(tabularizedData);
  }

  @Get([
    '/knk/:template/csv',
    '/ep/factions/:template/csv',
  ])
  public getXlsx(
    @Req() request: Request,
    @Param('template') template: string,
    @Query() query: KnkRequestModel,
  ): StreamableFile {
    const result = this.generate(request.path, template, query);
    const tabularizedData = this.generatorService.tabularize(result);

    return this.xlsxRenderer.render(tabularizedData);
  }

  private generate(
    path: string,
    template: string,
    query: KnkRequestModel,
  ): KnkResponseModel {
    const templateName = path.slice(1, path.indexOf(template) + template.length)
      .replaceAll('/', '-');

    return this.generatorService.generate(
      `${templateName}-${query.lang}`,
      query.numberOfFactions,
    );
  }
}
