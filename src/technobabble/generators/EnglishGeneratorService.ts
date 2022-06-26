import { Injectable } from '@nestjs/common';
import { BaseGeneratorService } from '../../app/types/BaseGeneratorService';
import { RollableCollection } from '../../app/utils/RollableCollection';
import { TechnobabbleEnSourceModel } from '../models/TechnobabbleEnSourceModel';

@Injectable()
export class EnglishGeneratorService
  extends BaseGeneratorService<never, TechnobabbleEnSourceModel> {
  private action: RollableCollection<string>;
  private descriptor: RollableCollection<string>;
  private source: RollableCollection<string>;
  private effect: RollableCollection<string>;
  private device: RollableCollection<string>;

  public constructor() {
    super();

    const dicts = this.getSourceData('technobabble/technobabble-en');
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
