import { Page } from './Page';
import { DateTime } from 'luxon';

export interface Post extends Page {
  createdAt: DateTime;
  date: string;
  time: string;
  tags: string[];
}
