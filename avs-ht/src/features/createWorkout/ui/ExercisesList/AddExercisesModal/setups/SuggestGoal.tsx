import { useEffect } from 'react';

import { useAutoTargetGoal } from '$/features/createWorkout/lib/getAutoTargetGoal';
import { getAutoTargetType } from '$/features/createWorkout/lib/getAutoTargetType';
import { SETTINGS_LOCAL_STORAGE_KEY } from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { Settings, TargetType } from '$/shared/types';

interface SuggestGoalProps {
  exerciseName: string;
  setTargetType: React.Dispatch<React.SetStateAction<TargetType>>;
  setTargetValue: React.Dispatch<
    React.SetStateAction<{ inputValue: number; inputUnit: string }>
  >;
}
export const SuggestGoal = (props: SuggestGoalProps) => {
  const { exerciseName, setTargetType, setTargetValue } = props;

  const possibleTargetType = getStorage<Settings>(SETTINGS_LOCAL_STORAGE_KEY)
    .checks.autoTargetGoal
    ? getAutoTargetType(exerciseName)
    : 'custom';

  const goal = useAutoTargetGoal(possibleTargetType);
  useEffect(() => {
    setTargetType(possibleTargetType || 'custom');

    setTargetValue({
      inputValue: goal?.targetValue || 0,
      inputUnit: goal?.targetUnit || ''
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};
