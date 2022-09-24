import fs from 'fs';
import { sync as glob } from 'glob';
import path from 'path';

export function getSourceData<SourceDataModel>(
  filename: string,
): SourceDataModel {
  return JSON.parse(fs.readFileSync(`${__dirname}/../../../dict/${filename}.json`, 'utf-8')) as SourceDataModel;
}

export function getSourceDataDir<SourceDataModel>(
  dirname: string,
): Record<string, SourceDataModel> {
  const sourceFiles = glob(`${__dirname}/../../../dict/${dirname}/*.json`);

  const sources: Record<string, SourceDataModel> = {};
  sourceFiles.forEach((sourceFile) => {
    const name = path.basename(sourceFile, '.json');

    sources[name] = JSON.parse(
      fs.readFileSync(sourceFile, 'utf-8'),
    ) as SourceDataModel;
  });

  return sources;
}
