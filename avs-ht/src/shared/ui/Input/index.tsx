import { ComponentProps, useState } from 'react';

import { clsx } from '$/shared/lib';
import styles from './index.module.scss';

export interface InputProps extends ComponentProps<'input'> {
  labelName?: string;
  setFocus?: () => void;
  isSetupInputAsText?: boolean;
  errorMessage?: string;
}
export const Input = (props: InputProps) => {
  const {
    labelName,
    isSetupInputAsText,
    setFocus,
    className = '',
    onBlur,
    errorMessage,
    ...other
  } = props;
  const [inputAsText, setInputAsText] = useState(isSetupInputAsText);

  return (
    <div
      className={clsx(styles.inputContainer, className)}
      data-error={errorMessage}>
      {labelName && (
        <span
          className={styles.title}
          data-can-be-input-text={isSetupInputAsText}>
          {labelName}
        </span>
      )}
      <input
        {...other}
        data-input
        onBlur={e => {
          onBlur?.(e);
          if (isSetupInputAsText) {
            setInputAsText(true);
          }
        }}
        onFocus={() => {
          if (isSetupInputAsText) {
            setInputAsText(false);
          }
        }}
        onKeyUp={e => {
          if (e.key === 'Escape' && e.target === e.currentTarget) {
            if (isSetupInputAsText) setInputAsText(true);
            e.currentTarget.blur();
          }
        }}
        className={clsx(styles.input, inputAsText && styles.asText)}
      />
      {
        <span className={styles.errorMessage} data-input-error>
          {errorMessage || 'ErrorMessage'}
        </span>
      }
      {inputAsText && (
        <button
          className={styles.asTextButton}
          onClick={() => {
            setInputAsText(false);
            setFocus?.();
          }}></button>
      )}
    </div>
  );
};
