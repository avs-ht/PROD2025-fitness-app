import { useRive } from '@rive-app/react-canvas';

import { DEFAULT_STATE_MACHINE, RIVE_AVATAR_INPUT_KEY } from '../constants';
import { useUpdateRiveSolos } from '../hooks';

interface RivePreviewCardProps {
  artboard: string;
  model: number;
}
export const RivePreviewCard = ({ artboard, model }: RivePreviewCardProps) => {
  const { RiveComponent, rive } = useRive({
    src: `/robot.riv`,
    stateMachines: [DEFAULT_STATE_MACHINE],
    artboard: artboard,
    autoplay: true
  });

  useUpdateRiveSolos(rive, RIVE_AVATAR_INPUT_KEY, model);

  return <RiveComponent />;
};
