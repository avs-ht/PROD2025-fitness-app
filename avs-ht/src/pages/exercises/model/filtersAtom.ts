import { atom } from 'jotai';

import { FILTERS_CATEGORIES } from '$/shared/constants';

export type IFilters = {
  [K in keyof typeof FILTERS_CATEGORIES]: (keyof (typeof FILTERS_CATEGORIES)[K])[];
} & {
  tags: string[];
  equipment: string[];
};

export const filtersAtom = atom<IFilters>({
  difficulty: [],
  type: [],
  muscle: [],
  tags: [],
  equipment: []
});
