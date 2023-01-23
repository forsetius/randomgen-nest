import type { KnkFactionResponseModel } from './KnkFactionResponseModel';

export interface KnkResponseModel {
  factions: KnkFactionResponseModel[],
  event: string
}
