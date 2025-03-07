import { Link, useLocation } from '@tanstack/react-router';
import { useSetAtom } from 'jotai';
import { TriangleAlert } from 'lucide-react';
import { useEffect, useState } from 'react';

import { settingsAtom } from '$/pages/settings';
import { DEFAULT_SETTINGS } from '$/pages/settings/model/settingsAtom';
import {
  SETTINGS_LOCAL_STORAGE_KEY,
  TRAIN_NOTIFICATION_SESSION_STORAGE_KEY,
  TRAIN_STATE_LOCAL_STORAGE_KEY
} from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { Settings, TrainState } from '$/shared/types';
import { Button, Modal, Title } from '$/shared/ui';
import styles from './TrainNotification.module.scss';

export const TrainNotification = () => {
  const [isNotifModalShowed, setNotifModalShowed] = useState(false);
  const location = useLocation();
  const trainState = getStorage<TrainState>(TRAIN_STATE_LOCAL_STORAGE_KEY);
  const setSettings = useSetAtom(settingsAtom);
  const isNotifShowed = sessionStorage.getItem(
    TRAIN_NOTIFICATION_SESSION_STORAGE_KEY
  );

  useEffect(() => {
    const checks = getStorage<Settings>(SETTINGS_LOCAL_STORAGE_KEY)?.checks;
    if (!checks) {
      setSettings(DEFAULT_SETTINGS);
      return;
    }
    if (!checks.trainNotification) return;
    if (
      isNotifShowed !== 'true' &&
      trainState.trainStage !== 'start' &&
      location.href !== `/train?id=${trainState.workoutId}`
    ) {
      setNotifModalShowed(true);
      sessionStorage.setItem(TRAIN_NOTIFICATION_SESSION_STORAGE_KEY, 'true');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => setNotifModalShowed(false);
  return (
    <>
      {isNotifModalShowed && (
        <Modal
          setModalOpened={setNotifModalShowed}
          contentClassName={styles.contentModal}>
          <TriangleAlert className={styles.icon} size={48} />
          <Title className={styles.title}>
            У вас есть незаконченная тренировка!
          </Title>
          <div className={styles.buttons}>
            <Button link onClick={closeModal}>
              <Link to='/train' search={{ id: trainState.workoutId }}>
                Перейти к тренировке
              </Link>
            </Button>
            <Button onClick={closeModal}>Потом</Button>
          </div>
        </Modal>
      )}
    </>
  );
};
