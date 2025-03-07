import { useAtom } from 'jotai';

import { workoutFormAtom } from '../../model/workoutFormAtom';

import { TimeUnit } from '$/shared/types';
import { UnitsInput } from '$/shared/ui/UnitsUnput';
import styles from './index.module.scss';

export const TimeUnitInputComponent = () => {
  const [formValue, setFormValue] = useAtom(workoutFormAtom);
  const { restTime, restTimeUnit } = formValue;
  return (
    <div className={styles.timeUnitInput}>
      <UnitsInput.time
        labelName='Время отдыха между упражнениями'
        setValue={({ inputValue, inputUnit }) => {
          setFormValue({
            ...formValue,
            restTime: inputValue,
            restTimeUnit: inputUnit as TimeUnit
          });
        }}
        value={{
          inputValue: restTime,
          inputUnit: restTimeUnit
        }}
      />
      <span className={styles.hint}>
        Во время упражнения можно менять время
      </span>
    </div>
  );
};
