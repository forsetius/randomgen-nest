export type Gender = 'm' | 'f' | 'n' | 'pl';

export type AdjectiveForms = Record<Gender, string>;

export interface NounForms { gender: Gender, sing: string, pl: string }
