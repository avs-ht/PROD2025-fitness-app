import { useState } from 'react';

import { getAutoSelectedExercises } from '$/features/createWorkout/lib/getAutoSelectedExercises';
import { FILTERS_CATEGORIES } from '$/shared/constants';
import { DefaultFilters, Exercise, FiltersKeys } from '$/shared/types';
import { Button, FiltersSelect, Title } from '$/shared/ui';
import styles from './Selects.module.scss';

interface SelectsProps {
  setAutoSelectedExercises: (exercises: Exercise[] | null) => void;
}
export const Selects = ({ setAutoSelectedExercises }: SelectsProps) => {
  const [lackOfExercises, setLackOfExercises] = useState(false);
  const [filtersValue, setFiltersValue] = useState<DefaultFilters>({
    type: 'strength',
    muscle: 'whole',
    difficulty: 'easy'
  });

  return (
    <>
      <Title tag='h3' textAlign='left' className={styles.title}>
        Давайте подберем план тренировки по следующим параметрам
      </Title>
      {Object.keys(FILTERS_CATEGORIES).map(key => {
        const typedKey = key as FiltersKeys;
        return (
          <div key={key}>
            {FiltersSelect[typedKey]({
              value: filtersValue[typedKey],
              onChange: value =>
                setFiltersValue(prev => ({ ...prev, [key]: value }))
            })}
          </div>
        );
      })}
      {lackOfExercises && (
        <span className={styles.lackOfExercises}>
          Упражнений с такими фильтрами нет!
        </span>
      )}
      <Button
        onClick={() => {
          const exercises = getAutoSelectedExercises(filtersValue);
          if (exercises.length === 0) {
            setLackOfExercises(true);
            return;
          }
          setLackOfExercises(false);
          setAutoSelectedExercises(exercises);
        }}>
        Подобрать план
      </Button>
    </>
  );
};
