import { useAtom } from 'jotai';
import { useRef } from 'react';

import { playerAtom } from '../../model/playerAtom';

import { formatInputValue } from '$/shared/lib';
import { Input, Title } from '$/shared/ui';
import styles from './PhysicalCharacteres.module.scss';

const INPUTS = [
  {
    valueName: 'height',
    label: 'Рост (см.)'
  },
  {
    valueName: 'weight',
    label: 'Вес (кг.)'
  }
];

export const PhysicalCharacteristics = () => {
  const [player, setPlayer] = useAtom(playerAtom);
  const heightInputRef = useRef<HTMLInputElement | null>(null);
  const weightInputRef = useRef<HTMLInputElement | null>(null);
  const refs = {
    weight: weightInputRef,
    height: heightInputRef
  };
  return (
    <>
      <Title tag='h3' className={styles.title}>
        Ваши параметры
      </Title>
      <span className={styles.hint}>
        При помощи них мы сможем лучше подбирать тренировки
      </span>
      {INPUTS.map(({ valueName, label }) => {
        const typedValue = valueName as 'weight' | 'height';
        const setFocus = () => refs[typedValue].current?.focus();
        const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setPlayer({
            ...player,
            [typedValue]: formatInputValue(e.currentTarget.value)
          });
        };
        return (
          <Input
            key={valueName}
            labelName={label}
            isSetupInputAsText
            value={player[typedValue]}
            ref={refs[typedValue]}
            setFocus={setFocus}
            onChange={onChange}
          />
        );
      })}
    </>
  );
};
