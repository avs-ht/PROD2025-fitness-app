import { useAtomValue, useSetAtom } from 'jotai';
import { useLayoutEffect } from 'react';

import { exerciseSettingsAtom } from '$/features/createWorkout/model/exerciseSettingsAtom';
import { workoutFormAtom } from '$/features/createWorkout/model/workoutFormAtom';
import { TargetType } from '$/shared/types';

interface SetupProps {
  exerciseIndex: number;
  setTargetType: (targetType: TargetType) => void;
  setTargetValue: (targetValue: {
    inputValue: number;
    inputUnit: string;
  }) => void;
}
export const SetupExerciseValues = ({
  exerciseIndex,
  setTargetType,
  setTargetValue
}: SetupProps) => {
  const formValue = useAtomValue(workoutFormAtom);
  const setExerciseSetting = useSetAtom(exerciseSettingsAtom);
  useLayoutEffect(() => {
    const exercise = formValue.exercises[exerciseIndex];
    if (!exercise) return;

    setExerciseSetting({
      exerciseId: exercise.exerciseId,
      customTarget: exercise.customTarget || null
    });
    setTargetType(exercise.targetType);
    setTargetValue({
      inputValue: exercise.targetValue || 0,
      inputUnit: exercise.targetUnit || ''
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exerciseIndex, setTargetValue]);
  return <></>;
};
