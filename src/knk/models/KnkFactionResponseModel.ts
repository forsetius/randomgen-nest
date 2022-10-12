import type { FactionName, RelationType } from './types';

export interface KnkFactionResponseModel {
  label: string,
  resource: string,
  rumour: string | undefined,
  internalRelations: string,
  externalRelations: Record<FactionName, RelationType>,
}
