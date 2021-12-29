import { KnkRequestQueryModel } from './KnkRequestQueryModel';

export interface KnkRequestParamsModel extends Required<KnkRequestQueryModel> {
  templateName: string;
}
