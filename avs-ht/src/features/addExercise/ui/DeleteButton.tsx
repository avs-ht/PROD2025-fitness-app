import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import {
  EXERCISES_LOCAL_STORAGE_KEY,
  WORKOUTS_LOCAL_STORAGE_KEY
} from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { setStorage } from '$/shared/lib';
import { Exercise, ID, Workout } from '$/shared/types';
import { Button, ConfirmationModal } from '$/shared/ui';
import styles from './DeleteButton.module.scss';

export const DeleteButton = ({ id }: ID) => {
  const workoutshWithThisExercise = getStorage<Workout[]>(
    WORKOUTS_LOCAL_STORAGE_KEY
  ).filter(w => w.exercises.find(ex => ex.exerciseId === id)).length;
  const [isDeleteConfirmationOpened, setDeleteConfirmationOpened] =
    useState(false);
  const navigate = useNavigate();
  const delExerciseFunc = () => {
    const workouts = getStorage<Workout[]>(WORKOUTS_LOCAL_STORAGE_KEY);
    setStorage(
      WORKOUTS_LOCAL_STORAGE_KEY,
      workouts
        .map(workout => ({
          ...workout,
          exercises: workout.exercises.filter(
            exercise => exercise.exerciseId !== id
          )
        }))
        .filter(workout => workout.exercises.length > 0)
    );
    setStorage(
      EXERCISES_LOCAL_STORAGE_KEY,
      getStorage<Exercise[]>(EXERCISES_LOCAL_STORAGE_KEY).filter(
        exercise => exercise.id !== id
      )
    );
    navigate({ to: '/exercises' });
  };

  return (
    <>
      <Button
        type='button'
        className={styles.deleteButton}
        deleteButton
        onClick={() => setDeleteConfirmationOpened(true)}>
        Удалить
      </Button>
      <ConfirmationModal
        isModalShowed={isDeleteConfirmationOpened}
        setModalShowed={setDeleteConfirmationOpened}
        confirmFunc={delExerciseFunc}>
        Вы уверены, что хотите удалить этот упражнение?
        <br />
        {!!workoutshWithThisExercise &&
          `Это упражнение находится в ${workoutshWithThisExercise} трен.`}
      </ConfirmationModal>
    </>
  );
};
