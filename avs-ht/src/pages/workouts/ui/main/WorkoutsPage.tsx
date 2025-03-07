import { WorkoutCard } from '$/entities/workout';
import { WORKOUTS_LOCAL_STORAGE_KEY } from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { Workout } from '$/shared/types';
import { Page, Title } from '$/shared/ui';
import styles from './WorkoutsPage.module.scss';

export const WorkoutsPage = () => {
  const workouts = getStorage<Workout[]>(WORKOUTS_LOCAL_STORAGE_KEY);

  return (
    <Page contentCentering={false}>
      <Title textAlign='left' className={styles.title}>
        Ваши тренировки
      </Title>
      <ul className={styles.list}>
        {workouts.map(w => {
          return <WorkoutCard workout={w} key={w.id} />;
        })}
      </ul>
    </Page>
  );
};
