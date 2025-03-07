import styles from './RootLayout.module.scss';
import { AchievementListener } from './logic/AchievementListener';
import { SetupCustomTheme } from './logic/SetupCustomTheme';
import { SetupDefaultValues } from './logic/SetupDefaultValues';
import { TrainNotification } from './logic/TrainNotification';

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.wrapper}>
      <SetupDefaultValues />
      <AchievementListener />
      <TrainNotification />
      <SetupCustomTheme />
      {children}
    </div>
  );
};
