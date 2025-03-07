import { JSX } from 'react';

import { InputWithUnit, InputWithUnitProps } from '../InputWithUnit';

import { TARGETS_OPTION_CONTENT } from '$/shared/constants';
import { Key } from '$/shared/types/utils';

type UnitInputProps = Omit<
  InputWithUnitProps,
  'selectPlaceholder' | 'selectOptions'
>;

type TargetKey = Key<typeof TARGETS_OPTION_CONTENT>;
export const UnitsInput: Record<
  TargetKey,
  (props: UnitInputProps) => JSX.Element
> = Object.fromEntries(
  Object.keys(TARGETS_OPTION_CONTENT).map(key => [
    [key as TargetKey],
    (props: UnitInputProps) => {
      return (
        <InputWithUnit
          selectPlaceholder='Ед. измерения'
          selectOptions={Object.entries(
            TARGETS_OPTION_CONTENT[key as TargetKey]
          ).map(([key, value]) => ({
            value: key,
            label: value
          }))}
          {...props}
        />
      );
    }
  ])
);
