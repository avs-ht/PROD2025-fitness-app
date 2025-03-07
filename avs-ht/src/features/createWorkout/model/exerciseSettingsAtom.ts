import { atom } from 'jotai';

interface ExerciseSettingsAtom {
  exerciseId: string | null;
  customTarget: string | null;
}
export const DEFAULT_EXERCISE_SETTINGS_STATE: ExerciseSettingsAtom = {
  exerciseId: null,
  customTarget: null
};

export const exerciseSettingsAtom = atom<ExerciseSettingsAtom>(
  DEFAULT_EXERCISE_SETTINGS_STATE
);
