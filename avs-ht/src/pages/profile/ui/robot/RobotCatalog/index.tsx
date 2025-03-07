import { BuyMuscleCatalog } from './BuyMuscleCatalog';
import { DecorCatalog } from './DecorCatalog';
import styles from './index.module.scss';

export const RobotCatalog = () => {
  return (
    <div className={styles.container}>
      <BuyMuscleCatalog />
      <DecorCatalog />
    </div>
  );
};
