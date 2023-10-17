import { Page } from './Page';

export interface Post extends Page {
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}
