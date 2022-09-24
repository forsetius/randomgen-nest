import { Global, Module } from '@nestjs/common';
import { ConfigModule, registerAs } from '@nestjs/config';
import { KnkModule } from '../knk/KnkModule';
import { TechnobabbleModule } from '../technobabble/TechnobabbleModule';
import { appConfig } from './AppConfig';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { CsvRenderer, RenderingService, XlsxRenderer } from './render';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [registerAs('app', appConfig)] }),
    KnkModule,
    TechnobabbleModule,
  ],
  controllers: [AppController],
  providers: [AppService, RenderingService, CsvRenderer, XlsxRenderer],
  exports: [RenderingService, ConfigModule],
})
export class AppModule {
}
