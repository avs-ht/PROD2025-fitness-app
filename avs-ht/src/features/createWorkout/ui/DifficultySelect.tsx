import { useAtom } from 'jotai';

import { getWorkoutDifficulty } from '../lib/getWorkoutDifficulty';
import { workoutFormAtom } from '../model/workoutFormAtom';

import { DifficultyType } from '$/shared/types';
import { FiltersSelect, Title } from '$/shared/ui';
import styles from './DifficultySelect.module.scss';

export const DifficultySelect = () => {
  const [workoutFormValue, setWorkoutFormValue] = useAtom(workoutFormAtom);
  const isManualDiff = workoutFormValue.difficulty !== 'auto';
  return (
    <div className={styles.container}>
      <Title tag='div' className={styles.title}>
        <span className={styles.staticTitle}>Способ вычисления сложности:</span>
        <div className={styles.difficultySelects}>
          <button
            type='button'
            disabled={!isManualDiff}
            className={styles.autoButton}
            onClick={() =>
              setWorkoutFormValue(prev => ({
                ...prev,
                difficulty: 'auto'
              }))
            }>
            На основе сложности упражнений
          </button>
          <div className={styles.separator}>|</div>
          <button
            type='button'
            disabled={isManualDiff}
            className={styles.manualButton}
            onClick={() =>
              setWorkoutFormValue(prev => ({
                ...prev,
                difficulty: 'easy'
              }))
            }>
            Вручную
          </button>
        </div>
      </Title>
      {isManualDiff ? (
        <FiltersSelect.difficulty
          value={workoutFormValue.difficulty}
          onChange={value =>
            setWorkoutFormValue({
              ...workoutFormValue,
              difficulty: value as DifficultyType
            })
          }
        />
      ) : (
        <span className={styles.autoDifficultyText}>
          Высчитанная сложность:{' '}
          {getWorkoutDifficulty(workoutFormValue.exercises)}
        </span>
      )}
    </div>
  );
};
