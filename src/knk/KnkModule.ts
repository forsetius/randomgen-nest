import { Module } from '@nestjs/common';
import { GeneratorService } from './generators/GeneratorService';
import { KnkController } from './KnkController';

@Module({
  controllers: [KnkController],
  providers: [GeneratorService],
})
export class KnkModule {
}
