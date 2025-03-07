import { CreateWorkoutForm } from '$/features/createWorkout';
import { Page } from '$/shared/ui';

export const CreateWorkoutPage = () => {
  return (
    <Page contentCentering={false}>
      <CreateWorkoutForm />
    </Page>
  );
};
