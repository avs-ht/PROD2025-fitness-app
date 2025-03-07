import {
  BicepsFlexed,
  Flower,
  HeartPulseIcon,
  PersonStandingIcon
} from 'lucide-react';

import { ExerciseType } from '$/shared/types';

export const EXERCISE_TYPE_ICONS: Record<ExerciseType, typeof BicepsFlexed> = {
  strength: BicepsFlexed,
  cardio: HeartPulseIcon,
  stretching: PersonStandingIcon,
  yoga: Flower
};
