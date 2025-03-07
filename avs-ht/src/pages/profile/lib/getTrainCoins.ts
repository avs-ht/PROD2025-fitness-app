import { getExerciseById } from '$/pages/exercises';
import { getWorkoutById } from '$/pages/workouts';
import { DIFFICULTY_COIN_COEF, MUSCLE_COIN_AMOUNT } from '$/shared/constants';
import { CoinsKey, TrainState } from '$/shared/types';

export const getTrainCoins = (trainState: TrainState) => {
  const { completedExercises, workoutId, trainStage } = trainState;
  const workout = getWorkoutById(workoutId);

  if (!workout || trainStage !== 'finish') return 0;

  const coinsAmount: Record<CoinsKey, number> = {
    lowerPart: 0,
    upperPart: 0,
    torso: 0
  };

  completedExercises.forEach(ex => {
    const { isCompleted, isSkipped, exerciseId } = ex;
    if (isSkipped || !isCompleted) return;
    const exercise = getExerciseById(exerciseId);
    if (!exercise) return;

    const { difficulty, muscle } = exercise;
    const diffCoef = DIFFICULTY_COIN_COEF[difficulty];
    Object.entries(MUSCLE_COIN_AMOUNT[muscle]).forEach(
      ([muscleType, value]) => {
        coinsAmount[muscleType as CoinsKey] += value * diffCoef;
      }
    );
  });
  return coinsAmount;
};
