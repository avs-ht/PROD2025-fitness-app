import { useState } from 'react';

import { Button } from '$/shared/ui';
import styles from './AddExercisesButtons.module.scss';
import { AddExercisesModal } from './AddExercisesModal';
import { AutoCreatingModal } from './AutoCreatingModal';

export const AddExercisesButtons = () => {
  const [isAddExerciseModalShowed, setAddExerciseModalShowed] = useState(false);
  const [isAutoCreatingModalShowed, setAutoCreatingModalShowed] =
    useState(false);
  return (
    <>
      <AddExercisesModal
        isModalShowed={isAddExerciseModalShowed}
        setModalShowed={setAddExerciseModalShowed}
      />
      <AutoCreatingModal
        isModalShowed={isAutoCreatingModalShowed}
        setModalShowed={setAutoCreatingModalShowed}
      />
      <div className={styles.buttons}>
        <Button
          type='button'
          className={styles.button}
          onClick={() => setAddExerciseModalShowed(true)}>
          Добавить упражнение
        </Button>
        <Button
          type='button'
          className={styles.button}
          onClick={() => setAutoCreatingModalShowed(true)}>
          Подобрать упражнения по тегам
        </Button>
      </div>
    </>
  );
};
