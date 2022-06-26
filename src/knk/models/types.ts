import { RollableCollection } from '../../app/utils/RollableCollection';
import { KnkSourceModel } from './KnkSourceModel';

export type TemplateName = string;

export type KnkTemplateModel = Record<keyof KnkSourceModel, RollableCollection<string>>;
