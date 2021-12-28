import { RollableCollection } from '../../app/util/rollable-collection';
import { KnkSourceModel } from './knk.source.model';

export type TemplateName = string;

export type KnkTemplateModel = Record<keyof KnkSourceModel, RollableCollection<string>>;
