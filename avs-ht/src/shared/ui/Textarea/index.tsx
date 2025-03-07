import { HTMLProps, useRef, useState } from 'react';
import {
  type Control,
  type FieldValues,
  Path,
  useController
} from 'react-hook-form';

import { clsx } from '$/shared/lib';
import styles from './index.module.scss';

interface TextareaProps<E extends FieldValues>
  extends HTMLProps<HTMLTextAreaElement> {
  name: string;
  control: Control<E, unknown> | undefined;
  labelName: string;
  isSetupTextareaAsText?: boolean;
}
export const Textarea = <E extends FieldValues>(props: TextareaProps<E>) => {
  const { name, control, className, isSetupTextareaAsText, labelName } = props;
  const {
    field: { ref, onBlur, ...other }
  } = useController({
    name: name as Path<E>,
    control
  });
  const [textareaAsText, setTextareaAsText] = useState(isSetupTextareaAsText);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  return (
    <div className={clsx(styles.textareaContainer, className)}>
      <span
        className={styles.title}
        data-canbetextareatext={isSetupTextareaAsText}>
        {labelName}
      </span>
      <textarea
        ref={e => {
          ref?.(e);
          textareaRef.current = e;
        }}
        onBlur={() => {
          onBlur?.();
          if (isSetupTextareaAsText) setTextareaAsText(true);
        }}
        onFocus={() => {
          if (isSetupTextareaAsText) setTextareaAsText(false);
        }}
        onKeyUp={e => {
          if (e.key === 'Escape' && e.target === e.currentTarget) {
            if (isSetupTextareaAsText) setTextareaAsText(true);
            e.currentTarget.blur();
          }
        }}
        {...other}
        className={clsx(styles.textarea, textareaAsText && styles.asText)}
      />
      {textareaAsText && (
        <button
          className={styles.asTextButton}
          onClick={() => {
            setTextareaAsText(false);
            textareaRef.current?.focus();
          }}></button>
      )}
    </div>
  );
};
