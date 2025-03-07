import { Rive, useStateMachineInput } from '@rive-app/react-canvas';
import { useEffect } from 'react';

import { DEFAULT_STATE_MACHINE, RIVE_AVATAR_INPUT_KEY } from './constants';
import { RiveDecorAppKey, RiveInventoryRiveKey } from './type';

export const useUpdateRiveSolos = (
  rive: Rive | null,
  key: RiveInventoryRiveKey | typeof RIVE_AVATAR_INPUT_KEY | RiveDecorAppKey,
  value: number
) => {
  const input = useStateMachineInput(rive, DEFAULT_STATE_MACHINE, key);

  useEffect(() => {
    if (!input) return;
    input.value = value;
  }, [input, value, key]);
};
