import { ProgressType } from '$/shared/types';
import { ProgressBar } from '$/shared/ui';

export const Progress = ({ progress }: { progress: ProgressType }) => {
  if (typeof progress === 'boolean') {
    return <ProgressBar value={0} maxValue={0} valueWords={''} />;
  }

  const { currentNumber, attainableNumber, unit } = progress;
  return (
    <ProgressBar
      value={currentNumber}
      maxValue={attainableNumber}
      valueWords={unit}
    />
  );
};
