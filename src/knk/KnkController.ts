import {
  Controller, Get, Param, Query, Req, StreamableFile,
} from '@nestjs/common';
import { Request } from 'express';
import { RendererType } from '../app/render/RendererType';
import { RenderingService } from '../app/render/RenderingService';
import { KnkGeneratorService } from './KnkGeneratorService';
import { KnkRequestModel } from './KnkRequestModel';
import { KnkResponseModel } from './models/KnkResponseModel';

@Controller()
export class KnkController {
  constructor(
    private generatorService: KnkGeneratorService,
    private renderingService: RenderingService<KnkResponseModel[]>,
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
  ): KnkResponseModel[] {
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

    return this.renderingService.render(RendererType.CSV, result);
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

    return this.renderingService.render(RendererType.XLSX, result);
  }

  private generate(
    path: string,
    template: string,
    query: KnkRequestModel,
  ): KnkResponseModel[] {
    const templateName = path.slice(0, path.indexOf(template) + template.length - 1)
      .replaceAll('/', '-');

    return this.generatorService.generate(
      `${templateName}-${query.lang}`,
      query.numberOfFactions,
    );
  }
}
