import { InputWithUnit, InputWithUnitProps } from '../InputWithUnit';

import { TIME_UNITS } from '$/shared/constants';

type TimeUnitInputProps = Omit<
  InputWithUnitProps,
  'selectPlaceholder' | 'selectOptions'
>;
export const TimeUnitInput = (props: TimeUnitInputProps) => {
  return (
    <InputWithUnit
      selectPlaceholder='Ед. измерения'
      selectOptions={Object.entries(TIME_UNITS).map(([key, value]) => ({
        value: key,
        label: value
      }))}
      {...props}
    />
  );
};
