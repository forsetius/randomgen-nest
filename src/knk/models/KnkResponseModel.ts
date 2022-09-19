import type { FactionName, RelationType } from './types';

export interface KnkResponseModel {
  label: string;
  resource: string;
  rumour: string | undefined;
  internalRelations: string;
  externalRelations: Record<FactionName, RelationType>;
}
