import { useAtomValue } from 'jotai';
import { useState } from 'react';

import { exerciseIndexAtom, workoutAtom } from '../../../model/trainAtom';
import { ExerciseView } from '../ExerciseView';

import { getTargetStr } from '$/features/createWorkout';
import { getExerciseById } from '$/pages/exercises';
import { Modal } from '$/shared/ui';
import styles from './NextExercise.module.scss';

export const NextExercise = () => {
  const exerciseIndex = useAtomValue(exerciseIndexAtom);
  const workout = useAtomValue(workoutAtom);
  const [isNextExercisePreviewShowed, setNextExercisePreviewShowed] =
    useState(false);
  if (!workout) return '';
  const { targetType, targetUnit, targetValue, customTarget, exerciseId } =
    workout.exercises[exerciseIndex];
  const exercise = getExerciseById(exerciseId);
  if (!exercise) return '';
  const targetStr = getTargetStr({
    targetType,
    targetUnit,
    targetValue,
    customTarget
  });

  return (
    <>
      {isNextExercisePreviewShowed && (
        <Modal
          setModalOpened={setNextExercisePreviewShowed}
          contentClassName={styles.modalContent}>
          <ExerciseView preview={true} />
        </Modal>
      )}
      <p className={styles.nextExercise}>
        Следующее упражнение: <br />
        <button
          className={styles.value}
          onClick={() => {
            setNextExercisePreviewShowed(true);
          }}>
          {exercise.title} [{targetStr}] (просмотреть)
        </button>
      </p>
    </>
  );
};
