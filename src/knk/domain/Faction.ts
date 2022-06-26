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

  public toString(): string {
    const externalRelations: string[] = [];
    this.externalRelations.forEach(
      ([otherFactionName, relationType]) => {
        externalRelations.push(`<li>${otherFactionName}: ${relationType}</li>`);
      },
    );

    return `
      <section>
          <header>${this.getLabel()}</header>
          <div>Zasób: ${this.resource}</div>
          <div>Plotki ${this.rumour!.toString()}</div>
          <div>Relacje wewnętrzne: ${this.internalRelations}</div>
          <ul>Relacje zewnętrzne: 
            ${externalRelations.join('\n')}
          </ul>
      </section>
    `;
  }
}

type FactionName = string;
type RelationType = string;
