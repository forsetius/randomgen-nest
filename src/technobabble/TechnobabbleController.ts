import {
  Controller, Get, Query, StreamableFile,
} from '@nestjs/common';
import { RendererType, RenderingService } from '../common/render';
import { EnglishGeneratorService } from './generators/EnglishGeneratorService';
import { PolishGeneratorService } from './generators/PolishGeneratorService';
import { TechnobabbleRequestQueryModel } from './models';

@Controller()
export class TechnobabbleController {
  constructor(
    private polishGeneratorService: PolishGeneratorService,
    private englishGeneratorService: EnglishGeneratorService,
    private renderingService: RenderingService<string[]>,
  ) {
  }

  @Get([
    '/technobabble',
    '/startrek/technobabble',
  ])
  public generateRaw(@Query() query: TechnobabbleRequestQueryModel): string {
    return this.generate(query).join('\n');
  }

  @Get([
    '/technobabble/csv',
    '/startrek/technobabble/csv',
  ])
  public generateCsv(@Query() query: TechnobabbleRequestQueryModel): StreamableFile {
    const result = this.generate(query);

    return this.renderingService.render(RendererType.CSV, result);
  }

  @Get([
    '/technobabble/xlsx',
    '/startrek/technobabble/xlsx',
  ])
  public generateXslx(@Query() query: TechnobabbleRequestQueryModel): StreamableFile {
    const result = this.generate(query);

    return this.renderingService.render(RendererType.XLSX, result);
  }

  private generate(
    query: TechnobabbleRequestQueryModel,
  ): string[] {
    const service = query.lang === 'pl'
      ? this.polishGeneratorService
      : this.englishGeneratorService;

    return Array(query.repeat)
      .map(() => service.generate());
  }
}
