import type { FactionName, RelationType } from './types';

export interface KnkFactionResponseModel {
  label: string,
  description: Record<string, string> | undefined,
  resource: string,
  rumour: string | undefined,
  internalRelations: string,
  externalRelations: Record<FactionName, RelationType>,
}
