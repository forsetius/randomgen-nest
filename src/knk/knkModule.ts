import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GeneratorService } from './generators/GeneratorService';
import { knkConfig } from './KnkConfig';
import { KnkController } from './KnkController';

@Module({
  imports: [ConfigModule.forFeature(knkConfig)],
  controllers: [KnkController],
  providers: [GeneratorService],
})
export class KnkModule {
}
