import { useSetAtom } from 'jotai';

import { DEFAULT_THEME, settingsAtom } from '../model/settingsAtom';

import { Button, Page, Title } from '$/shared/ui';
import { Checkboxes } from './Checkboxes';
import { Colors } from './Colors';
import styles from './SettingsPage.module.scss';

export const SettingsPage = () => {
  const setSettings = useSetAtom(settingsAtom);
  const resetTheme = () => {
    setSettings(prev => ({
      ...prev,
      theme: DEFAULT_THEME
    }));
  };
  return (
    <Page contentCentering={false}>
      <Title hidden>Настройки</Title>
      <div className={styles.container}>
        <Title className={styles.title}>Кастомная тема</Title>
        <Button onClick={resetTheme}>Сбросить</Button>
        <div className={styles.colors}>
          <Colors />
        </div>
        <Title className={styles.title}>Доп. опции</Title>
        <div className={styles.additionalOptions}>
          <Checkboxes />
        </div>
      </div>
    </Page>
  );
};
