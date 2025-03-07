import { useAtomValue } from 'jotai';
import { useEffect } from 'react';
import tinycolor from 'tinycolor2';

import { settingsAtom } from '$/pages/settings';

export const SetupCustomTheme = () => {
  const { theme } = useAtomValue(settingsAtom);
  const { mainColor, secondaryColor, textColor, backgroundColor } = theme;
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', mainColor);
    document.documentElement.style.setProperty(
      '--secondary-color',
      secondaryColor
    );

    document.documentElement.style.setProperty('--text-color', textColor);
    document.documentElement.style.setProperty(
      '--background-color',
      backgroundColor
    );

    if (mainColor.trim() !== '') {
      document.documentElement.style.setProperty(
        '--primary-color-hover',
        tinycolor(mainColor).darken().toString()
      );
    } else {
      document.documentElement.style.setProperty(
        '--primary-color-hover',
        'var(--dark-blue2)'
      );
    }
  }, [backgroundColor, mainColor, secondaryColor, textColor]);
  return <></>;
};
