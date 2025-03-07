import { useAtom } from 'jotai';

import { settingsAtom } from '../model/settingsAtom';

import { ChecksKey } from '$/shared/types';
import { Checkbox } from '$/shared/ui';

interface CheckboxItemProps {
  settingName: string;
  settingLabel: string;
}
export const CheckboxItem = (props: CheckboxItemProps) => {
  const { settingName, settingLabel } = props;
  const [settings, setSettings] = useAtom(settingsAtom);
  const typedName = settingName as ChecksKey;
  return (
    <Checkbox
      id={settingName}
      checked={settings.checks[typedName as ChecksKey]}
      label={settingLabel}
      onChange={() => {
        setSettings({
          ...settings,
          checks: {
            ...settings.checks,
            [settingName]: !settings.checks[typedName]
          }
        });
      }}
    />
  );
};
