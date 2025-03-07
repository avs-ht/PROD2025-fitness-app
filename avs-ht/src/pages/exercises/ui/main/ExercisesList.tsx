import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';
import { ChevronFirst } from 'lucide-react';
import { useState } from 'react';

import { getAllExercises } from '../../lib/getAllExercises';
import { getFilteredExercises } from '../../lib/getFilteredExercises';
import { filtersAtom } from '../../model/filtersAtom';

import { ExerciseCard } from '$/entities/exercise';
import { useArrayIndex } from '$/shared/lib/hooks';
import { Button, Title } from '$/shared/ui';
import styles from './ExercisesList.module.scss';

const LIST_STEP = 8;
export const ExercisesList = () => {
  const filters = useAtomValue(filtersAtom);
  const exercises = getAllExercises();
  const filteredExercises = getFilteredExercises(exercises, filters).sort(
    (a, b) => a.title.length - b.title.length
  );
  const [isExercisesHidden, setExercisesHidden] = useState(false);
  const amountOfLists = Math.ceil(filteredExercises.length / LIST_STEP);
  const { index, increaseIndex, reduceIndex } = useArrayIndex(
    Array.from({ length: amountOfLists })
  );
  return (
    <>
      <Title tag='h3' className={styles.mainTitle}>
        <span className={styles.mainTitleContent}>
          <span>Резульутат</span>
          <span
            className={styles.closeButtonIcon}
            data-categories-hidden={isExercisesHidden}>
            <ChevronFirst size={32} />
          </span>
          <button
            className={styles.closeCategoriesButton}
            onClick={() => {
              setExercisesHidden(prev => !prev);
            }}></button>
        </span>
      </Title>
      {amountOfLists > 1 && (
        <>
          <div className={styles.buttons}>
            <Button onClick={reduceIndex}>Пред. упражнения</Button>
            <Button onClick={increaseIndex}>След. упражнения</Button>
          </div>
        </>
      )}
      <ul className={styles.exercisesList} data-visibility={isExercisesHidden}>
        {filteredExercises
          .slice(index * LIST_STEP, (index + 1) * LIST_STEP)
          .map(exercise => (
            <ExerciseCard exercise={exercise} key={exercise.id} />
          ))}
        {filteredExercises.length === 0 && (
          <p className={styles.noFound}>
            К сожалению, ничего не нашлоcь
            <Link
              to='/exercises/add'
              search={{
                preset: 'filters'
              }}
              className={styles.link}>
              Добавьте свое упражнение с такими параметрами
            </Link>
          </p>
        )}
      </ul>
    </>
  );
};
