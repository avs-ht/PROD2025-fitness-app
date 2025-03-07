import { useNavigate } from '@tanstack/react-router';
import { useAtom, useSetAtom } from 'jotai';
import toast from 'react-hot-toast';

import { DEFAULT_TRAIN_STATE, trainAtom } from '../../../model/trainAtom';

import { coinsAtom, playerAtom } from '$/pages/profile';
import { getTrainCoins } from '$/pages/profile';
import {
  COINS_ICONS,
  FIRST_TIME_LOCAL_STORAGE_KEY,
  TEMPORARY_WORKOUT_LOCAL_STORAGE_KEY,
  WORKOUTS_LOCAL_STORAGE_KEY
} from '$/shared/constants';
import { getStorage, setStorage } from '$/shared/lib/localStorageApi';
import { CoinsKey, Workout } from '$/shared/types';
import { Button, Title } from '$/shared/ui';
import { StatsButton } from './StatsButton';
import styles from './index.module.scss';

export const FinishView = () => {
  const [trainState, setTrainState] = useAtom(trainAtom);
  const setCoins = useSetAtom(coinsAtom);
  const setPlayer = useSetAtom(playerAtom);
  const setExercisesAmount = () => {
    setPlayer(prev => ({
      ...prev,
      completedTrainingsAmount: prev.completedTrainingsAmount + 1
    }));
  };
  const navigate = useNavigate();
  return (
    <>
      <Title className={styles.title}>
        С успешным прохождением тренировки!
      </Title>
      <StatsButton />
      <Button
        onClick={() => {
          const coinsAmount = getTrainCoins(trainState);
          let toastMessage = '';
          Object.entries(coinsAmount).forEach(([key, value]) => {
            setCoins({
              action: 'add',
              coinType: key as CoinsKey,
              value
            });
            if (value > 0)
              toastMessage += `${value}${COINS_ICONS[key as CoinsKey]}\n`;
          });
          if (toastMessage.trim() !== '')
            toast(toastMessage, { icon: 'Получено:', duration: 5000 });

          if (
            getStorage(TEMPORARY_WORKOUT_LOCAL_STORAGE_KEY) ===
            trainState.workoutId
          ) {
            localStorage.removeItem(TEMPORARY_WORKOUT_LOCAL_STORAGE_KEY);
            setStorage(
              WORKOUTS_LOCAL_STORAGE_KEY,
              getStorage<Workout[]>(WORKOUTS_LOCAL_STORAGE_KEY).filter(
                w => w.id !== trainState.workoutId
              )
            );
          }
          navigate({
            to: '/workouts'
          });
          setTrainState(DEFAULT_TRAIN_STATE);
          setExercisesAmount();
          setStorage(FIRST_TIME_LOCAL_STORAGE_KEY, 'false');
        }}>
        Получить награду
      </Button>
    </>
  );
};
