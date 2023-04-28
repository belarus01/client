import { LanguageType } from '@app/interfaces/interfaces';

interface Language {
  id: number;
  name: LanguageType;
  title: string;
  countryCode: string;
}

export const languages: Language[] = [
  {
    id: 1,
    name: 'ru',
    title: 'Russian',
    countryCode: 'ru',
  },
];
