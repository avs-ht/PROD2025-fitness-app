import { DECOR_COMPLIANCE_WITH_RIVE } from '$/rive';
import { Title } from '$/shared/ui';
import { DecorItem } from './DecorItem';
import styles from './index.module.scss';

export const DecorCatalog = () => {
  return (
    <div className={styles.decorCatalog}>
      <Title className={styles.title}>Декор робота</Title>
      <ul className={styles.catalog}>
        {DECOR_COMPLIANCE_WITH_RIVE.map(riveDecorAppKey => {
          return (
            <div key={riveDecorAppKey} className={styles.catalogRow}>
              {Array.from({ length: 4 }).map((_, i) => {
                return (
                  <DecorItem
                    index={i}
                    riveDecorAppKey={riveDecorAppKey}
                    key={`${riveDecorAppKey}_${i}`}
                  />
                );
              })}
            </div>
          );
        })}
      </ul>
    </div>
  );
};
