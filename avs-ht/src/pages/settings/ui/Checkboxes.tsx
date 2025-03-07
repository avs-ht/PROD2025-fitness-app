import { SETTINGS_TITLES } from '$/shared/constants';
import { CheckboxItem } from './CheckboxItem';
import styles from './Checkboxes.module.scss';

export const Checkboxes = () => {
  return (
    <div className={styles.checkboxes}>
      {Object.entries(SETTINGS_TITLES).map(([settingName, settingLabel]) => {
        return (
          <CheckboxItem
            key={settingName}
            settingName={settingName}
            settingLabel={settingLabel}
          />
        );
      })}
    </div>
  );
};
