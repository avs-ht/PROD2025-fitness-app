import { AddExerciseForm } from '$/features/addExercise';
import { getWorkoutById } from '$/pages/workouts';
import { TRAIN_STATE_LOCAL_STORAGE_KEY } from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { TrainState } from '$/shared/types';
import { Page } from '$/shared/ui';
import { EditBlockScreen } from './BlockScreen';

export const EditExercisePage = ({ id }: { id: string }) => {
  const temporaryWorkoutId = getStorage<TrainState>(
    TRAIN_STATE_LOCAL_STORAGE_KEY
  ).workoutId;
  const workout = getWorkoutById(temporaryWorkoutId);
  const isExerciseInWorkout = workout?.exercises.find(
    ex => ex.exerciseId === id
  );

  if (isExerciseInWorkout) return <EditBlockScreen id={temporaryWorkoutId} />;
  return (
    <Page contentCentering={false}>
      <AddExerciseForm preset='edit' exerciseId={id} />
    </Page>
  );
};
