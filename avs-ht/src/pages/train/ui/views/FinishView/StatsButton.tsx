import { useAtomValue } from 'jotai';
import { useState } from 'react';

import { getFormatedTime } from '$/pages/train/lib/getFormatedTime';
import { getSessionSummaryTime } from '$/pages/train/lib/getSessionSummaryTime';
import { trainAtom } from '$/pages/train/model/trainAtom';
import { Button, Modal } from '$/shared/ui';
import styles from './StatsButton.module.scss';

export const StatsButton = () => {
  const [isModalOpened, setModalOpened] = useState(false);
  const { sessions, completedExercises } = useAtomValue(trainAtom);
  const stats = {
    'Кол-во выполненных упражнений': `${completedExercises.filter(ex => ex.isCompleted).length} из ${completedExercises.length}`,
    'Пропущено упражнений': `${completedExercises.filter(ex => ex.isSkipped).length} из ${completedExercises.length}`,
    'Общее время тренировки': getFormatedTime(getSessionSummaryTime(sessions)),
    'Кол-во сессий': sessions.length
  };
  return (
    <>
      <Button
        className={styles.statButton}
        onClick={() => setModalOpened(true)}>
        Посмотреть статистику
      </Button>
      {isModalOpened && (
        <Modal
          setModalOpened={setModalOpened}
          contentClassName={styles.contentModal}>
          <ul className={styles.statsList}>
            {Object.entries(stats).map(([statName, statValue]) => {
              if (statValue === null) return;
              return (
                <li className={styles.statLine} key={statName}>
                  <span className={styles.statName}>{statName}:</span>{' '}
                  <span className={styles.statValue}>{statValue}</span>
                </li>
              );
            })}
          </ul>
        </Modal>
      )}
    </>
  );
};
