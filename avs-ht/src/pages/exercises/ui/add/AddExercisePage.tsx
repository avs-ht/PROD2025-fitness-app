import { AddExerciseForm } from '$/features/addExercise';
import { Page } from '$/shared/ui';

interface AddExercisePageProps {
  preset?: string;
  exerciseId?: string;
}
export const AddExercisePage = ({
  preset,
  exerciseId
}: AddExercisePageProps) => {
  return (
    <Page contentCentering={false}>
      <AddExerciseForm preset={preset} exerciseId={exerciseId} />
    </Page>
  );
};
