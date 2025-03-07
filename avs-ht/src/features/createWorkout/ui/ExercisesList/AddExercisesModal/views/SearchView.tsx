import { useRef, useState } from 'react';

import { FindedExercisesList } from '../components/FindedExercisesList';

import { getAllExercises } from '$/pages/exercises/lib/getAllExercises';
import { Input, Title } from '$/shared/ui';
import styles from './SearchView.module.scss';

export const SearchView = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const setFocus = () => {
    inputRef.current?.focus();
  };
  const filteredExercise = getAllExercises().filter(ex =>
    ex.title.toLowerCase().includes(inputRef.current?.value.toLowerCase() || '')
  );
  return (
    <>
      <Input
        labelName='Поиск'
        isSetupInputAsText
        className={styles.input}
        ref={inputRef}
        setFocus={setFocus}
        value={inputValue}
        onChange={e => {
          setInputValue(e.currentTarget.value);
        }}
      />
      <Title tag='span'>Результат</Title>
      <FindedExercisesList exercises={filteredExercise} />
    </>
  );
};
