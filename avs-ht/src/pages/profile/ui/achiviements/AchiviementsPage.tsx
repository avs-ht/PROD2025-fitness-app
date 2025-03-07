import { ACHIEVEMENTS, AchievementCard } from '$/entities/achievement';
import { Page, Title } from '$/shared/ui';
import styles from './AchiviementsPage.module.scss';

export const AchiviementsPage = () => {
  return (
    <Page contentCentering={false}>
      <Title className={styles.title}>Ваши достижения</Title>
      <ul className={styles.list}>
        {ACHIEVEMENTS.map(achievement => {
          return (
            <AchievementCard achievement={achievement} key={achievement.id} />
          );
        })}
      </ul>
    </Page>
  );
};
