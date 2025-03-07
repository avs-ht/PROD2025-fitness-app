import { getWorkoutById } from '../../lib/getWorkout';

import { Page404 } from '$/pages/404';
import { Page, Title } from '$/shared/ui';
import { ExercisesView } from './ExercisesView';
import { GeneralInfo } from './GeneralInfo';
import styles from './WorkoutIdPage.module.scss';

export const WorkoutIdPage = ({ id }: { id: string }) => {
  const workout = getWorkoutById(id);
  if (!workout) return <Page404 />;
  const { title, exercises } = workout;
  return (
    <Page contentCentering={false}>
      <Title className={styles.title}>
        <span>Тренировка "{title}"</span>
      </Title>
      <div className={styles.blocks}>
        <div className={styles.leftBlock}>
          <GeneralInfo workout={workout} />
        </div>
        <div className={styles.rightBlock}>
          <ExercisesView exercises={exercises} />
        </div>
      </div>
    </Page>
  );
};
