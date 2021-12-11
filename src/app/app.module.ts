import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TechnobabbleModule } from '../technobabble/technobabble.module';

@Module({
  imports: [TechnobabbleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
