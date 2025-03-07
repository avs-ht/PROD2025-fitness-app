import { useAtom } from 'jotai';

import { playerAtom } from '$/pages/profile';
import { getRand } from '$/shared/lib';
import { Player, TargetType } from '$/shared/types';
import { ActivityType } from '$/shared/types/player';

const getRandomCoef = () => getRand(80, 120) / 100;
const ACTIVITY_COEF: Record<ActivityType, number> = {
  easy: 1,
  medium: 1.2,
  high: 1.4
};
const distanceGoal = (player: Player) => {
  const BASE_DISTANCE = 2000;
  const { totalDistance, sex, height, weight, activity } = player;
  const sexCoef = sex === 'female' ? 0.9 : 1.1;
  const heightCoef = height / 150;
  const weightCoef = weight > 100 ? 0.6 : 1.1;
  const targetValue = Math.round(
    (BASE_DISTANCE + totalDistance * 0.1) *
      sexCoef *
      heightCoef *
      weightCoef *
      ACTIVITY_COEF[activity] *
      getRandomCoef()
  );

  return {
    targetValue: targetValue > 10000 ? targetValue / 1000 : targetValue,
    targetUnit: targetValue > 10000 ? 'kilometers' : 'meters'
  };
};

const timeGoal = (player: Player) => {
  const BASE_TIME = 60;
  const { sex, height, weight, activity } = player;
  const sexCoef = sex === 'female' ? 0.9 : 1;
  const heightCoef = height / 150;
  const weightCoef = weight > 90 ? 0.7 : 1.2;
  const targetValue = Math.round(
    BASE_TIME *
      sexCoef *
      heightCoef *
      weightCoef *
      ACTIVITY_COEF[activity] *
      getRandomCoef()
  );
  return {
    targetValue,
    targetUnit: 'minutes'
  };
};
const timesGoal = (player: Player) => {
  const BASE_TIMES = 16;
  const { weight, activity } = player;
  const weightCoef = weight > 80 ? 0.9 : 1.1;

  const targetValue = Math.round(
    BASE_TIMES * weightCoef * ACTIVITY_COEF[activity] * getRandomCoef()
  );

  return {
    targetValue,
    targetUnit: ''
  };
};
const weightGoal = (player: Player) => {
  const BASE_WEIGHT = 20;
  const { sex, height, weight, activity, maxWeightLifted } = player;
  const sexCoef = sex === 'female' ? 1 : 1.2;
  const heightCoef = height / 160;
  const weightCoef = weight > 95 ? 1.05 : 0.95;

  const targetValue = Math.round(
    (BASE_WEIGHT + maxWeightLifted * 0.2) *
      sexCoef *
      heightCoef *
      weightCoef *
      ACTIVITY_COEF[activity] *
      getRandomCoef()
  );

  return {
    targetValue: targetValue,
    targetUnit: 'kilograms'
  };
};

export const getAutoTargetGoal = (
  targetType: TargetType | null,
  player: Player
) => {
  if (!targetType || targetType === 'custom') return null;
  switch (targetType) {
    case 'distance':
      return distanceGoal(player);
    case 'time':
      return timeGoal(player);
    case 'times':
      return timesGoal(player);
    case 'weight':
      return weightGoal(player);
  }
};
export const useAutoTargetGoal = (targetType: TargetType | null) => {
  const [player] = useAtom(playerAtom);
  return getAutoTargetGoal(targetType, player);
};
