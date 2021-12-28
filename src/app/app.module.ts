import { Module } from '@nestjs/common';
import { KnkModule } from '../knk/knk.module';
import { TechnobabbleModule } from '../technobabble/technobabble.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [KnkModule, TechnobabbleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
