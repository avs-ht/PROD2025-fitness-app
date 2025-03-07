import { clsx } from '$/shared/lib';
import styles from './index.module.scss';

interface LoadScreenProps {
  isLoadScreenShowed: boolean;
  inContainer?: boolean;
}
export const LoadScreen = ({
  isLoadScreenShowed,
  inContainer = false
}: LoadScreenProps) => {
  if (!isLoadScreenShowed) return;
  return (
    <div className={clsx(styles.loadScreen, inContainer && styles.inContainer)}>
      <div className={styles.dots}>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
        <div className={styles.dot}></div>
      </div>

      <p className={styles.text}>Загрузка...</p>
    </div>
  );
};
