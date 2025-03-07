import { ExerciseType } from './exercise';
import { Key } from './utils';

type ItemId = number;
type Sex = 'female' | 'male';
type Centimeter = number;
type Kilogram = number;
export type ActivityType = 'easy' | 'medium' | 'high';

export interface Player {
  sex: Sex;
  height: Centimeter;
  weight: Kilogram;
  activity: ActivityType;
  completedTrainingsAmount: number;
  completedExercisesAmount: { [k in ExerciseType]: number };
  achievementsId: string[];
  coins: {
    lowerPart: number;
    upperPart: number;
    torso: number;
  };
  inventory: {
    upperPart: ItemId[];
    lowerPart: ItemId[];
    torso: ItemId[];
  };
  activeInventory: {
    upperPart: ItemId;
    lowerPart: ItemId;
    torso: ItemId;
  };
  activeDecor: {
    LeftUpAsc: ItemId;
    Eyes: ItemId;
    Mouth: ItemId;
  };
  totalDistance: number;
  maxWeightLifted: number;
}
export type CoinsKey = Key<Player['coins']>;
export type InventoryKey = Key<Player['inventory']>;

export type ProgressType =
  | boolean
  | {
      currentNumber: number;
      attainableNumber: number;
      unit: string;
    };

export interface Achievement {
  id: string;
  name: string;
  description: string;
  conditionForGetting: (player: Player) => ProgressType | true;
  riveReward: {
    type: 'Mouth' | 'Eyes' | 'LeftUpAsc';
    id: number;
  };
}
