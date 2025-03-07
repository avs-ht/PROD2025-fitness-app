import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'jotai';

import { getAlmostAchievement } from '../../lib/getAlmostAchievement';
import { getRecommendedTrainings } from '../../lib/getRecommendedTrainings';

import { AchievementCard } from '$/entities/achievement';
import { playerAtom } from '$/pages/profile';
import { Button, Title } from '$/shared/ui';
import styles from './TrainedUserView.module.scss';

export const TrainedUserView = () => {
  const player = useAtomValue(playerAtom);
  const trainings = getRecommendedTrainings();
  const achiviemnt = getAlmostAchievement(player);
  return (
    <>
      <Title tag='h1' className={styles.title}>
        Привет, 8Битер!
      </Title>
      <div className={styles.recommedations}>
        <Title className={styles.subtitle}>
          Сегодня отличный день сделать:
        </Title>
        <ul className={styles.list}>
          {trainings.map(({ id, title }) => (
            <li key={id} className={styles.listItem}>
              <Title tag='h3'>
                <Link to='/train' search={{ id }}>
                  {title}
                </Link>
              </Title>
            </li>
          ))}
        </ul>
      </div>
      {achiviemnt !== null && (
        <>
          <div className={styles.achiviement}>
            <Title className={styles.subtitle}>Давай, поднажми немного:</Title>
            <AchievementCard achievement={achiviemnt[1]} />
          </div>
        </>
      )}
      <Button className={styles.goToWorkouts} link>
        <Link to='/workouts'>Перейти к тренировкам</Link>
      </Button>
    </>
  );
};
