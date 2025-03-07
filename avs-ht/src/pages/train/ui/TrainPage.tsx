import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { trainAtom, trainStageAtom } from '../model/trainAtom';

import { Page404 } from '$/pages/404';
import { getWorkoutById } from '$/pages/workouts';
import {
  TEMPORARY_WORKOUT_LOCAL_STORAGE_KEY,
  TRAIN_STATE_LOCAL_STORAGE_KEY
} from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { ID, TrainState } from '$/shared/types';
import { Page } from '$/shared/ui';
import { InterruptPage } from './InterruptPage';
import { SessionListener } from './logic/SessionListener';
import { StageViews } from './views';

export const TrainPage = ({ id }: ID) => {
  const workout = getWorkoutById(id);
  const currStage = useAtomValue(trainStageAtom);
  const trainState = getStorage<TrainState>(TRAIN_STATE_LOCAL_STORAGE_KEY);
  const setTrainState = useSetAtom(trainAtom);
  useEffect(() => {
    if (trainState.trainStage !== 'start') return;
    setTrainState(prev => ({
      ...prev,
      workoutId: id,
      trainStage:
        typeof getStorage(TEMPORARY_WORKOUT_LOCAL_STORAGE_KEY) === 'string'
          ? 'rest'
          : 'start'
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!workout || !currStage) return <Page404 />;

  if (currStage !== 'start' && !['', trainState.workoutId].includes(id)) {
    return (
      <InterruptPage currStateId={trainState.workoutId} pageWorkoutId={id} />
    );
  }

  const CurrStageView = StageViews[currStage];

  return (
    <Page>
      <SessionListener />
      <CurrStageView id={id} />
    </Page>
  );
};
