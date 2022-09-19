import { Injectable } from '@nestjs/common';
import { getSourceData } from '../../common/utils/getData';
import { RollableCollection } from '../../common/utils/RollableCollection';
import type { TechnobabbleEnSourceModel } from '../models';

@Injectable()
export class EnglishGeneratorService {
  private action: RollableCollection<string>;
  private descriptor: RollableCollection<string>;
  private source: RollableCollection<string>;
  private effect: RollableCollection<string>;
  private device: RollableCollection<string>;

  public constructor() {
    const dicts = getSourceData<TechnobabbleEnSourceModel>('technobabble/technobabble-en');
    this.action = new RollableCollection(dicts['action']);
    this.descriptor = new RollableCollection(dicts['descriptor']);
    this.source = new RollableCollection(dicts['source']);
    this.effect = new RollableCollection(dicts['effect']);
    this.device = new RollableCollection(dicts['device']);
  }

  public generate(): string {
    return [
      this.action.getRandom(),
      this.descriptor.getRandom(),
      this.source.getRandom(),
      this.effect.getRandom(),
      this.device.getRandom(),
    ].join(' ');
  }
}
