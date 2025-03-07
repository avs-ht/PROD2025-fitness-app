import { getWorkoutById } from '../../lib/getWorkout';

import { CreateWorkoutForm } from '$/features/createWorkout';
import { Page404 } from '$/pages/404';
import { TRAIN_STATE_LOCAL_STORAGE_KEY } from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { TrainState } from '$/shared/types';
import { Page } from '$/shared/ui';
import { BackButton } from '$/shared/ui/BackButton';
import { EditBlockScreen } from './BlockScreen';
import styles from './EditWorkoutPage.module.scss';

export const EditWorkoutPage = ({ id }: { id: string }) => {
  const workout = getWorkoutById(id);
  if (!workout) return <Page404 />;
  const temporaryWorkoutId = getStorage<TrainState>(
    TRAIN_STATE_LOCAL_STORAGE_KEY
  ).workoutId;

  if (temporaryWorkoutId === id)
    return <EditBlockScreen id={temporaryWorkoutId} />;
  return (
    <Page contentCentering={false}>
      <BackButton
        to='/workouts/$id'
        params={{ id }}
        buttonClassName={styles.backButton}
      />
      <CreateWorkoutForm preset='edit' editingWorkoutId={id} />
    </Page>
  );
};
