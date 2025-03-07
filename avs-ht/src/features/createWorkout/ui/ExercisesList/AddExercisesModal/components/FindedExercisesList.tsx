import { useSetAtom } from 'jotai';

import { exerciseSettingsAtom } from '$/features/createWorkout/model/exerciseSettingsAtom';
import { FILTERS_CATEGORIES } from '$/shared/constants';
import { Exercise } from '$/shared/types';
import styles from './FindedExercisesList.module.scss';

interface FindedExercisesListProps {
  exercises: Exercise[];
}
export const FindedExercisesList = (props: FindedExercisesListProps) => {
  const setExerciseSetting = useSetAtom(exerciseSettingsAtom);
  const { exercises } = props;
  if (exercises.length === 0) return <div>Ничего не нашлось</div>;
  return (
    <ul className={styles.list}>
      {exercises.map(ex => {
        return (
          <li
            key={ex.id}
            className={styles.exercise}
            onClick={() => {
              setExerciseSetting(prev => ({ ...prev, exerciseId: ex.id }));
            }}>
            <span className={styles.exerciseType}>
              + [{FILTERS_CATEGORIES.type[ex.exerciseType]}]
            </span>
            <span className={styles.exerciseTitle}>{ex.title}</span>
          </li>
        );
      })}
    </ul>
  );
};
