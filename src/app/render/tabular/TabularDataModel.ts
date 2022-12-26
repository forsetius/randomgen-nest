import type { Column } from './Column';

export type TabularDataModel = {
  header: string,
  columns: Column[],
  rows: unknown[],
}[];
