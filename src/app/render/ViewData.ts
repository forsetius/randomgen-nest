export interface ViewData<C = string> {
  lang: string;
  meta: {
    title: string;
  }
  content: C;
}