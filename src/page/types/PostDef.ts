import { DateTime } from 'luxon';
import { ContentDef } from './ContentDef';

export interface PostDef extends ContentDef {
  createdAt: DateTime;
  tags: string[];
}
