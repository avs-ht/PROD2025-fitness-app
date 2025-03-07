import {
  DISTANCE_UNITS,
  TARGETS_OPTION_CONTENT,
  TARGET_OPTIONS,
  TIME_UNITS,
  WEIGHT_UNITS
} from '../constants';

import { Key } from './utils';

export type TargetType = Key<typeof TARGET_OPTIONS>;

export type TimeUnit = Key<typeof TIME_UNITS>;
export type WeightUnit = Key<typeof WEIGHT_UNITS>;
export type DistanceUnit = Key<typeof DISTANCE_UNITS>;
export type TargetUnit<K extends Key<typeof TARGETS_OPTION_CONTENT>> =
  (typeof TARGETS_OPTION_CONTENT)[K];

export type DifficultyType = 'easy' | 'medium' | 'hard' | 'auto';

export interface WorkoutExercise {
  exerciseId: string;
  targetType: TargetType;
  targetUnit?: string;
  targetValue?: number;
  customTarget?: string;
}
export interface Workout {
  title: string;
  id: string;
  restTime: number;
  restTimeUnit: TimeUnit;
  difficulty: DifficultyType;
  exercises: WorkoutExercise[];
}
