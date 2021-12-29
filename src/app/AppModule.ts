import { Module } from '@nestjs/common';
import { KnkModule } from '../knk/KnkModule';
import { TechnobabbleModule } from '../technobabble/TechnobabbleModule';
import { AppController } from './AppController';
import { AppService } from './AppService';

@Module({
  imports: [KnkModule, TechnobabbleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
