import { TrainState } from '$/shared/types';
import { ExerciseView } from './ExerciseView';
import { FinishView } from './FinishView';
import { RestView } from './RestView';
import { StartView } from './StartView';

export const StageViews: Record<
  TrainState['trainStage'],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: any) => React.ReactNode
> = {
  start: StartView,
  exercise: ExerciseView,
  rest: RestView,
  finish: FinishView
};
