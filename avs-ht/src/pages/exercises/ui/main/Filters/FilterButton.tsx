import { useAtomValue } from 'jotai';

import { filtersAtom } from '../../../model/filtersAtom';

import { clsx } from '$/shared/lib';
import { FiltersKeys } from '$/shared/types';
import { Button } from '$/shared/ui';
import styles from './FilterButton.module.scss';

interface FilterButtonProps {
  handlers: {
    delFilter: (filterName: FiltersKeys, filterValue: string) => void;
    addFilter: (filterName: FiltersKeys, filterValue: string) => void;
  };
  children: React.ReactNode;
  filterName: FiltersKeys;
  filterId: string;
}
export const FilterButton = (props: FilterButtonProps) => {
  const {
    handlers: { delFilter, addFilter },
    filterName,
    filterId,
    children
  } = props;
  const currFilters = useAtomValue(filtersAtom);
  const isActive = !!currFilters[filterName].find(item => item === filterId);

  return (
    <Button
      className={clsx(styles.button, isActive && styles.active)}
      onClick={() => {
        if (isActive) {
          delFilter(filterName, filterId);
        } else {
          addFilter(filterName, filterId);
        }
      }}>
      {children}
    </Button>
  );
};
