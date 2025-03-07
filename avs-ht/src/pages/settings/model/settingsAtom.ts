import { atomWithStorage } from 'jotai/utils';

import { SETTINGS_LOCAL_STORAGE_KEY } from '$/shared/constants';
import { Settings } from '$/shared/types';
import { CustomTheme } from '$/shared/types';

export const DEFAULT_THEME: CustomTheme = {
  mainColor: '',
  secondaryColor: '',
  backgroundColor: '',
  textColor: ''
};
export const DEFAULT_SETTINGS: Settings = {
  theme: DEFAULT_THEME,
  checks: {
    trainNotification: true,
    trainingStartsWithRest: true,
    autoTargetGoal: true
  }
};
export const settingsAtom = atomWithStorage(
  SETTINGS_LOCAL_STORAGE_KEY,
  DEFAULT_SETTINGS
);
