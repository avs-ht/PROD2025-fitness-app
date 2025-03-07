import { Key } from './utils';

export interface CustomTheme {
  mainColor: string;
  textColor: string;
  secondaryColor: string;
  backgroundColor: string;
}
export interface Settings {
  theme: CustomTheme;
  checks: {
    trainNotification: boolean;
    autoTargetGoal: boolean;
    trainingStartsWithRest: boolean;
  };
}

export type ChecksKey = Key<Settings['checks']>;
export type ThemeKey = Key<CustomTheme>;
