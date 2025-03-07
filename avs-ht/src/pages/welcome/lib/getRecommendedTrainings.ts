import { WORKOUTS_LOCAL_STORAGE_KEY } from '$/shared/constants';
import { getShuffledArray, getStorage } from '$/shared/lib';
import { Workout } from '$/shared/types';

interface RecommendedTraining {
  id: string;
  title: string;
}
export const getRecommendedTrainings: () => Array<RecommendedTraining> = () => {
  return getShuffledArray(getStorage<Workout[]>(WORKOUTS_LOCAL_STORAGE_KEY))
    .slice(0, 3)
    .map(({ id, title }) => ({ id, title }));
};
