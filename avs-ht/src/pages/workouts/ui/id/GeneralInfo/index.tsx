import { Link } from '@tanstack/react-router';

import { getTargetStr, getWorkoutDifficulty } from '$/features/createWorkout';
import { DIFFICULTY_TYPES } from '$/shared/constants';
import { Workout } from '$/shared/types';
import { Button, Title } from '$/shared/ui';
import { CalendarButton } from './CalendarButton';
import styles from './index.module.scss';

interface GeneralInfoProps {
  workout: Workout;
}
export const GeneralInfo = ({ workout }: GeneralInfoProps) => {
  const { difficulty, exercises, restTimeUnit, restTime, id } = workout;
  const difficultyAsText =
    difficulty === 'auto'
      ? getWorkoutDifficulty(exercises)
      : DIFFICULTY_TYPES[difficulty];
  const restTimeStr = getTargetStr({
    targetType: 'time',
    targetUnit: restTimeUnit,
    targetValue: restTime,
    customTarget: undefined
  });
  return (
    <>
      <Title tag='h3' className={styles.title}>
        Общая информация
      </Title>
      <Title tag='h4' className={styles.subtitle}>
        Сложность:{' '}
        <span className={styles.subtitleValue}>{difficultyAsText}</span>
      </Title>
      <Title tag='h4' className={styles.subtitle}>
        Время отдыха между упражнениями:{' '}
        <span className={styles.subtitleValue}>{restTimeStr} </span>
      </Title>

      <div className={styles.buttons}>
        <Button link>
          <Link to='/workouts/$id/edit' params={{ id }}>
            Редактировать тренировку
          </Link>
        </Button>
        <Button link>
          <Link to='/train' search={{ id }}>
            Перейти к выполнению
          </Link>
        </Button>
        <CalendarButton id={id} />
      </div>
    </>
  );
};
