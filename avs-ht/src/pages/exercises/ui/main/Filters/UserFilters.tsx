import { useAtom } from 'jotai';

import { filtersAtom } from '$/pages/exercises/model/filtersAtom';
import {
  EQUIPMENT_LOCAL_STORAGE_KEY,
  TAGS_LOCAL_STORAGE_KEY
} from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { OptionType } from '$/shared/types';
import { MultipleSelect } from '$/shared/ui';
import styles from './UserFilters.module.scss';

export const UserFilters = () => {
  const [filters, setFilters] = useAtom(filtersAtom);
  const { equipment, tags } = filters;
  return (
    <div className={styles.selects}>
      <MultipleSelect
        title='Нужный инвентарь'
        value={equipment}
        rootClassName={styles.select}
        setValues={newValue =>
          setFilters({
            ...filters,
            equipment: newValue
          })
        }
        options={getStorage<OptionType[]>(EQUIPMENT_LOCAL_STORAGE_KEY)}
      />
      <MultipleSelect
        title='Пользовательские теги'
        value={tags}
        rootClassName={styles.select}
        setValues={newValue =>
          setFilters({
            ...filters,
            tags: newValue
          })
        }
        options={getStorage<OptionType[]>(TAGS_LOCAL_STORAGE_KEY)}
      />
    </div>
  );
};
