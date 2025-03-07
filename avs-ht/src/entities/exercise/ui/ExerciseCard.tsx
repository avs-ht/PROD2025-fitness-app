import { Link } from '@tanstack/react-router';

import { EXERCISE_TYPE_ICONS } from '../constants';

import { Exercise } from '$/shared/types';
import { Title } from '$/shared/ui';
import styles from './ExerciseCard.module.scss';

export const ExerciseCard = ({ exercise }: { exercise: Exercise }) => {
  const Icon = EXERCISE_TYPE_ICONS[exercise.exerciseType];
  return (
    <li className={styles.card}>
      <span className={styles.iconContainer}>
        <Icon />
      </span>
      <Title tag='h4' className={styles.title}>
        {exercise.title}
      </Title>
      <Link
        className={styles.link}
        to={'/exercises/$id'}
        params={{ id: exercise.id }}
        mask={{
          to: '/exercises'
        }}
      />
    </li>
  );
};
