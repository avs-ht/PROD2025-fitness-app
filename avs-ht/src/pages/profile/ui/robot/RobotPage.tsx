import { Page } from '$/shared/ui';
import { RobotCatalog } from './RobotCatalog';
import styles from './RobotPage.module.scss';
import { RobotView } from './RobotView';

export const RobotPage = () => {
  return (
    <Page className={styles.page}>
      <div className={styles.firstBlock}>
        <RobotView />
      </div>
      <div className={styles.secondBlock}>
        <RobotCatalog />
      </div>
    </Page>
  );
};
