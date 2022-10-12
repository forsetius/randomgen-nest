function makeElems(name: string) {
  return Array(4)
    .fill(0)
    .map((_, i) => `${name} ${String.fromCharCode(i + 65)}`);
}

export const mockTemplate = {
  factions: makeElems('Faction'),
  events: makeElems('Event with %1% and %2%'),
  externalRelations: makeElems('External Relation'),
  internalRelations: makeElems('Internal Relation'),
  resources: makeElems('Resource'),
  rumours: makeElems('%0% has Rumour with %1% and %2%'),
};
