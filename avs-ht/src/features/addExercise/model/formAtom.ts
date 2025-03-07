import { atom } from 'jotai';

import { DefaultFilters } from '$/shared/types';

export interface IFormAtom {
  images: File[];
  videos: File[];
  filters: DefaultFilters;
  equipment: string[];
  tags: string[];
}
export const DEFAULT_FORM_ATOM_STATE: IFormAtom = {
  images: [],
  videos: [],
  filters: {
    type: 'strength',
    muscle: 'whole',
    difficulty: 'easy'
  },
  equipment: [],
  tags: []
};
export const formAtom = atom<IFormAtom>(DEFAULT_FORM_ATOM_STATE);
