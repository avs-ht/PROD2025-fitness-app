import { useAtomValue, useSetAtom } from 'jotai';
import { useState } from 'react';

import { getAutoTargetGoal } from '$/features/createWorkout/lib/getAutoTargetGoal';
import { getAutoTargetType } from '$/features/createWorkout/lib/getAutoTargetType';
import { getTargetStr } from '$/features/createWorkout/lib/getTargetStr';
import { workoutFormAtom } from '$/features/createWorkout/model/workoutFormAtom';
import { playerAtom } from '$/pages/profile';
import { settingsAtom } from '$/pages/settings';
import { clsx } from '$/shared/lib';
import { Exercise, WorkoutExercise } from '$/shared/types';
import { Button } from '$/shared/ui';
import styles from './AutoSelectedExercises.module.scss';

interface AutoSelectedExercisesProps {
  exercises: Exercise[];
  setAutoSelectedExercises: (exercises: Exercise[] | null) => void;
}
export const AutoSelectedExercises = ({
  exercises,
  setAutoSelectedExercises
}: AutoSelectedExercisesProps) => {
  const [notToAddExercisesIndex, setNotToAddExercisesIndex] = useState<
    number[]
  >([]);
  const player = useAtomValue(playerAtom);
  const setWorkoutForm = useSetAtom(workoutFormAtom);
  const {
    checks: { autoTargetGoal }
  } = useAtomValue(settingsAtom);
  const [exercisesTargetData] = useState(
    exercises.map(ex => {
      const targetType = autoTargetGoal
        ? getAutoTargetType(ex.title)
        : 'custom';
      const target = getAutoTargetGoal(targetType, player);
      return {
        targetType: targetType || 'custom',
        targetValue: target?.targetValue || 0,
        targetUnit: target?.targetUnit || '',
        customTarget: ''
      };
    })
  );
  const setWorkoutExercises = (addFunc: (exs: WorkoutExercise[]) => void) => {
    const exercisesWithoutNotToAdd = exercises.filter(
      (_, index) => !notToAddExercisesIndex.includes(index)
    );
    const targetsWithoutNotToAdd = exercisesTargetData.filter(
      (_, index) => !notToAddExercisesIndex.includes(index)
    );
    const workoutExercises = exercisesWithoutNotToAdd.map((ex, index) => {
      const targetData = targetsWithoutNotToAdd[index];
      return {
        exerciseId: ex.id,
        ...targetData
      } as WorkoutExercise;
    });
    addFunc(workoutExercises);
  };
  return (
    <>
      <ul className={styles.list}>
        {exercises.map((ex, index) => {
          const isNotToAdd = notToAddExercisesIndex.includes(index);
          const clickFunc = () => {
            if (isNotToAdd) {
              setNotToAddExercisesIndex(
                notToAddExercisesIndex.filter(i => i !== index)
              );
            } else {
              setNotToAddExercisesIndex([...notToAddExercisesIndex, index]);
            }
          };
          const targetStr = getTargetStr(exercisesTargetData[index]);
          return (
            <li
              key={ex.id}
              onClick={clickFunc}
              className={clsx(styles.item, isNotToAdd && styles.notToAdd)}>
              {index + 1}. {ex.title} {targetStr}
            </li>
          );
        })}
      </ul>
      <div className={styles.buttons}>
        <Button
          type='button'
          className={styles.button}
          onClick={() =>
            setWorkoutExercises(workoutExercises =>
              setWorkoutForm(prev => ({ ...prev, exercises: workoutExercises }))
            )
          }>
          Установить данный план тренировки
        </Button>
        <Button
          type='button'
          className={styles.button}
          onClick={() =>
            setWorkoutExercises(workoutExercises =>
              setWorkoutForm(prev => ({
                ...prev,
                exercises: [...prev.exercises, ...workoutExercises]
              }))
            )
          }>
          Добавить к текущему плану
        </Button>
        <Button
          onClick={() => setAutoSelectedExercises(null)}
          className={styles.button}>
          Вернуться назад
        </Button>
      </div>
    </>
  );
};
