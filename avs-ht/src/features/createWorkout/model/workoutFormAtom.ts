import { atom } from 'jotai';

import { Workout } from '$/shared/types';

export type WorkoutForm = Omit<Workout, 'id' | 'title'>;
export const DEFAULT_WORKOUT_FORM_STATE: WorkoutForm = {
  difficulty: 'auto',
  exercises: [],
  restTime: 20,
  restTimeUnit: 'seconds'
};
export const workoutFormAtom = atom<WorkoutForm>(DEFAULT_WORKOUT_FORM_STATE);
