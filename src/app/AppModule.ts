import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnkModule } from '../knk/KnkModule';
import { TechnobabbleModule } from '../technobabble/TechnobabbleModule';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { CsvRenderer } from './render/CsvRenderer';
import { RenderingService } from './render/RenderingService';
import { XlsxRenderer } from './render/XlsxRenderer';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KnkModule,
    TechnobabbleModule,
  ],
  controllers: [AppController],
  providers: [AppService, RenderingService, CsvRenderer, XlsxRenderer],
  exports: [RenderingService],
})
export class AppModule {
}
