import { useAtom } from 'jotai';
import { HexColorPicker } from 'react-colorful';

import { DEFAULT_THEME, settingsAtom } from '../model/settingsAtom';

import { THEME_NAMES } from '$/shared/constants';
import { ThemeKey } from '$/shared/types';
import { Title } from '$/shared/ui';
import styles from './Colors.module.scss';

export const Colors = () => {
  const [{ theme }, setSettings] = useAtom(settingsAtom);
  return (
    <>
      {Object.keys(DEFAULT_THEME).map(key => {
        const typedKey = key as ThemeKey;
        const changeColor = (val: string) => {
          setSettings(prev => ({
            ...prev,
            theme: {
              ...prev.theme,
              [typedKey]: val
            }
          }));
        };
        return (
          <div className={styles.colorPicker} key={typedKey}>
            <Title>{THEME_NAMES[typedKey]}</Title>
            <HexColorPicker color={theme[typedKey]} onChange={changeColor} />
          </div>
        );
      })}
    </>
  );
};
