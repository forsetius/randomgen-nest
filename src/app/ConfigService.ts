import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly store: Record<string, unknown> = {};

  constructor() {
    dotenv.config();
  }

  public register<T>(key: string, val: T): void {
    this.store[key] = val;
  }

  // public get() {}
}
