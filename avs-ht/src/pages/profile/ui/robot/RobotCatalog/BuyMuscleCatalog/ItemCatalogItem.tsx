import { useAtom } from 'jotai';
import { Lock } from 'lucide-react';
import { useState } from 'react';

import { playerAtom } from '$/pages/profile';
import { getCostOfItem } from '$/pages/profile/lib/getCostOfItem';
import { activeInventoryAtom } from '$/pages/profile/model/playerAtom';
import { RiveInventoryAppKey } from '$/rive';
import { COINS_ICONS } from '$/shared/constants';
import { ConfirmationModal } from '$/shared/ui';
import styles from './ItemCatalogItem.module.scss';

interface ItemCatalogItemProps {
  index: number;
  riveAppKey: RiveInventoryAppKey;
}
export const ItemCatalogItem = ({
  index,
  riveAppKey
}: ItemCatalogItemProps) => {
  const [{ coins, inventory }, setPlayer] = useAtom(playerAtom);
  const [activeInventory, setSolo] = useAtom(activeInventoryAtom);
  const itemCoins = coins[riveAppKey];
  const costOfItem = getCostOfItem(index + 1);
  const isItemBought = inventory[riveAppKey].includes(index);
  const isDisabled = !isItemBought && itemCoins < costOfItem;

  const [isModalShowed, setModalShowed] = useState(false);
  const confirmFunc = () => {
    setPlayer(prev => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        [riveAppKey]: [...prev.inventory[riveAppKey], index]
      },
      activeInventory: {
        ...prev.activeInventory,
        [riveAppKey]: index
      },
      coins: {
        ...prev.coins,
        [riveAppKey]: prev.coins[riveAppKey] - costOfItem
      }
    }));
  };
  return (
    <>
      <ConfirmationModal
        isModalShowed={isModalShowed}
        setModalShowed={setModalShowed}
        confirmFunc={confirmFunc}>
        Вы уверенны, что хотите купить эту модель за {costOfItem}{' '}
        {COINS_ICONS[riveAppKey]}?
      </ConfirmationModal>
      <li
        className={styles.item}
        data-active={index === activeInventory[riveAppKey]}>
        {index + 1}
        <button
          data-is-bought={isItemBought}
          disabled={isDisabled}
          className={styles.button}
          onClick={() =>
            isItemBought
              ? setSolo({
                  key: riveAppKey,
                  value: index
                })
              : setModalShowed(true)
          }>
          <Lock className={styles.buttonIcon} />
          <span className={styles.itemCost}>
            {COINS_ICONS[riveAppKey]} {costOfItem}
          </span>
        </button>
      </li>
    </>
  );
};
