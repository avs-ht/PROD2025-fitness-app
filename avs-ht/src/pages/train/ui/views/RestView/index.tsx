import { useSetAtom } from 'jotai';

import { getSecondsByTimeUnit } from '../../../lib/getTimeByUnit';
import { trainStageAtom } from '../../../model/trainAtom';
import { RemainingExercises } from '../RemainingExercises';
import { SkipButton } from '../SkipButton';

import { getWorkoutById } from '$/pages/workouts';
import { ID } from '$/shared/types';
import { CircularTimer, Title } from '$/shared/ui';
import { NextExercise } from './NextExercise';
import styles from './index.module.scss';

export const RestView = ({ id }: ID) => {
  const { restTime, restTimeUnit, exercises } = getWorkoutById(id)!;
  const setTrainStage = useSetAtom(trainStageAtom);
  const restTimeEndedCallback = () => {
    setTrainStage('exercise');
  };
  const duration = getSecondsByTimeUnit(restTime, restTimeUnit);
  return (
    <>
      <Title tag='h1' className={styles.title}>
        Перерыв
      </Title>

      <div className={styles.timer}>
        <CircularTimer
          duration={duration}
          timeEndedCallback={restTimeEndedCallback}
        />
      </div>
      <SkipButton className={styles.skipButton} exercises={exercises} />
      <RemainingExercises allExercisesLength={exercises.length} />
      <NextExercise />
    </>
  );
};
