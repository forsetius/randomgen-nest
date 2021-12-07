import * as fs from 'fs';

export abstract class BaseGeneratorService {
  protected getSourceData<T>(filename: string): T {
    return JSON.parse(fs.readFileSync(`${__dirname}/../../../dict/${filename}.json`, 'utf-8')) as T;
  }

  public abstract generate(): string;
}
