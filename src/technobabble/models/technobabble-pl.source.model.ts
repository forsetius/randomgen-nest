import { AdjectiveForms, NounForms } from './types';

export interface TechnobabblePlSourceModel {
  action: string[];
  descriptor: AdjectiveForms[];
  source: AdjectiveForms[];
  effect: NounForms[];
  device: NounForms[];
}
