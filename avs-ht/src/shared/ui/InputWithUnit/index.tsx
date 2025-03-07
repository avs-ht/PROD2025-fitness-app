import { Input, InputProps } from '../Input';
import { Select } from '../Select';
import { Title } from '../Title';

import { clsx, formatInputValue } from '$/shared/lib';
import { OptionType } from '$/shared/types';
import styles from './index.module.scss';

export interface InputWithUnitProps extends Omit<InputProps, 'value'> {
  value: { inputValue: number; inputUnit: string };
  setValue: (value: { inputValue: number; inputUnit: string }) => void;
  selectPlaceholder: string;
  selectOptions: OptionType[];
}
export const InputWithUnit = (props: InputWithUnitProps) => {
  const { selectPlaceholder, value, setValue, selectOptions, labelName } =
    props;
  const { inputValue, inputUnit } = value;
  const isSelectVisible = selectOptions.length !== 0;
  return (
    <div className={styles.container}>
      <Title tag='label' className={styles.label}>
        {labelName}
      </Title>
      <div className={styles.inputContainer}>
        <Input
          value={inputValue}
          className={clsx(
            styles.input,
            !isSelectVisible && styles.inputWithoutSelect
          )}
          onChange={e => {
            setValue({
              ...value,
              inputValue: formatInputValue(e.currentTarget.value)
            });
          }}
        />
        {isSelectVisible && (
          <Select
            className={styles.select}
            placeholder={selectPlaceholder}
            options={selectOptions}
            onChange={newVal => setValue({ ...value, inputUnit: newVal })}
            value={inputUnit}
          />
        )}
      </div>
    </div>
  );
};
