import { useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { useState } from 'react';

import {
  DEFAULT_WORKOUT_FORM_STATE,
  workoutFormAtom
} from '../model/workoutFormAtom';

import { WORKOUTS_LOCAL_STORAGE_KEY } from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { setStorage } from '$/shared/lib';
import { ID, Workout } from '$/shared/types';
import { Button, ConfirmationModal } from '$/shared/ui';

export const DeleteButton = ({ id }: ID) => {
  const [, setWorkoutFormValue] = useAtom(workoutFormAtom);
  const navigate = useNavigate();
  const deleteWorkout = () => {
    setStorage(WORKOUTS_LOCAL_STORAGE_KEY, [
      ...getStorage<Workout[]>(WORKOUTS_LOCAL_STORAGE_KEY).filter(
        w => w.id !== id
      )
    ]);
    setWorkoutFormValue(DEFAULT_WORKOUT_FORM_STATE);
    navigate({
      to: '/workouts'
    });
  };
  const [isConfirmModalOpened, setConfirmModalOpened] = useState(false);
  return (
    <>
      <Button
        deleteButton
        onClick={() => setConfirmModalOpened(true)}
        type='button'>
        Удалить
      </Button>
      <ConfirmationModal
        isModalShowed={isConfirmModalOpened}
        setModalShowed={setConfirmModalOpened}
        confirmFunc={deleteWorkout}>
        Вы точно хотите удалить эту тренировку?
      </ConfirmationModal>
    </>
  );
};
