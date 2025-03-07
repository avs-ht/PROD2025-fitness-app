import { EXERCISES_LOCAL_STORAGE_KEY } from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { Exercise } from '$/shared/types';

export const getAllExercises = () => {
  return getStorage<Exercise[]>(EXERCISES_LOCAL_STORAGE_KEY);
};
