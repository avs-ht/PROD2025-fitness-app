import { useAtom } from 'jotai';
import { useEffect } from 'react';

import { exerciseSettingsAtom } from '$/features/createWorkout/model/exerciseSettingsAtom';
import { Modal } from '$/shared/ui';
import styles from './index.module.scss';
import { ExerciseSettingsView } from './views/ExerciseSettingsView';
import { SearchView } from './views/SearchView';

interface AddExerciseModalProps {
  isModalShowed: boolean;
  setModalShowed: (isModalShowed: boolean) => void;
  editingExerciseIndex?: number;
}
export const AddExercisesModal = (props: AddExerciseModalProps) => {
  const { isModalShowed, setModalShowed, editingExerciseIndex } = props;
  const [{ exerciseId }, setExerciseSetting] = useAtom(exerciseSettingsAtom);
  const isEditingExercise = typeof editingExerciseIndex !== 'undefined';

  useEffect(() => {
    if (!isModalShowed) {
      setExerciseSetting({ exerciseId: null, customTarget: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isModalShowed]);
  useEffect(() => {
    if (exerciseId == null) {
      setModalShowed(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseId]);

  return (
    isModalShowed && (
      <Modal
        setModalOpened={setModalShowed}
        contentClassName={styles.modalContent}>
        {!isEditingExercise && !exerciseId ? (
          <SearchView />
        ) : (
          <ExerciseSettingsView editingExerciseIndex={editingExerciseIndex} />
        )}
      </Modal>
    )
  );
};
