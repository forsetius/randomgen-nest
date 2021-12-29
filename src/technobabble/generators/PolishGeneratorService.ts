import { Injectable } from '@nestjs/common';
import { BaseGeneratorService } from '../../app/types/BaseGeneratorService';
import { flipCoin } from '../../app/util/random';
import { RollableCollection } from '../../app/util/RollableCollection';
import { TechnobabblePlSourceModel } from '../models/TechnobabblePlSourceModel';
import { AdjectiveForms, Gender, NounForms } from '../models/types';

@Injectable()
export class PolishGeneratorService extends BaseGeneratorService<never, TechnobabblePlSourceModel> {
  private action: RollableCollection<string>;
  private descriptor: RollableCollection<AdjectiveForms>;
  private source: RollableCollection<AdjectiveForms>;
  private effect: RollableCollection<NounForms>;
  private device: RollableCollection<NounForms>;

  public constructor() {
    super();

    const dicts = this.getSourceData('technobabble/technobabble-pl');
    this.action = new RollableCollection(dicts['action']);
    this.descriptor = new RollableCollection(dicts['descriptor']);
    this.source = new RollableCollection(dicts['source']);
    this.effect = new RollableCollection(dicts['effect']);
    this.device = new RollableCollection(dicts['device']);
  }

  public generate(): string {
    const action = this.action.get();
    const descriptor = this.descriptor.get();
    const source = this.source.get();
    const effect = this.effect.get();
    const device = this.device.get();

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
