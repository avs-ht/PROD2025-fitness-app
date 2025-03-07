import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { getSecondsByTimeUnit } from '../../../lib/getTimeByUnit';
import { trainAtom, workoutAtom } from '../../../model/trainAtom';
import { RemainingExercises } from '../RemainingExercises';
import { SkipButton } from '../SkipButton';

import { getTargetStr } from '$/features/createWorkout';
import { getExerciseById } from '$/pages/exercises';
import { playerAtom } from '$/pages/profile';
import { TimeUnit } from '$/shared/types';
import { Button, CircularTimer, Title } from '$/shared/ui';
import { Media } from './Media';
import styles from './index.module.scss';

export const ExerciseView = ({ preview = false }: { preview?: boolean }) => {
  const workout = useAtomValue(workoutAtom);
  const setPlayer = useSetAtom(playerAtom);
  const [{ completedExercises }, setTrainState] = useAtom(trainAtom);
  if (!workout) return 'Нет такой тренировки';
  const { exercises } = workout;

  const currExerciseIndex = completedExercises.length;
  if (!exercises[currExerciseIndex]) return;

  const { exerciseId, targetType, targetValue, targetUnit, customTarget } =
    exercises[currExerciseIndex];

  const exercise = getExerciseById(exerciseId);
  if (!exercise) return 'Упражнение не найдено';
  const { title, videosSerieId, imagesSerieId, description, exerciseType } =
    exercise;

  const targetStr = getTargetStr({
    targetType,
    targetValue,
    targetUnit,
    customTarget
  });

  const doExercise = () => {
    setPlayer(prev => {
      const { completedExercisesAmount } = prev;
      const poundsCoef = targetUnit === 'kilograms' ? 1 : 0.45;
      return {
        ...prev,
        completedExercisesAmount: {
          ...completedExercisesAmount,
          [exerciseType]: completedExercisesAmount[exerciseType] + 1
        },
        totalDistance:
          prev.totalDistance +
          (targetType === 'distance' && targetValue ? targetValue : 0) *
            (targetUnit === 'kilometers' ? 1000 : 1),
        maxWeightLifted:
          targetType === 'weight'
            ? Math.max(prev.maxWeightLifted, (targetValue || 0) * poundsCoef)
            : prev.maxWeightLifted
      };
    });
    setTrainState(prev => {
      const newCompletedExercise = {
        ...exercises[currExerciseIndex],
        isCompleted: true,
        isSkipped: false
      };
      const newCompletedExercises = [
        ...completedExercises,
        newCompletedExercise
      ];
      return {
        ...prev,
        trainStage:
          newCompletedExercises.length === exercises.length ? 'finish' : 'rest',
        completedExercises: newCompletedExercises
      };
    });
  };
  return (
    <>
      <Title title='h2' className={styles.title}>
        {title}
      </Title>
      <p className={styles.target}>
        Цель: <span className={styles.value}>{targetStr}</span>
      </p>
      <p className={styles.description}>{description}</p>
      <div className={styles.media}>
        <Media videosSerieId={videosSerieId} imagesSerieId={imagesSerieId} />
      </div>
      {targetType === 'time' && !preview && (
        <div className={styles.timer}>
          <CircularTimer
            editButtons={false}
            duration={getSecondsByTimeUnit(
              targetValue || 0,
              targetUnit as TimeUnit
            )}
            timeEndedCallback={doExercise}
          />
        </div>
      )}
      {!preview && (
        <div className={styles.buttons}>
          <SkipButton exercises={exercises} />
          {targetType !== 'time' && (
            <Button onClick={doExercise}>Выполнено</Button>
          )}
        </div>
      )}
      <RemainingExercises allExercisesLength={exercises.length} />
    </>
  );
};
