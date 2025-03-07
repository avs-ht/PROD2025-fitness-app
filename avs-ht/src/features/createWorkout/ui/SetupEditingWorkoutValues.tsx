import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { workoutFormAtom } from '../model/workoutFormAtom';

import { getWorkoutById } from '$/pages/workouts';
import { FormValues } from './CreateWorkoutForm';

interface SetupProps {
  workoutId: string;
  setValue: UseFormSetValue<FormValues>;
}
export const SetupEditingWorkoutValues = ({
  workoutId,
  setValue
}: SetupProps) => {
  const setWorkoutFormValue = useSetAtom(workoutFormAtom);
  useEffect(() => {
    const workout = getWorkoutById(workoutId);
    if (!workout) return;
    const { title, ...other } = workout;
    setWorkoutFormValue(other);
    setValue('title', title);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};
