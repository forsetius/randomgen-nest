export interface KnkSourceModel {
  factions: (string | { [k: string]: string; name: string })[];
  resources: string[];
  externalRelations: string[];
  internalRelations: string[];
  events: string[];
  rumours: string[];
}
