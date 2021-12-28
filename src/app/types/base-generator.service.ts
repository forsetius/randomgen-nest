import * as fs from 'fs';
import { sync as glob } from 'glob';
import * as path from 'path';

export abstract class BaseGeneratorService<M, S> {
  protected getSourceData(filename: string): S {
    return JSON.parse(fs.readFileSync(`${__dirname}/../../../dict/${filename}.json`, 'utf-8')) as S;
  }

  protected getSourceDataDir(dirname: string): Record<string, S> {
    const sourceFiles = glob(`${__dirname}/../../../dict/${dirname}/*.json`);

    const sources: Record<string, S> = {};
    sourceFiles.forEach((sourceFile) => {
      const name = path.basename(sourceFile, '.json');

      sources[name] = JSON.parse(
        fs.readFileSync(sourceFile, 'utf-8'),
      ) as S;
    });

    return sources;
  }

  public abstract generate(params: M): string;
}
