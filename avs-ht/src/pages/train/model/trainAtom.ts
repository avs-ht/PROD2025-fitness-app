import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { getWorkoutById } from '$/pages/workouts';
import { TRAIN_STATE_LOCAL_STORAGE_KEY } from '$/shared/constants';
import { TrainStage, TrainState } from '$/shared/types';

export const DEFAULT_TRAIN_STATE: TrainState = {
  trainStage: 'start',
  completedExercises: [],
  sessions: [],
  workoutId: ''
};

export const trainAtom = atomWithStorage<TrainState>(
  TRAIN_STATE_LOCAL_STORAGE_KEY,
  DEFAULT_TRAIN_STATE
);

export const trainStageAtom = atom(
  get => get(trainAtom).trainStage,
  (get, set, newVal: TrainStage) =>
    set(trainAtom, { ...get(trainAtom), trainStage: newVal })
);

export const exerciseIndexAtom = atom(get => {
  const exercises = get(trainAtom).completedExercises;
  return exercises.length;
});

export const workoutAtom = atom(get => {
  const { workoutId } = get(trainAtom);

  const workout = getWorkoutById(workoutId);
  return workout;
});
