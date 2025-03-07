import { Link } from '@tanstack/react-router';

import { getWorkoutDifficulty } from '$/features/createWorkout';
import {
  DIFFICULTY_TYPES,
  TEMPORARY_WORKOUT_LOCAL_STORAGE_KEY
} from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { Workout } from '$/shared/types';
import { Button, Title } from '$/shared/ui';
import styles from './index.module.scss';

export const WorkoutCard = ({ workout }: { workout: Workout }) => {
  const { id, title, exercises, difficulty } = workout;
  const temporaryWorkoutId = getStorage(TEMPORARY_WORKOUT_LOCAL_STORAGE_KEY);
  if (temporaryWorkoutId === id) return '';
  return (
    <li className={styles.workoutCard}>
      <Title tag='h3' className={styles.title}>
        {title}
      </Title>
      <div className={styles.mainInfo}>
        <Title tag='h4' textAlign='left'>
          {exercises.length} упр. (Средняя сложность:{' '}
          {difficulty === 'auto' || !difficulty
            ? getWorkoutDifficulty(exercises)
            : DIFFICULTY_TYPES[difficulty]}
          )
        </Title>
      </div>
      <div className={styles.buttons}>
        <Button link>
          <Link to='/workouts/$id' params={{ id }}>
            Предпросмотр
          </Link>
        </Button>
        <Button link>
          <Link to='/train' search={{ id }}>
            Тренироваться
          </Link>
        </Button>
      </div>
    </li>
  );
};
