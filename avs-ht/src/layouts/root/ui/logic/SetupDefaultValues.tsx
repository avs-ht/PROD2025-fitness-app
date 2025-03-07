import { useEffect } from 'react';

import defaultExercises from '../../data/defaultExercises.json';
import defaultWorkouts from '../../data/defaultWorkouts.json';

import {
  DEFAULT_DATA_LOCAL_STORAGE_KEY,
  EXERCISES_LOCAL_STORAGE_KEY,
  WORKOUTS_LOCAL_STORAGE_KEY
} from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { setStorage } from '$/shared/lib';

export const SetupDefaultValues = () => {
  useEffect(() => {
    const isDefaultDataLoaded = getStorage(DEFAULT_DATA_LOCAL_STORAGE_KEY);
    if (isDefaultDataLoaded === 'true') return;
    setStorage(EXERCISES_LOCAL_STORAGE_KEY, defaultExercises);
    setStorage(WORKOUTS_LOCAL_STORAGE_KEY, defaultWorkouts);
    setStorage(DEFAULT_DATA_LOCAL_STORAGE_KEY, 'true');
  }, []);
  return <></>;
};
