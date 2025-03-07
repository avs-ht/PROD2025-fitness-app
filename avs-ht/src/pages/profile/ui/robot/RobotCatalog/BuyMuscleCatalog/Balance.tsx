import { useAtomValue } from 'jotai';

import { playerAtom } from '$/pages/profile';
import { COINS_ICONS } from '$/shared/constants';
import { Key } from '$/shared/types/utils';
import styles from './Balance.module.scss';

type CoinKey = Key<typeof COINS_ICONS>;
export const Balance = () => {
  const { coins } = useAtomValue(playerAtom);
  return (
    <>
      <ul className={styles.list}>
        {Object.keys(COINS_ICONS).map(coinName => {
          return (
            <li key={coinName} className={styles.coin}>
              {COINS_ICONS[coinName as CoinKey]}: {coins[coinName as CoinKey]}
            </li>
          );
        })}
      </ul>
    </>
  );
};
