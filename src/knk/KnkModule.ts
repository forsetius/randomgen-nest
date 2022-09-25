import { Module } from '@nestjs/common';
import { KnkController } from './KnkController';
import { KnkGeneratorService } from './KnkGeneratorService';

@Module({
  controllers: [KnkController],
  providers: [KnkGeneratorService],
})
export class KnkModule {
}
