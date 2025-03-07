import {
  DIFFICULTY_TYPES,
  EXERCISE_TYPES,
  FILTERS_CATEGORIES,
  MUSCLE_CONCENTRATION_TYPES
} from '../constants';

export type ExerciseType = keyof typeof EXERCISE_TYPES;
export type MuscleType = keyof typeof MUSCLE_CONCENTRATION_TYPES;
export type DifficultyType = keyof typeof DIFFICULTY_TYPES;
type EquipmentItem = string;
export interface Exercise {
  id: string;
  title: string;
  exerciseType: ExerciseType;
  muscle: MuscleType;
  difficulty: DifficultyType;
  description?: string;
  imagesSerieId: string | null;
  videosSerieId: string | null;
  equipment: EquipmentItem[];
  tags: string[];
}

export type FiltersKeys = keyof typeof FILTERS_CATEGORIES;
export type DefaultFilters = {
  [k in FiltersKeys]: keyof (typeof FILTERS_CATEGORIES)[k];
};
