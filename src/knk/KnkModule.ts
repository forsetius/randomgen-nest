import { Module } from '@nestjs/common';
import { ConfigModule, registerAs } from '@nestjs/config';
import { CommonModule } from '../common/CommonModule';
import { knkConfig } from './KnkConfig';
import { KnkController } from './KnkController';
import { KnkGeneratorService } from './KnkGeneratorService';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forFeature(registerAs('knk', () => knkConfig)),
  ],
  controllers: [KnkController],
  providers: [KnkGeneratorService],
})
export class KnkModule {
}
