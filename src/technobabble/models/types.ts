export type Gender = 'm' | 'f' | 'n' | 'pl';

export type AdjectiveForms = Record<Gender, string>;

export type NounForms = { gender: Gender, sing: string, pl: string };
