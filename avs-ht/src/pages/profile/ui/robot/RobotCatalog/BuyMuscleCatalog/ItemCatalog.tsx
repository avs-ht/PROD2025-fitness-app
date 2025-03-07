import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';

import { riveAtom } from '$/pages/profile/model/riveAtom';
import { INVENTORY_COMPLIANCE_WITH_RIVE, RiveInventoryAppKey } from '$/rive';
import styles from './ItemCatalog.module.scss';
import { ItemCatalogItem } from './ItemCatalogItem';

export const ItemCatalog = ({
  riveAppKey
}: {
  riveAppKey: RiveInventoryAppKey;
}) => {
  const rive = useAtomValue(riveAtom);

  const riveComplRiveKey = INVENTORY_COMPLIANCE_WITH_RIVE[riveAppKey];
  const [amountOfAnimatios, setAmountOfAnimations] = useState(0);

  useEffect(() => {
    if (!rive) return;
    const animationNames = rive.animationNames.filter(an =>
      an.startsWith(riveComplRiveKey)
    );
    setAmountOfAnimations(animationNames.length);
  }, [rive, riveComplRiveKey]);

  return (
    <ul className={styles.catalog}>
      {Array.from({ length: amountOfAnimatios }).map((_, i) => {
        return <ItemCatalogItem index={i} riveAppKey={riveAppKey} key={i} />;
      })}
    </ul>
  );
};
