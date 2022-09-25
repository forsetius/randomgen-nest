import type { RollableCollection } from '../../app/utils/RollableCollection';
import type { KnkSourceModel } from './KnkSourceModel';

export type KnkTemplateModel = Record<keyof KnkSourceModel, RollableCollection<string>>;
