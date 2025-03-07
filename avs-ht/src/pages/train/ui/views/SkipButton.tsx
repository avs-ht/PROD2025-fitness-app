import { useAtom } from 'jotai';

import { trainAtom, trainStageAtom } from '../../model/trainAtom';

import { WorkoutExercise } from '$/shared/types';
import { CompletedExercise } from '$/shared/types';
import { Button } from '$/shared/ui';

interface SkipButtonProps {
  exercises: WorkoutExercise[];
  className?: string;
}
export const SkipButton = ({ exercises, className }: SkipButtonProps) => {
  const [trainStage, setTrainStage] = useAtom(trainStageAtom);
  const [{ completedExercises }, setTrainState] = useAtom(trainAtom);
  return (
    <Button
      className={className}
      onClick={() => {
        switch (trainStage) {
          case 'exercise': {
            const currExerciseIndex = completedExercises.length;
            const skippedExercise: CompletedExercise = {
              ...exercises[currExerciseIndex],
              isSkipped: true,
              isCompleted: false
            };
            setTrainState(prev => {
              return {
                ...prev,
                completedExercises: [...completedExercises, skippedExercise],
                trainStage:
                  completedExercises.length + 1 === exercises.length
                    ? 'finish'
                    : 'rest'
              };
            });
            return;
          }
          case 'rest':
            setTrainStage('exercise');
            return;
          case 'finish':
          case 'start':
            return;
        }
      }}>
      Пропустить
    </Button>
  );
};
