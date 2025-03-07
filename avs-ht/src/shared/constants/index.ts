import { CoinsKey, DefaultFilters, FiltersKeys } from '../types';
import { ChecksKey, ThemeKey } from '../types/settings';

export {
  TAGS_LOCAL_STORAGE_KEY,
  PLAYER_LOCAL_STORAGE_KEY,
  WORKOUTS_LOCAL_STORAGE_KEY,
  EQUIPMENT_LOCAL_STORAGE_KEY,
  EXERCISES_LOCAL_STORAGE_KEY,
  FIRST_TIME_LOCAL_STORAGE_KEY,
  TRAIN_STATE_LOCAL_STORAGE_KEY,
  DEFAULT_DATA_LOCAL_STORAGE_KEY,
  TEMPORARY_WORKOUT_LOCAL_STORAGE_KEY,
  SETTINGS_LOCAL_STORAGE_KEY,
  TRAIN_NOTIFICATION_SESSION_STORAGE_KEY
} from './keys';

export const EXERCISE_TYPES = {
  strength: 'Силовые',
  cardio: 'Кардио',
  stretching: 'Растяжка',
  yoga: 'Йога'
} as const;
export const MUSCLE_CONCENTRATION_TYPES = {
  whole: 'Всё тело',
  upper: 'Верхняя часть',
  lower: 'Нижняя часть',
  torso: 'Торс'
} as const;
export const DIFFICULTY_TYPES = {
  easy: 'Начинающий',
  medium: 'Продвинутый',
  hard: 'Профессионал'
} as const;
export const FILTERS_CATEGORIES = {
  type: EXERCISE_TYPES,
  muscle: MUSCLE_CONCENTRATION_TYPES,
  difficulty: DIFFICULTY_TYPES
} as const;
export const FILTERS_CATEGORIES_NAME: Record<FiltersKeys, string> = {
  type: 'Тип',
  muscle: 'Зона тела',
  difficulty: 'Уровень сложности'
} as const;

export const TARGET_OPTIONS = {
  time: 'Время',
  weight: 'Вес',
  times: 'Количество',
  distance: 'Расстояние',
  custom: 'Свой вариант'
} as const;
export const TIME_UNITS = {
  seconds: 'Сек.',
  minutes: 'Мин.',
  hours: 'Час.'
} as const;
export const WEIGHT_UNITS = {
  kilograms: 'Кг.',
  pounds: 'Фунт.'
} as const;
export const DISTANCE_UNITS = {
  meters: 'Метр.',
  kilometers: 'Км.'
} as const;

export const TARGETS_OPTION_CONTENT = {
  time: TIME_UNITS,
  weight: WEIGHT_UNITS,
  times: '',
  distance: DISTANCE_UNITS
} as const;

export const DIFFICULTY_COIN_COEF = {
  easy: 1,
  medium: 2,
  hard: 3
} as const;
export const MUSCLE_COIN_AMOUNT: Record<
  DefaultFilters['muscle'],
  Record<CoinsKey, number>
> = {
  whole: {
    lowerPart: 1,
    upperPart: 1,
    torso: 1
  },
  upper: {
    lowerPart: 0,
    upperPart: 2,
    torso: 1
  },
  lower: {
    upperPart: 0,
    lowerPart: 3,
    torso: 0
  },
  torso: {
    upperPart: 0,
    lowerPart: 0,
    torso: 3
  }
} as const;

export const COINS_ICONS = {
  lowerPart: '🦵',
  upperPart: '💪',
  torso: '🤟'
} as const;

export const SETTINGS_TITLES: Record<ChecksKey, string> = {
  trainingStartsWithRest: 'Тренировка начинается с отдыха',
  trainNotification: 'Уведомление о незаконченной тренировке',
  autoTargetGoal: 'Определять автоматически цель'
} as const;

export const THEME_NAMES: Record<ThemeKey, string> = {
  mainColor: 'Главный цвет',
  textColor: 'Цвет текста',
  backgroundColor: 'Задний фон',
  secondaryColor: 'Вторичный цвет'
};
