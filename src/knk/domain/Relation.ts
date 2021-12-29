import { Faction } from './Faction';

export interface Relation {
  type: string;
  oneSide: Faction;
  otherSide: Faction;
}
