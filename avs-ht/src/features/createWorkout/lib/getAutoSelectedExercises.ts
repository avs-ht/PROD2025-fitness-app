import { getAllExercises } from '$/pages/exercises/lib/getAllExercises';
import { getFilteredExercises } from '$/pages/exercises/lib/getFilteredExercises';
import { FILTERS_CATEGORIES } from '$/shared/constants';
import { getRand } from '$/shared/lib/randomNumber';
import { getShuffledArray } from '$/shared/lib/shuffleArray';
import { DefaultFilters } from '$/shared/types';

export const getAutoSelectedExercises = (filters: DefaultFilters) => {
  const filtersForMethod = Object.fromEntries(
    Object.entries(filters).map(([key, value]) => [key, [value]])
  ) as {
    [K in keyof typeof FILTERS_CATEGORIES]: (keyof (typeof FILTERS_CATEGORIES)[K])[];
  };
  const exercises = getFilteredExercises(getAllExercises(), {
    ...filtersForMethod,
    tags: [],
    equipment: []
  });
  const maxAmountOfExercises = getRand(6, 9);
  return getShuffledArray(exercises).slice(0, maxAmountOfExercises);
};
