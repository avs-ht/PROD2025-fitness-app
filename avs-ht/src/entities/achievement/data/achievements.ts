import { Achievement, ProgressType } from '$/shared/types';

const progress = (
  currentNumber: number,
  attainableNumber: number,
  unit: string
) => ({ currentNumber, attainableNumber, unit }) as ProgressType;
export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'achievement1',
    name: 'Happy Happy Happy!',
    description: 'Выполни 5 тренировок',
    conditionForGetting: player => {
      return (
        player.completedTrainingsAmount >= 5 ||
        progress(player.completedTrainingsAmount, 5, 'тренир.')
      );
    },
    riveReward: { type: 'Mouth', id: 1 }
  },
  {
    id: 'achievement2',
    name: 'Почти ГБ',
    description: 'Выполни 20 тренировок',
    conditionForGetting: player =>
      player.completedTrainingsAmount >= 20 ||
      progress(player.completedTrainingsAmount, 20, 'тренир.'),
    riveReward: { type: 'Eyes', id: 1 }
  },
  {
    id: 'achievement3',
    name: 'Весы',
    description: 'Подними вес более 70 кг',
    conditionForGetting: player =>
      player.maxWeightLifted > 70 || progress(player.maxWeightLifted, 70, 'кг'),
    riveReward: { type: 'LeftUpAsc', id: 1 }
  },
  {
    id: 'achievement4',
    name: 'Ты живой?',
    description: 'Выполни 30 раз кардио упражнения',
    conditionForGetting: ({ completedExercisesAmount: { cardio } }) =>
      cardio >= 30 || progress(cardio, 30, 'упр.'),
    riveReward: { type: 'Mouth', id: 2 }
  },
  {
    id: 'achievement5',
    name: 'Время не резиновое',
    description: 'Выполни 15 растяжек',
    conditionForGetting: ({ completedExercisesAmount: { stretching } }) =>
      stretching >= 15 || progress(stretching, 15, 'упр.'),
    riveReward: { type: 'Eyes', id: 2 }
  },
  {
    id: 'achievement6',
    name: 'Йогурт',
    description: 'Выполни 10 йога упражнений',
    conditionForGetting: ({ completedExercisesAmount: { yoga } }) =>
      yoga >= 10 || progress(yoga, 10, 'упр.'),
    riveReward: { type: 'LeftUpAsc', id: 2 }
  },
  {
    id: 'achievement7',
    name: 'Закаляйся сталь!',
    description: 'Выполни 25 силовых упражнений',
    conditionForGetting: ({ completedExercisesAmount: { strength } }) =>
      strength >= 25 || progress(strength, 25, 'упр.'),
    riveReward: { type: 'Mouth', id: 3 }
  },
  {
    id: 'achievement8',
    name: 'Шестеренки крутятся',
    description: 'Преодолей 42 км',
    conditionForGetting: player =>
      player.totalDistance >= 42000 ||
      progress(Math.floor(player.totalDistance / 1000), 42, 'км'),
    riveReward: { type: 'Eyes', id: 3 }
  },
  {
    id: 'achievement9',
    name: 'Game is started?',
    description: 'Выполни 100 тренировок',
    conditionForGetting: player =>
      player.completedTrainingsAmount >= 100 ||
      progress(player.completedTrainingsAmount, 100, 'тренир.'),
    riveReward: { type: 'LeftUpAsc', id: 3 }
  }
];
