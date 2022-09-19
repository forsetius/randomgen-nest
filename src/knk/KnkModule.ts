import { Module } from '@nestjs/common';
import { ConfigModule, registerAs } from '@nestjs/config';
import { knkConfig } from './KnkConfig';
import { KnkController } from './KnkController';
import { KnkGeneratorService } from './KnkGeneratorService';

@Module({
  imports: [
    ConfigModule.forFeature(registerAs('knk', () => knkConfig)),
  ],
  controllers: [KnkController],
  providers: [KnkGeneratorService],
})
export class KnkModule {
}
