import { ChevronDown, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Modal } from '../Modal';

import { clsx } from '$/shared/lib';
import { OptionType } from '$/shared/types';
import { MoreSelects } from './MoreSelects';
import styles from './index.module.scss';

const MAX_SELECTS_CAPABLE = 3;
interface MultipleSelectProps {
  title: string;
  value: string[];
  setValues: (values: string[]) => void;
  addButtonFunc?: () => void;
  addButtonText?: string;
  options: OptionType[];
  placholder?: string;
  rootClassName?: string;
}
export const MultipleSelect = (props: MultipleSelectProps) => {
  const {
    title,
    options,
    setValues,
    value,
    addButtonFunc,
    addButtonText,
    placholder,
    rootClassName
  } = props;
  const selectRef = useRef<HTMLSelectElement | null>(null);
  const selectsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(e.target as Node) &&
        selectsRef.current &&
        !selectsRef.current.contains(e.target as Node)
      ) {
        setSelectActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const selectId = `${title}-multiple-select`;
  const [isSelectActive, setSelectActive] = useState(false);
  const avaibleOptions = [
    ...(addButtonFunc
      ? [{ value: 'add', label: addButtonText || 'Редактировать' }]
      : []),
    ...options.filter(({ value: v }) => !value.includes(v))
  ];
  const [isMoreSelectsModalOpened, setMoreSelectsModalOpened] = useState(false);
  return (
    <div className={clsx(styles.selectContainer, rootClassName)}>
      <label htmlFor={selectId} className={styles.title}>
        {title}
      </label>
      <div
        ref={selectsRef}
        className={styles.selectsContainer}
        data-active={isSelectActive}>
        {value.slice(0, MAX_SELECTS_CAPABLE).map(v => {
          const buttonLabel = options.find(o => o.value === v)?.label;
          if (!buttonLabel) return;
          return (
            <button
              key={v}
              type='button'
              className={styles.valueButton}
              onClick={() => setValues(value.filter(val => val !== v))}>
              <span>{buttonLabel}</span>
              <X size={16} />
            </button>
          );
        })}
        {value.length > MAX_SELECTS_CAPABLE && (
          <>
            <button
              type='button'
              onClick={() => setMoreSelectsModalOpened(true)}
              className={styles.valueButton}>
              +{value.length - MAX_SELECTS_CAPABLE}
            </button>
            {isMoreSelectsModalOpened && (
              <Modal setModalOpened={setMoreSelectsModalOpened}>
                <MoreSelects
                  value={value}
                  setValues={setValues}
                  options={options}
                />
              </Modal>
            )}
          </>
        )}
        <span>{value.length === 0 && placholder && placholder}</span>
        <div className={styles.selectButtons}>
          <button
            className={styles.openButton}
            type='button'
            onClick={() => {
              setSelectActive(!isSelectActive);
            }}>
            <ChevronDown />
          </button>
        </div>
      </div>

      {isSelectActive && (
        <select
          ref={selectRef}
          disabled={avaibleOptions.length === 0}
          className={styles.select}
          multiple={true}
          id={selectId}
          onChange={e => {
            const newValue = Array.from(e.target.selectedOptions).map(
              o => o.value
            )[0];
            if (newValue === 'add') {
              addButtonFunc?.();
              setSelectActive(false);
              return;
            }
            setValues([...value, newValue]);
          }}
          value={value}
          data-active={isSelectActive}>
          {avaibleOptions.map(({ value, label }) => (
            <option key={value} value={value} className={styles.option}>
              {label}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};
