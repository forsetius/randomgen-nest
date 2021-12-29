import { RollableCollection } from '../../app/util/RollableCollection';
import { KnkSourceModel } from './KnkSourceModel';

export type TemplateName = string;

export type KnkTemplateModel = Record<keyof KnkSourceModel, RollableCollection<string>>;
