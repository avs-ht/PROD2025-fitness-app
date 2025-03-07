import { getExerciseById } from '$/pages/exercises/lib/getExercise';
import { DIFFICULTY_TYPES } from '$/shared/constants';
import { DifficultyType, WorkoutExercise } from '$/shared/types';

const POINTS_VALUE = {
  easy: 1,
  medium: 2,
  hard: 3
};
export const getWorkoutDifficulty = (exercises: WorkoutExercise[]) => {
  if (!exercises || exercises.length === 0) return 'Отсутствует';
  const points = {
    easy: 0,
    medium: 0,
    hard: 0
  };
  exercises.forEach(ex => {
    const exercise = getExerciseById(ex.exerciseId);
    if (!exercise) return;
    const { difficulty } = exercise;
    points[difficulty] += POINTS_VALUE[difficulty];
  });

  const pointsArray = Object.entries(points);
  pointsArray.sort((a, b) => b[1] - a[1]);
  const highValueKey = pointsArray[0][0] as DifficultyType;

  return DIFFICULTY_TYPES[highValueKey];
};
