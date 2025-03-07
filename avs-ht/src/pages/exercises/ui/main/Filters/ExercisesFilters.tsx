import { useSetAtom } from 'jotai';
import { ChevronFirst } from 'lucide-react';
import { useState } from 'react';

import { filtersAtom } from '../../../model/filtersAtom';

import {
  FILTERS_CATEGORIES,
  FILTERS_CATEGORIES_NAME
} from '$/shared/constants';
import { FiltersKeys } from '$/shared/types';
import { Title } from '$/shared/ui';
import styles from './ExercisesFilters.module.scss';
import { FilterButton } from './FilterButton';
import { UserFilters } from './UserFilters';

export const ExercisesFilters = () => {
  const setFilters = useSetAtom(filtersAtom);
  const delFilter = (filterName: FiltersKeys, filterValue: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: prev[filterName].filter(item => item !== filterValue)
    }));
  };
  const addFilter = (filterName: FiltersKeys, filterValue: string) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: [...prev[filterName], filterValue]
    }));
  };

  const [isCategoriesHidden, setCategoriesHidden] = useState(false);
  return (
    <div className={styles.container}>
      <Title tag='h3' className={styles.mainTitle}>
        <span className={styles.mainTitleContent}>
          <span>Категории</span>
          <span
            className={styles.closeButtonIcon}
            data-categories-hidden={isCategoriesHidden}>
            <ChevronFirst size={32} />
          </span>
          <button
            className={styles.closeCategoriesButton}
            onClick={() => {
              setCategoriesHidden(prev => !prev);
            }}></button>
        </span>
      </Title>
      <div className={styles.categories} data-visible={isCategoriesHidden}>
        {Object.entries(FILTERS_CATEGORIES).map(
          ([categoryName, categoryList]) => {
            const filterName = categoryName as FiltersKeys;
            return (
              <div className={styles.category} key={categoryName}>
                <Title tag='h4' className={styles.categoryName}>
                  {FILTERS_CATEGORIES_NAME[filterName]}
                </Title>
                <div className={styles.categoryFilters}>
                  {Object.entries(categoryList).map(
                    ([filterId, filterValue]) => {
                      return (
                        <FilterButton
                          key={filterId}
                          handlers={{ delFilter, addFilter }}
                          filterId={filterId}
                          filterName={filterName}>
                          {filterValue}
                        </FilterButton>
                      );
                    }
                  )}
                </div>
              </div>
            );
          }
        )}
        <UserFilters />
      </div>
    </div>
  );
};
