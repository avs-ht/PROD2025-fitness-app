import {
  FILTERS_CATEGORIES,
  FILTERS_CATEGORIES_NAME
} from '$/shared/constants';
import { DifficultyType, ExerciseType, MuscleType } from '$/shared/types';
import { FiltersKeys } from '$/shared/types';
import { Title } from '$/shared/ui';
import styles from './DefaultFilters.module.scss';

interface DefaultFiltersDisplayProps {
  difficulty: DifficultyType;
  type: ExerciseType;
  muscle: MuscleType;
}
export const DefaultFiltersDisplay = (props: DefaultFiltersDisplayProps) => {
  return (
    <div className={styles.filters}>
      {Object.keys(FILTERS_CATEGORIES).map(key => {
        const filtersCategory = FILTERS_CATEGORIES[key as FiltersKeys];
        const filtersCategoryName = FILTERS_CATEGORIES_NAME[key as FiltersKeys];
        const filgtersCategoryValue =
          filtersCategory[
            props[key as FiltersKeys] as keyof typeof filtersCategory
          ];
        return (
          <>
            <Title tag='h3' className={styles.filterTitle} key={key}>
              <span>{filtersCategoryName}:</span>
              <span>{filgtersCategoryValue}</span>
            </Title>
          </>
        );
      })}
    </div>
  );
};
