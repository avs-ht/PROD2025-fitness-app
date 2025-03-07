import { useRive } from '@rive-app/react-canvas';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';

import {
  activeInventoryAtom,
  playerAtom
} from '$/pages/profile/model/playerAtom';
import { riveAtom } from '$/pages/profile/model/riveAtom';
import { DEFAULT_STATE_MACHINE, useUpdateRiveSolos } from '$/rive';
import { LoadScreen } from '$/shared/ui';

export const RobotView = () => {
  const [isLoading, setLoading] = useState(true);
  const { RiveComponent: Robot, rive } = useRive({
    src: '/robot.riv',
    stateMachines: [DEFAULT_STATE_MACHINE],
    artboard: '8BitUser',
    autoplay: true,
    onLoad: () => {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  });
  const setRive = useSetAtom(riveAtom);
  const activeInventory = useAtomValue(activeInventoryAtom);
  const { activeDecor } = useAtomValue(playerAtom);
  useEffect(() => {
    setRive(rive);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rive]);

  useUpdateRiveSolos(rive, 'Torso', activeInventory.torso);
  useUpdateRiveSolos(rive, 'Arms', activeInventory.upperPart);
  useUpdateRiveSolos(rive, 'Legs', activeInventory.lowerPart);
  useUpdateRiveSolos(rive, 'Eyes', activeDecor.Eyes);
  useUpdateRiveSolos(rive, 'Mouth', activeDecor.Mouth);
  useUpdateRiveSolos(rive, 'LeftUpAsc', activeDecor.LeftUpAsc);

  return (
    <>
      <LoadScreen isLoadScreenShowed={isLoading} inContainer />
      <Robot data-robot />
    </>
  );
};
