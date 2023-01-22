import type { KnkFactionResponseModel } from '../models';

export class Faction {
  public readonly type: string;
  public readonly description?: Record<string, string> = undefined;
  public readonly externalRelations: Map<FactionName, RelationType> = new Map();
  public rumour?: string;

  public constructor(
    public readonly runningNumber: number,
    public spec: string | { [k: string]: string; name: string },
    public readonly resource: string,
    public readonly internalRelations: string,
  ) {
    if (typeof spec === 'string') {
      this.type = spec;
    } else {
      this.type = spec.name;
      this.description = Object.fromEntries(
        Object.entries(spec).filter(([key]) => key !== 'name'),
      );
    }
  }

  public getLabel(): string {
    return `${this.type} #${this.runningNumber}`;
  }

  public toJSON(): KnkFactionResponseModel {
    return {
      label: this.getLabel(),
      description: this.description,
      rumour: this.rumour,
      resource: this.resource,
      internalRelations: this.internalRelations,
      externalRelations: Object.fromEntries(this.externalRelations),
    };
  }
}

type FactionName = string;
type RelationType = string;
