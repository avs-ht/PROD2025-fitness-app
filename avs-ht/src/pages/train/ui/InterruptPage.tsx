import { Link } from '@tanstack/react-router';
import { useAtom, useAtomValue } from 'jotai';
import { MessageCircleQuestion } from 'lucide-react';

import { DEFAULT_TRAIN_STATE, trainAtom } from '../model/trainAtom';

import { settingsAtom } from '$/pages/settings';
import { TEMPORARY_WORKOUT_LOCAL_STORAGE_KEY } from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { setStorage } from '$/shared/lib';
import { Button, Page, Title } from '$/shared/ui';
import styles from './InterruptPage.module.scss';

interface InterruptPageProps {
  pageWorkoutId: string;
  currStateId: string;
}

export const InterruptPage = ({
  pageWorkoutId,
  currStateId
}: InterruptPageProps) => {
  const [trainState, setTrainState] = useAtom(trainAtom);
  const {
    checks: { trainingStartsWithRest }
  } = useAtomValue(settingsAtom);

  const interruptCurrentWorkout = () => {
    const currTemporaryWorkout = getStorage(
      TEMPORARY_WORKOUT_LOCAL_STORAGE_KEY
    );
    if (currTemporaryWorkout && currTemporaryWorkout === trainState.workoutId) {
      setStorage(TEMPORARY_WORKOUT_LOCAL_STORAGE_KEY, pageWorkoutId);
    }

    setTrainState({
      ...DEFAULT_TRAIN_STATE,
      workoutId: pageWorkoutId,
      trainStage:
        typeof getStorage(TEMPORARY_WORKOUT_LOCAL_STORAGE_KEY) === 'string'
          ? trainingStartsWithRest
            ? 'rest'
            : 'exercise'
          : 'start'
    });
  };
  return (
    <Page>
      <MessageCircleQuestion className={styles.icon} size={48} />
      <Title className={styles.title}>
        Вы уже начали другую тренировку.
        <br />
        Хотите прервать?
      </Title>
      <div className={styles.buttons}>
        <Button deleteButton onClick={interruptCurrentWorkout}>
          Да (Вы ничего не получите за тренировку)
        </Button>
        <Button link>
          <Link to='/train' search={{ id: currStateId }}>
            Довыполнить предыдущую
          </Link>
        </Button>
      </div>
    </Page>
  );
};
