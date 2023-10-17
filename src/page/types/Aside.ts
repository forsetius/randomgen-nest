import { AsideType } from './AsideType';
import { AsidePlacement } from './AsidePlacement';

export interface Aside {
  title: string;
  type: AsideType;
  content: string;
  image: string;
  placement: AsidePlacement;
}
