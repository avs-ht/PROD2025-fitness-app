import { JSX } from 'react';

import { Select, SelectProps } from '../Select';

import {
  FILTERS_CATEGORIES,
  FILTERS_CATEGORIES_NAME
} from '$/shared/constants';
import { FiltersKeys } from '$/shared/types';

type FiltersSelectProps = Omit<SelectProps, 'placeholder' | 'options'>;
export const FiltersSelect = Object.fromEntries(
  Object.entries(FILTERS_CATEGORIES).map(([key, value]) => {
    return [
      key,
      (props: FiltersSelectProps) => {
        const options = Object.entries(value).map(([key, value]) => ({
          value: key,
          label: value
        }));
        const placeholder = FILTERS_CATEGORIES_NAME[key as FiltersKeys];
        return (
          <Select placeholder={placeholder} options={options} {...props} />
        );
      }
    ];
  })
) as Record<FiltersKeys, (props: FiltersSelectProps) => JSX.Element>;
