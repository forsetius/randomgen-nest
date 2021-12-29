import { Relation } from './Relation';

export class Faction {
  public readonly externalRelations: Relation[] = [];
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

  public toString(): string {
    const externalRelations = this.externalRelations.map(
      (relation) => `<li>${relation.otherSide.getLabel()}: ${relation.type}</li>`,
    );

    return `
      <section>
          <header>${this.getLabel()}</header>
          <div>Zasób: ${this.resource}</div>
          <div>Plotki ${this.rumour!.toString()}</div>
          <div>Relacje wewnętrzne: ${this.internalRelations}</div>
          <ul>Relacje zewnętrzne: \n${externalRelations.join('\n')}</ul>
      </section>
    `;
  }
}
