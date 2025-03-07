import { X } from 'lucide-react';

import { OptionType } from '$/shared/types';
import styles from './MoreSelect.module.scss';

interface MoreSelectsProps {
  value: string[];
  setValues: (values: string[]) => void;
  options: OptionType[];
}

export const MoreSelects = ({
  value,
  setValues,
  options
}: MoreSelectsProps) => {
  return (
    <div className={styles.selects}>
      {value.map(v => {
        const buttonLabel = options.find(o => o.value === v)?.label;
        if (!buttonLabel) return;
        return (
          <button
            type='button'
            className={styles.valueButton}
            onClick={() => setValues(value.filter(val => val !== v))}>
            <span>{buttonLabel}</span>
            <X size={16} />
          </button>
        );
      })}
    </div>
  );
};
