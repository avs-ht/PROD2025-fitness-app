import { clsx } from '$/shared/lib';
import styles from './index.module.scss';

interface ProgressBarProps {
  value: number;
  maxValue: number;
  rootClassName?: string;
  valueWords?: string;
}

export const ProgressBar = (props: ProgressBarProps) => {
  const { value, maxValue, rootClassName, valueWords } = props;
  return (
    <div className={clsx(styles.progressBar, rootClassName)}>
      <div
        className={styles.progressBarFill}
        style={{ width: `${(value / maxValue) * 100}%` }}></div>
      {(valueWords || value === maxValue) && (
        <span className={styles.text}>
          {value !== maxValue ? (
            <>
              {value} / {maxValue} {valueWords}
            </>
          ) : (
            'Выполнено!'
          )}
        </span>
      )}
    </div>
  );
};
