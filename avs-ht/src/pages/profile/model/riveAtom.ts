import { Rive } from '@rive-app/react-canvas';
import { atom } from 'jotai';

export const riveAtom = atom<Rive | null>(null);
