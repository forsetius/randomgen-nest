import { Injectable } from '@nestjs/common';
import { getSourceData } from '../../common/utils/getData';
import { flipCoin } from '../../common/utils/random';
import { RollableCollection } from '../../common/utils/RollableCollection';
import type {
  AdjectiveForms, Gender, NounForms, TechnobabblePlSourceModel,
} from '../models';

@Injectable()
export class PolishGeneratorService {
  private action: RollableCollection<string>;
  private descriptor: RollableCollection<AdjectiveForms>;
  private source: RollableCollection<AdjectiveForms>;
  private effect: RollableCollection<NounForms>;
  private device: RollableCollection<NounForms>;

  public constructor() {
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
}
