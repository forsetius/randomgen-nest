import type { RollableCollection } from '../../common/utils/RollableCollection';
import type { KnkSourceModel } from './KnkSourceModel';

export type KnkTemplateModel = Record<keyof KnkSourceModel, RollableCollection<string>>;
