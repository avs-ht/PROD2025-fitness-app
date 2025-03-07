import LibSelect from 'react-select';

import { clsx } from '$/shared/lib';
import './select.scss';

export interface SelectProps {
  placeholder: string;
  className?: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  value: string;
}
export const Select = (props: SelectProps) => {
  const { placeholder, className, options, onChange, value } = props;
  return (
    <LibSelect
      options={options}
      onChange={e => {
        onChange(e?.value || '');
      }}
      placeholder={placeholder}
      noOptionsMessage={() => 'Нет походящих вариантов'}
      className={clsx('select', className)}
      value={options.find(item => item.value === value)}
    />
  );
};
