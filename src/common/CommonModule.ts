import { Module } from '@nestjs/common';
import { CsvRenderer, RenderingService, XlsxRenderer } from './render';

@Module({
  providers: [RenderingService, CsvRenderer, XlsxRenderer],
  exports: [RenderingService],
})
export class CommonModule {
}
