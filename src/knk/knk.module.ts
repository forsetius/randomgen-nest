import { Module } from '@nestjs/common';
import { GeneratorService } from './generators/generator.service';
import { KnkController } from './knk.controller';

@Module({
  controllers: [KnkController],
  providers: [GeneratorService],
})
export class KnkModule {
}
