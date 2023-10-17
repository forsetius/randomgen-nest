import { Controller, Get } from '@nestjs/common';
import { AppService } from './AppService';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('/ping')
  getHello(): string {
    return this.appService.getHello();
  }
}
