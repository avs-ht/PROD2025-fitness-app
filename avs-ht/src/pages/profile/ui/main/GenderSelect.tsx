import { useAtom } from 'jotai';

import { playerAtom } from '../../model/playerAtom';
import { GENDER_OPTIONS } from '../constants';

import { Select, Title } from '$/shared/ui';
import styles from './GenderSelect.module.scss';

export const GenderSelect = () => {
  const [player, setPlayer] = useAtom(playerAtom);
  const setGender = (value: string) => {
    setPlayer({ ...player, sex: value as 'female' | 'male' });
  };

  return (
    <div className={styles.genderSelect}>
      <Title tag='h3' textAlign='left'>
        Ваш пол
      </Title>
      <Select
        placeholder='Выберите пол'
        options={GENDER_OPTIONS}
        value={player.sex}
        onChange={setGender}
        className={styles.select}
      />
    </div>
  );
};
