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
    '/api/1.0/knk/:template',
    '/api/1.0/ep/factions/:template',
  ])
  public getJson(
    @Req() request: Request,
    @Param('template') template: string,
    @Query() query: KnkRequestModel,
  ): KnkResponseModel {
    return this.generate(request.path, template, query);
  }

  @Get([
    '/api/1.0/knk/:template/csv',
    '/api/1.0/ep/factions/:template/csv',
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
    '/api/1.0/knk/:template/xlsx',
    '/api/1.0/ep/factions/:template/xlsx',
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
    const templateName = path.slice(0, path.lastIndexOf(template) + template.length)
      .replace(/\/api\/\d+\.\d+\//, '')
      .replaceAll('/', '-');

    return this.generatorService.generate(
      `${templateName}-${query.lang}`,
      query.numberOfFactions,
    );
  }
}
