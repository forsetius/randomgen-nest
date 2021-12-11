import { Injectable } from '@nestjs/common';
import { BaseGeneratorService } from '../../app/types/base-generator.service';
import { RollableCollection } from '../../app/util/rollable-collection';
import { TechnobabbleEnSourceModel } from '../models/technobabble-en.source-model';

@Injectable()
export class EnglishGeneratorService extends BaseGeneratorService {
  private action: RollableCollection<string>;
  private descriptor: RollableCollection<string>;
  private source: RollableCollection<string>;
  private effect: RollableCollection<string>;
  private device: RollableCollection<string>;

  public constructor() {
    super();

    const dicts = this.getSourceData<TechnobabbleEnSourceModel>('technobabble-en');
    this.action = new RollableCollection<string>(dicts['action']);
    this.descriptor = new RollableCollection<string>(dicts['descriptor']);
    this.source = new RollableCollection<string>(dicts['source']);
    this.effect = new RollableCollection<string>(dicts['effect']);
    this.device = new RollableCollection<string>(dicts['device']);
  }

  public generate(): string {
    return [
      this.action.get(),
      this.descriptor.get(),
      this.source.get(),
      this.effect.get(),
      this.device.get(),
    ].join(' ');
  }
}
