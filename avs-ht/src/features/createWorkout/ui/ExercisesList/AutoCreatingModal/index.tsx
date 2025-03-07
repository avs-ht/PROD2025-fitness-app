import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

import { workoutFormAtom } from '$/features/createWorkout/model/workoutFormAtom';
import { Exercise } from '$/shared/types';
import { Modal } from '$/shared/ui';
import { AutoSelectedExercises } from './AutoSelectedExercises';
import { Selects } from './Selects';
import styles from './index.module.scss';

interface AutoCreatingModalProps {
  isModalShowed: boolean;
  setModalShowed: (isModalShowed: boolean) => void;
}

export const AutoCreatingModal = (props: AutoCreatingModalProps) => {
  const { isModalShowed, setModalShowed } = props;
  const [autoSelectedExercises, setAutoSelectedExercises] = useState<
    Exercise[] | null
  >(null);
  const { exercises } = useAtomValue(workoutFormAtom);
  useEffect(() => {
    setModalShowed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercises]);

  useEffect(() => {
    if (!isModalShowed) {
      setAutoSelectedExercises(null);
    }
  }, [isModalShowed]);
  return (
    <>
      {isModalShowed && (
        <Modal
          setModalOpened={setModalShowed}
          contentClassName={styles.modalContent}>
          {!autoSelectedExercises || autoSelectedExercises.length === 0 ? (
            <Selects setAutoSelectedExercises={setAutoSelectedExercises} />
          ) : (
            <AutoSelectedExercises
              exercises={autoSelectedExercises}
              setAutoSelectedExercises={setAutoSelectedExercises}
            />
          )}
        </Modal>
      )}
    </>
  );
};
