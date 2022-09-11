import { RollableCollection } from '../../app/utils/RollableCollection';
import { KnkSourceModel } from './KnkSourceModel';

export type KnkTemplateModel = Record<keyof KnkSourceModel, RollableCollection<string>>;
