import { useAtomValue } from 'jotai';
import { useState } from 'react';

import { activeInventoryAtom } from '$/pages/profile/model/playerAtom';
import { RIVE_TRANSLATIONS, RiveInventoryAppKey } from '$/rive';
import { Balance } from './Balance';
import { ItemCatalog } from './ItemCatalog';
import styles from './index.module.scss';

export const BuyMuscleCatalog = () => {
  const activeInventory = useAtomValue(activeInventoryAtom);
  const typeOfItems = Object.keys(activeInventory) as RiveInventoryAppKey[];
  const [currItemCatalogKey, setCurrItemCatalogKey] =
    useState<RiveInventoryAppKey>(typeOfItems[0]);
  return (
    <div className={styles.container}>
      <Balance />
      <header className={styles.header}>
        <ul className={styles.listOfItems}>
          {typeOfItems.map(item => {
            return (
              <li
                data-active={item === currItemCatalogKey}
                key={item}
                onClick={() => setCurrItemCatalogKey(item)}
                className={styles.item}>
                {RIVE_TRANSLATIONS[item]}
              </li>
            );
          })}
        </ul>
      </header>
      <div className={styles.activeItemCatalog}>
        <ItemCatalog riveAppKey={currItemCatalogKey} />
      </div>
    </div>
  );
};
