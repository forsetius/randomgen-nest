import { Injectable } from '@nestjs/common';
import type { ViewData } from 'src/app/render/ViewData';
import { getSourceData } from '../../app/utils/getData';
import { flipCoin } from '../../app/utils/random';
import { RollableCollection } from '../../app/utils/RollableCollection';
import type {
  AdjectiveForms, Gender, NounForms, TechnobabblePlSourceModel,
} from '../models';
import { BaseGeneratorService } from './BaseGeneratorService';

@Injectable()
export class PolishGeneratorService extends BaseGeneratorService {
  private action: RollableCollection<string>;
  private descriptor: RollableCollection<AdjectiveForms>;
  private source: RollableCollection<AdjectiveForms>;
  private effect: RollableCollection<NounForms>;
  private device: RollableCollection<NounForms>;

  public constructor() {
    super();

    const dicts = getSourceData<TechnobabblePlSourceModel>('technobabble/technobabble-pl');
    this.action = new RollableCollection(dicts['action']);
    this.descriptor = new RollableCollection(dicts['descriptor']);
    this.source = new RollableCollection(dicts['source']);
    this.effect = new RollableCollection(dicts['effect']);
    this.device = new RollableCollection(dicts['device']);
  }

  public generate(): string {
    const action = this.action.getRandom();
    const descriptor = this.descriptor.getRandom();
    const source = this.source.getRandom();
    const effect = this.effect.getRandom();
    const device = this.device.getRandom();

    const isEffectPlural = flipCoin();
    const isDevicePlural = flipCoin();

    return [
      action,
      this.pickAdjectiveForm(descriptor, device.gender, isDevicePlural),
      this.pickNounForm(device, isDevicePlural),
      this.pickNounForm(effect, isEffectPlural),
      this.pickAdjectiveForm(source, effect.gender, isEffectPlural),
    ].join(' ');
  }

  private pickAdjectiveForm(forms: AdjectiveForms, gender: Gender, isPlural: boolean) {
    return isPlural ? forms.pl : forms[gender];
  }

  private pickNounForm(forms: NounForms, isPlural: boolean) {
    return isPlural ? forms.pl : forms.sing;
  }

  getMeta(): ViewData['meta'] {
    return {
      title: 'Generator technobełkotu',
    }
  }
}
