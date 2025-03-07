import { useNavigate } from '@tanstack/react-router';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import {
  DEFAULT_WORKOUT_FORM_STATE,
  workoutFormAtom
} from '../model/workoutFormAtom';

import {
  TEMPORARY_WORKOUT_LOCAL_STORAGE_KEY,
  WORKOUTS_LOCAL_STORAGE_KEY
} from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { setStorage } from '$/shared/lib';
import { Workout } from '$/shared/types';
import { Button, Input, Title } from '$/shared/ui';
import styles from './CreateWorkoutForm.module.scss';
import { DeleteButton } from './DeleteButton';
import { DifficultySelect } from './DifficultySelect';
import { ExercisesList } from './ExercisesList';
import { SetupEditingWorkoutValues } from './SetupEditingWorkoutValues';
import { TimeUnitInputComponent } from './TimeUnitInputComponent';

export interface FormValues {
  title: string;
}

interface CreateWorkoutFormProps {
  preset?: 'edit';
  editingWorkoutId?: string;
}
export const CreateWorkoutForm = ({
  preset,
  editingWorkoutId
}: CreateWorkoutFormProps) => {
  const isEditing = preset === 'edit' && editingWorkoutId;
  const [workoutFormValue, setWorkoutFormValue] = useAtom(workoutFormAtom);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      title: ''
    }
  });

  const addNewWorkout = (workout: Workout) => {
    setStorage(WORKOUTS_LOCAL_STORAGE_KEY, [
      ...getStorage<Workout[]>(WORKOUTS_LOCAL_STORAGE_KEY),
      workout
    ]);
  };
  const editWorkout = (workout: Workout) => {
    setStorage(WORKOUTS_LOCAL_STORAGE_KEY, [
      ...getStorage<Workout[]>(WORKOUTS_LOCAL_STORAGE_KEY).filter(
        w => w.id !== editingWorkoutId
      ),
      workout
    ]);
  };
  const createWorkoutFunc = isEditing ? editWorkout : addNewWorkout;
  const createWorkout = ({ title }: FormValues) => {
    if (title === '') {
      setError('title', {
        message: 'Поле не может быть пустым'
      });
      return;
    }
    const workout: Workout = {
      ...workoutFormValue,
      title,
      id: isEditing ? editingWorkoutId : uuidv4()
    };
    createWorkoutFunc(workout);
    setWorkoutFormValue(DEFAULT_WORKOUT_FORM_STATE);
    if (getStorage(TEMPORARY_WORKOUT_LOCAL_STORAGE_KEY) === 'true') {
      navigate({ to: '/train', search: { id: workout.id } });
      setStorage(TEMPORARY_WORKOUT_LOCAL_STORAGE_KEY, workout.id);
    } else navigate({ to: '/workouts/$id', params: { id: workout.id } });
  };
  const isButtonsDisabled = workoutFormValue.exercises.length === 0;

  return (
    <>
      {isEditing && (
        <SetupEditingWorkoutValues
          workoutId={editingWorkoutId}
          setValue={setValue}
        />
      )}
      <form
        id='createWorkout'
        name='createWorkout'
        className={styles.form}
        onSubmit={handleSubmit(createWorkout)}>
        <Title className={styles.title}>Составление плана тренировки</Title>
        <ExercisesList />
        <Input
          {...register('title')}
          errorMessage={errors.title?.message}
          labelName='Название тренировки'
          isSetupInputAsText
          setFocus={() => setFocus('title')}
        />
        <TimeUnitInputComponent />
        <DifficultySelect />
        <div className={styles.buttons}>
          {isEditing && <DeleteButton id={editingWorkoutId} />}
          <Button disabled={isButtonsDisabled}>Сохранить</Button>
          {!isEditing && (
            <Button
              disabled={isButtonsDisabled}
              onClick={() => {
                setStorage(TEMPORARY_WORKOUT_LOCAL_STORAGE_KEY, 'true');
              }}>
              Начать без сохранения
            </Button>
          )}
        </div>
      </form>
    </>
  );
};
