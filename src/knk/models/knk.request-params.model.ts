import { KnkRequestQueryModel } from './knk.request-query.model';

export interface KnkRequestParamsModel extends Required<KnkRequestQueryModel> {
  templateName: string;
}
