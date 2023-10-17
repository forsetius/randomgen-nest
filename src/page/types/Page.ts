import { Aside } from './Aside';

export interface Page {
  slug: string;
  title: string;
  subtitle?: string;
  headerImage: string;
  lead?: string;
  content: string;
  asides: Aside[] | undefined;
}
