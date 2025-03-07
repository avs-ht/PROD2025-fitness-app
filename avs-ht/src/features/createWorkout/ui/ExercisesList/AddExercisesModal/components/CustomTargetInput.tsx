import { useAtom } from 'jotai';
import { useRef } from 'react';

import { exerciseSettingsAtom } from '$/features/createWorkout/model/exerciseSettingsAtom';
import { Input } from '$/shared/ui';

export const CustomTargetInput = () => {
  const [exerciseSettingsValue, setExerciseSettingsValue] =
    useAtom(exerciseSettingsAtom);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const setFocus = () => {
    inputRef.current?.focus();
  };
  return (
    <Input
      setFocus={setFocus}
      ref={inputRef}
      isSetupInputAsText
      labelName='Ваша цель'
      value={exerciseSettingsValue.customTarget || ''}
      onChange={e => {
        setExerciseSettingsValue({
          ...exerciseSettingsValue,
          customTarget: e.currentTarget.value
        });
      }}
    />
  );
};
