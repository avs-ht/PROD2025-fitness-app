import { WORKOUTS_LOCAL_STORAGE_KEY } from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { Workout } from '$/shared/types';

export const getWorkoutById = (id: string) => {
  const workouts = getStorage<Workout[]>(WORKOUTS_LOCAL_STORAGE_KEY);
  return workouts.find(workout => workout.id === id);
};
