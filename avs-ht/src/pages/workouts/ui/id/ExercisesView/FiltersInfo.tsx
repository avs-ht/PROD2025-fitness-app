import { getEquipment, getTag } from '$/pages/exercises';
import {
  FILTERS_CATEGORIES,
  FILTERS_CATEGORIES_NAME
} from '$/shared/constants';
import { Exercise, FiltersKeys } from '$/shared/types';
import styles from './FiltersInfo.module.scss';

export const FiltersInfo = ({ exercise }: { exercise: Exercise }) => {
  const { equipment, tags } = exercise;
  const equipmentStr = equipment.map(eq => getEquipment(eq)).join(', ');
  const tagsStr = tags.map(t => getTag(t)).join(', ');
  return (
    <div className={styles.filtersInfo}>
      {Object.entries(FILTERS_CATEGORIES).map(([k, v]) => {
        const typedKey = k as FiltersKeys;
        const categoryName = FILTERS_CATEGORIES_NAME[typedKey];
        const valueStr =
          v[
            exercise[
              typedKey === 'type' ? 'exerciseType' : typedKey
            ] as keyof typeof v
          ];
        return (
          <p className={styles.filterTitle} key={typedKey}>
            <span className={styles.filterTitleName}>{categoryName}</span>:{' '}
            <span className={styles.filterTitleValue}>{valueStr}</span>
          </p>
        );
      })}
      {equipment.length > 0 && (
        <p className={styles.filterTitle}>
          <span className={styles.filterTitleName}>Снаряжение:</span>{' '}
          <span className={styles.filterTitleValue}>{equipmentStr}</span>
        </p>
      )}
      {tags.length > 0 && (
        <p className={styles.filterTitle}>
          <span className={styles.filterTitleName}>Ваши теги:</span>{' '}
          <span className={styles.filterTitleValue}>{tagsStr}</span>
        </p>
      )}
    </div>
  );
};
