import { Check, Pencil, Trash } from 'lucide-react';
import { useRef, useState } from 'react';

import { getStorage, setStorage } from '$/shared/lib/localStorageApi';
import { OptionType } from '$/shared/types';
import styles from './TagItem.module.scss';

interface TagItemProps {
  tagOption: OptionType;
  localStorageKey: string;
  setupCurrOptions: React.Dispatch<React.SetStateAction<OptionType[]>>;
  tagActionCallback: (lastName: string) => void;
}
export const TagItem = ({
  tagOption,
  localStorageKey,
  setupCurrOptions,
  tagActionCallback
}: TagItemProps) => {
  const initiallyValueRef = useRef(tagOption.label);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(tagOption.label);
  const [isInputEditable, setInputEditable] = useState(false);
  return (
    <li className={styles.item}>
      <span className={styles.itemContent}>
        <button
          type='button'
          onClick={() => {
            const currStorage = getStorage<OptionType[]>(localStorageKey);
            const newStorage = currStorage.filter(
              item => item.value !== tagOption.value
            );
            setStorage(localStorageKey, newStorage);
            setupCurrOptions(newStorage);
            tagActionCallback(initiallyValueRef.current);
          }}
          className={styles.deleteButton}
          data-input-editable={isInputEditable}>

          <Trash />
        </button>
        <button
          type='button'
          className={styles.editButton}
          onClick={() => {
            inputRef.current?.focus();
          }}>
          {isInputEditable ? <Check /> : <Pencil />}
        </button>

        <input
          ref={inputRef}
          onBlur={() => {
            setInputEditable(false);
            if (value === initiallyValueRef.current) return;
            if (value === '') {
              setValue(initiallyValueRef.current);
              return;
            }
            const currStorage = getStorage<OptionType[]>(localStorageKey);
            const indexOfTagOption = currStorage.indexOf(
              currStorage.find(item => item.value === tagOption.value) || {
                label: '',
                value: ''
              }
            );
            currStorage[indexOfTagOption] = {
              value: tagOption.value,
              label: value
            };
            setStorage(localStorageKey, currStorage);
            setupCurrOptions(currStorage);
            tagActionCallback(initiallyValueRef.current);
          }}
          onFocus={() => setInputEditable(true)}
          className={styles.input}
          type='text'
          value={value}
          onChange={e => setValue(e.currentTarget.value)}
        />
      </span>
    </li>
  );
};
