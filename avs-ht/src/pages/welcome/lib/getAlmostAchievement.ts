import { ACHIEVEMENTS } from '$/entities/achievement';
import { Achievement, Player } from '$/shared/types';

export const getAlmostAchievement = (player: Player) => {
  const avaibleAchievements = (
    ACHIEVEMENTS.map(ach => {
      const isDone = ach.conditionForGetting(player);
      if (typeof isDone === 'boolean') return [1000, ach];
      return [
        Math.floor((isDone.currentNumber / isDone.attainableNumber) * 100),
        ach
      ];
    }) as [number, Achievement][]
  ).filter(ach => ach[0] < 100);

  avaibleAchievements.sort((a, b) => b[0] - a[0]);
  return avaibleAchievements?.[0] || null;
};
