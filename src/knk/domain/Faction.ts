import type { KnkResponseModel } from '../models';

export class Faction {
  public readonly externalRelations: Map<FactionName, RelationType> = new Map();
  public rumour?: string;

  public constructor(
    public readonly runningNumber: number,
    public readonly type: string,
    public readonly resource: string,
    public readonly internalRelations: string,
  ) {
  }

  public getLabel(): string {
    return `${this.type} #${this.runningNumber}`;
  }

  public serialize(): KnkResponseModel {
    return {
      label: this.getLabel(),
      rumour: this.rumour,
      resource: this.resource,
      internalRelations: this.internalRelations,
      externalRelations: Object.fromEntries(this.externalRelations),
    };
  }
}

type FactionName = string;
type RelationType = string;
