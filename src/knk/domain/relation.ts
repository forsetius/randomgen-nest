import { Faction } from './faction';

export interface Relation {
  type: string;
  oneSide: Faction;
  otherSide: Faction;
}
