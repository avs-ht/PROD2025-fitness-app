import { useAtomValue } from 'jotai';

import { getTargetStr } from '../../lib/getTargetStr';
import { workoutFormAtom } from '../../model/workoutFormAtom';

import { getExerciseById } from '$/pages/exercises/lib/getExercise';
import { AddExercisesButtons } from './AddExercisesButtons';
import { ExercisesListItem } from './ExercisesListItem';
import styles from './index.module.scss';

export const ExercisesList = () => {
  const { exercises } = useAtomValue(workoutFormAtom);
  return (
    <div className={styles.componentContainer}>
      {exercises.length !== 0 ? (
        <ul className={styles.list}>
          {exercises.map((ex, index) => {
            const exerciseInfo = getExerciseById(ex.exerciseId);

            if (!exerciseInfo) return;
            const itemOrder = index + 1;
            const { targetValue, targetType, targetUnit, customTarget } = ex;
            const { title } = exerciseInfo;
            const targetStr = getTargetStr({
              targetType,
              targetValue,
              targetUnit,
              customTarget
            });

            return (
              <ExercisesListItem
                key={`${ex.exerciseId}-${index}`}
                exerciseId={ex.exerciseId}
                itemOrder={itemOrder}
                title={title}
                targetStr={targetStr || ''}
              />
            );
          })}
        </ul>
      ) : (
        <span className={styles.emptyMessage}>Пока нет упражнений</span>
      )}
      <AddExercisesButtons />
    </div>
  );
};
