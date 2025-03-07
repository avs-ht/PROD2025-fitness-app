import { useAtomValue } from 'jotai';

import { getStrain } from '$/features/createWorkout/lib/getStrain';
import { playerAtom } from '$/pages/profile';
import { TargetType } from '$/shared/types';
import styles from './HighStrainWarning.module.scss';

interface HighStrainWarningProps {
  value: {
    inputValue: number;
    inputUnit: string;
  };
  type: TargetType;
}
export const HighStrainWarning = (props: HighStrainWarningProps) => {
  const player = useAtomValue(playerAtom);
  const {
    value: { inputValue },
    type
  } = props;
  if (type === 'custom') return;
  const isHighStrain = getStrain({
    valueOfStrain: inputValue,
    player
  });
  if (!isHighStrain) return;
  return (
    <span className={styles.warning}>
      ПРЕДУПРЕЖДЕНИЕ:
      <br />
      Такая нагрузка может быть слишком высокой для вас!
    </span>
  );
};
