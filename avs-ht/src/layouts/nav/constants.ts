import { Bike, Bot, UserRoundCog, Waypoints } from 'lucide-react';

export const NAV_ITEMS = [
  {
    title: 'Тренировки',
    path: '/workouts',
    icon: Waypoints
  },
  {
    title: 'Упражнения',
    path: '/exercises',
    icon: Bike
  },
  {
    title: 'Ваш бит',
    path: '/profile/robot',
    icon: Bot
  },
  {
    title: 'Настройки',
    path: '/settings',
    icon: UserRoundCog
  }
];

export const ADD_BUTTON_PAGES = {
  '/exercises': 'упражнение',
  '/workouts': 'тренировку'
};
