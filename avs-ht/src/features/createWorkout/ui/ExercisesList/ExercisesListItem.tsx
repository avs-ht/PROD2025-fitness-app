import { useAtom } from 'jotai';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

import { workoutFormAtom } from '../../model/workoutFormAtom';

import { swapElements } from '$/shared/lib/swapElements';
import { WorkoutExercise } from '$/shared/types';
import { AddExercisesModal } from './AddExercisesModal';
import styles from './ExercisesListItem.module.scss';

interface ExercisesListItemProps {
  itemOrder: number;
  title: string;
  targetStr: string;
  exerciseId: string;
}
export const ExercisesListItem = (props: ExercisesListItemProps) => {
  const { itemOrder, title, targetStr } = props;
  const [isModalShowed, setModalShowed] = useState(false);
  const [{ exercises }, setWorkoutForm] = useAtom(workoutFormAtom);
  const setExercises = (newExercises: WorkoutExercise[]) => {
    setWorkoutForm(prev => ({
      ...prev,
      exercises: newExercises
    }));
  };
  const itemIndex = itemOrder - 1;
  return (
    <>
      <AddExercisesModal
        isModalShowed={isModalShowed}
        setModalShowed={setModalShowed}
        editingExerciseIndex={itemIndex}
      />
      <li className={styles.item} onClick={() => setModalShowed(true)}>
        <span className={styles.itemName}>
          <span className={styles.itemOrder}>{itemOrder}.</span>{' '}
          <span className={styles.itemTitle}>{title}</span>
          <span className={styles.itemTarget}>
            {targetStr === '' ? '' : `[${targetStr}]`}
          </span>
        </span>
        <div className={styles.changeOrderButtons}>
          {itemIndex !== 0 && (
            <button
              className={styles.changeOrderButton}
              onClick={() =>
                setExercises(swapElements(exercises, itemIndex - 1, itemIndex))
              }>
              <ChevronUp />
            </button>
          )}
          {itemIndex !== exercises.length - 1 && (
            <button
              className={styles.changeOrderButton}
              onClick={() =>
                setExercises(swapElements(exercises, itemIndex, itemIndex + 1))
              }>
              <ChevronDown />
            </button>
          )}
        </div>
      </li>
    </>
  );
};
