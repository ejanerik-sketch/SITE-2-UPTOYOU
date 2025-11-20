export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export enum FormType {
  PJ = 'Pessoa Jurídica',
  PF = 'Pessoa Física'
}