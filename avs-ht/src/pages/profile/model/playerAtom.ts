import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

import { RiveInventoryAppKey } from '$/rive';
import { PLAYER_LOCAL_STORAGE_KEY } from '$/shared/constants';
import { CoinsKey, Player } from '$/shared/types';

const DEFAULT_PLAYER_INSTANCE: Player = {
  sex: 'female',
  height: 160,
  weight: 70,
  activity: 'medium',
  completedTrainingsAmount: 0,
  completedExercisesAmount: {
    yoga: 0,
    strength: 0,
    stretching: 0,
    cardio: 0
  },
  achievementsId: [],
  coins: {
    lowerPart: 0,
    upperPart: 0,
    torso: 0
  },
  inventory: {
    lowerPart: [0],
    upperPart: [0],
    torso: [0]
  },
  activeInventory: {
    lowerPart: 0,
    upperPart: 0,
    torso: 0
  },
  activeDecor: {
    Eyes: 0,
    Mouth: 0,
    LeftUpAsc: 0
  },
  totalDistance: 0,
  maxWeightLifted: 0
};
export const playerAtom = atomWithStorage(
  PLAYER_LOCAL_STORAGE_KEY,
  DEFAULT_PLAYER_INSTANCE
);

type CoinsReducer = {
  value: number;
  action: 'add' | 'subtract';
  coinType: CoinsKey;
};

export const coinsAtom = atom(
  get => get(playerAtom).coins,
  (get, set, newVal: CoinsReducer) => {
    const { action, coinType, value } = newVal;
    const playerValue = get(playerAtom);
    const { coins } = playerValue;
    const currCoinAmount = coins[coinType];
    const newCoinAmount =
      action === 'add'
        ? currCoinAmount + value
        : Math.max(currCoinAmount - value, 0);

    set(playerAtom, {
      ...playerValue,
      coins: {
        ...playerValue.coins,
        [coinType]: newCoinAmount
      }
    });
  }
);

type ActiveInventoryValuePair = {
  value: number;
  key: RiveInventoryAppKey;
};
export const activeInventoryAtom = atom(
  get => get(playerAtom).activeInventory,
  (get, set, { key, value }: ActiveInventoryValuePair) => {
    const player = get(playerAtom);
    set(playerAtom, {
      ...player,
      activeInventory: {
        ...player.activeInventory,
        [key]: value
      }
    });
  }
);
