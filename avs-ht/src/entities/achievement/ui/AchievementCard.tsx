import { useAtomValue } from 'jotai';

import { playerAtom } from '$/pages/profile';
import { Achievement } from '$/shared/types';
import { ProgressType } from '$/shared/types';
import { Title } from '$/shared/ui/Title';
import styles from './AchievementCard.module.scss';
import { Progress } from './Progress';

interface Props {
  achievement: Achievement;
  titleTag?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
export const AchievementCard = ({ achievement, titleTag = 'h3' }: Props) => {
  const player = useAtomValue(playerAtom);
  const { description, name } = achievement;
  const progress: ProgressType = achievement.conditionForGetting(player);
  return (
    <>
      <div className={styles.container}>
        <Title tag={titleTag} className={styles.title}>
          {name}
        </Title>
        <p className={styles.description}>{description}</p>
        <Progress progress={progress} />
      </div>
    </>
  );
};
