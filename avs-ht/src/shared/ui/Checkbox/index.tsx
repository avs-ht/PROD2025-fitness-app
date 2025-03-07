import { Check } from 'lucide-react';

import { clsx } from '$/shared/lib';
import styles from './index.module.scss';

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  className?: string;
}

export const Checkbox = (props: CheckboxProps) => {
  const { label = '', className = '', id, ...inputProps } = props;
  return (
    <div className={clsx(styles.checkContainer, className)}>
      <input type='checkbox' id={id} {...inputProps} className={styles.input} />
      <div className={styles.inputContainer}>
        <Check className={styles.checkIcon} />
      </div>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
