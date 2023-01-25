import {
  Controller, Get, Inject, Query, Render, StreamableFile,
} from '@nestjs/common';
import type { ViewData } from 'src/app/render/ViewData';
import { CsvRenderer, XlsxRenderer } from '../app/render';
import type { BaseGeneratorService } from './generators/BaseGeneratorService';
import { EnglishGeneratorService } from './generators/EnglishGeneratorService';
import { PolishGeneratorService } from './generators/PolishGeneratorService';
import { TechnobabbleRequestQueryModel } from './models';

@Controller()
export class TechnobabbleController {
  constructor(
    private polishGeneratorService: PolishGeneratorService,
    private englishGeneratorService: EnglishGeneratorService,
  ) {
  }

  @Get([
    '/technobabble',
    '/api/1.0/startrek/technobabble',
  ])
  public generateRaw(@Query() query: TechnobabbleRequestQueryModel): string {
    const service = this.chooseService(query.lang);

    return this.generate(service, query).join('\n');
  }

  @Get([
    '/startrek/technobabble',
  ])
  @Render('technobabble')
  public generateHtml(
    @Query() query: TechnobabbleRequestQueryModel
  ): ViewData<string[]> {
    const service = this.chooseService(query.lang);
    const result = this.generate(service, query);

    return {
      lang: query.lang,
      meta: service.getMeta(),
      content: result,
    }
  }

  @Get([
    '/technobabble/csv',
    '/api/1.0/startrek/technobabble/csv',
  ])
  public generateCsv(
    @Inject(CsvRenderer) csvRenderer: CsvRenderer,
    @Query() query: TechnobabbleRequestQueryModel,
  ): StreamableFile {
    const service = this.chooseService(query.lang);

    const result = this.generate(service, query);
    const tabularisedData = service.tabularize(result);

    return csvRenderer.render(tabularisedData);
  }

  @Get([
    '/technobabble/xlsx',
    '/api/1.0/startrek/technobabble/xlsx',
  ])
  public generateXslx(
    @Inject(XlsxRenderer) xlsxRenderer: XlsxRenderer,
    @Query() query: TechnobabbleRequestQueryModel,
  ): StreamableFile {
    const service = this.chooseService(query.lang);

    const result = this.generate(service, query);
    const tabularisedData = service.tabularize(result);

    return xlsxRenderer.render(tabularisedData);
  }

  private generate(
    service: BaseGeneratorService,
    query: TechnobabbleRequestQueryModel,
  ): string[] {
    return Array(query.repeat)
      .fill('')
      .map(() => service.generate());
  }

  private chooseService(
    lang: string,
  ): BaseGeneratorService {
    return lang === 'pl'
      ? this.polishGeneratorService
      : this.englishGeneratorService;
  }
}
