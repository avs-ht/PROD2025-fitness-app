import { getAllExercises } from './getAllExercises';

export const getExerciseById = (id: string) => {
  const exercisesStorage = getAllExercises();
  return exercisesStorage.find(e => e.id === id);
};
