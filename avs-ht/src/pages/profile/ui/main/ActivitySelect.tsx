import { useAtom } from 'jotai';

import { playerAtom } from '../../model/playerAtom';
import { ACTIVITIES_OPTIONS } from '../constants';

import { Select, Title } from '$/shared/ui';
import styles from './ActivitySelects.module.scss';

export const ActivitySelect = () => {
  const [player, setPlayer] = useAtom(playerAtom);
  const setActivity = (value: string) =>
    setPlayer({ ...player, activity: value as 'easy' | 'medium' | 'high' });

  return (
    <div className={styles.activitySelect}>
      <Title tag='h3' textAlign='left'>
        Ваша активность
      </Title>
      <Select
        placeholder='Выберите активность'
        options={ACTIVITIES_OPTIONS}
        value={player.activity}
        onChange={setActivity}
        className={styles.select}
      />
    </div>
  );
};
