import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KnkModule } from '../knk/knkModule';
import { TechnobabbleModule } from '../technobabble/TechnobabbleModule';
import { AppController } from './AppController';
import { AppService } from './AppService';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KnkModule,
    TechnobabbleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
