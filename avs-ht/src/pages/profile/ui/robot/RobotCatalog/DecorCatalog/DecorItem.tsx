import { useAtom } from 'jotai';
import { Check, Lock } from 'lucide-react';

import { ACHIEVEMENTS } from '$/entities/achievement';
import { playerAtom } from '$/pages/profile';
import { RivePreviewCard } from '$/rive';
import { RiveDecorAppKey } from '$/rive/type';
import styles from './DecorItem.module.scss';

interface DecorItemProps {
  riveDecorAppKey: RiveDecorAppKey;
  index: number;
}
export const DecorItem = ({ riveDecorAppKey, index }: DecorItemProps) => {
  const [player, setPlayer] = useAtom(playerAtom);
  const activeDecor = player.activeDecor[riveDecorAppKey] || 0;
  const achiviementForDecor = ACHIEVEMENTS.find(
    ({ riveReward }) =>
      riveReward.type === riveDecorAppKey && riveReward.id === index
  );

  const isAvaibleToUse =
    index === 0 || achiviementForDecor?.conditionForGetting(player) === true;
  const isActiveDecor = activeDecor === index;

  const selectSolos = () => {
    setPlayer(prev => ({
      ...prev,
      activeDecor: {
        ...prev.activeDecor,
        [riveDecorAppKey]: index
      }
    }));
  };

  return (
    <li className={styles.decorItem}>
      <RivePreviewCard artboard={riveDecorAppKey} model={index} />
      <button
        className={styles.button}
        disabled={!isAvaibleToUse || isActiveDecor}
        data-is-avaible={isAvaibleToUse}
        onClick={selectSolos}>
        {isActiveDecor && <Check size={48} />}
        {!isAvaibleToUse && <Lock size={48} />}
      </button>
    </li>
  );
};
