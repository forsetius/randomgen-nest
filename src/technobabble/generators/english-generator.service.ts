import { Injectable } from '@nestjs/common';
import { BaseGeneratorService } from '../../app/types/base-generator.service';
import { RollableCollection } from '../../app/util/rollable-collection';
import { TechnobabbleEnSourceModel } from '../models/technobabble-en.source.model';

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
      this.action.get(),
      this.descriptor.get(),
      this.source.get(),
      this.effect.get(),
      this.device.get(),
    ].join(' ');
  }
}
