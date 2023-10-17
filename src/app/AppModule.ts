import { Global, Module } from '@nestjs/common';
import { ConfigModule, registerAs } from '@nestjs/config';
import { KnkModule } from '../knk/KnkModule';
import { TechnobabbleModule } from '../technobabble/TechnobabbleModule';
import { appConfig } from './AppConfig';
import { AppController } from './AppController';
import { AppService } from './AppService';
import { CsvRenderer, XlsxRenderer } from './render';
import { PageModule } from '../page/PageModule';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [registerAs('app', appConfig)] }),
    KnkModule,
    PageModule,
    TechnobabbleModule,
  ],
  controllers: [AppController],
  providers: [AppService, CsvRenderer, XlsxRenderer],
  exports: [ConfigModule, CsvRenderer, XlsxRenderer],
})
export class AppModule {
}
