import { Link } from '@tanstack/react-router';
import { useAtomValue, useSetAtom } from 'jotai';

import { trainAtom } from '../../../model/trainAtom';

import { settingsAtom } from '$/pages/settings';
import { getWorkoutById } from '$/pages/workouts';
import { ID } from '$/shared/types';
import { Button, Title } from '$/shared/ui';
import styles from './index.module.scss';

export const StartView = ({ id }: ID) => {
  const setTrainState = useSetAtom(trainAtom);
  const {
    checks: { trainingStartsWithRest }
  } = useAtomValue(settingsAtom);
  const workout = getWorkoutById(id);
  if (!workout) return 'Тренировка не найдена';

  const { title } = workout;
  return (
    <div className={styles.container}>
      <Title tag='h1' className={styles.title}>
        Тренировка "{title}"
      </Title>
      <div className={styles.buttons}>
        <Button link>
          <Link to='/workouts'>К тренировкам</Link>
        </Button>
        <Button
          onClick={() => {
            setTrainState(prev => ({
              ...prev,
              workoutId: id,
              trainStage: trainingStartsWithRest ? 'rest' : 'exercise',
              sessions: [{ startTime: new Date(), endTime: null }]
            }));
          }}>
          Начать
        </Button>
      </div>
    </div>
  );
};
