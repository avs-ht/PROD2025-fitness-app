import { useAtom, useAtomValue } from 'jotai';
import { useLayoutEffect } from 'react';

import { formAtom } from '../model/formAtom';

import { filtersAtom } from '$/pages/exercises/model/filtersAtom';

export const FiltersPreset = () => {
  const filters = useAtomValue(filtersAtom);
  const [form, setForm] = useAtom(formAtom);
  useLayoutEffect(() => {
    const { tags, equipment, ...otherFilters } = filters;
    setForm({
      ...form,
      tags,
      equipment,
      filters: {
        type: otherFilters.type?.[0] || 'strength',
        difficulty: otherFilters.difficulty?.[0] || 'easy',
        muscle: otherFilters.muscle?.[0] || 'whole'
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};
