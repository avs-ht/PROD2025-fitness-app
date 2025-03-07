import { useAtom } from 'jotai';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { ACHIEVEMENTS } from '$/entities/achievement';
import { playerAtom } from '$/pages/profile';

export const AchievementListener = () => {
  const [player, setPlayer] = useAtom(playerAtom);
  const {
    maxWeightLifted,
    completedExercisesAmount,
    completedTrainingsAmount,
    totalDistance
  } = player;
  useEffect(() => {
    ACHIEVEMENTS.filter(
      ({ id }) => !player.achievementsId.includes(id)
    ).forEach(({ conditionForGetting, id, name }) => {
      if (conditionForGetting(player) !== true) return;
      setPlayer(prev => ({
        ...prev,
        achievementsId: [...prev.achievementsId, id]
      }));
      toast(
        `Вы получили новое достижение: \n${name}, \nа также новый декор для Бита!`
      );
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    completedExercisesAmount,
    completedTrainingsAmount,
    maxWeightLifted,
    totalDistance
  ]);
  return <></>;
};
