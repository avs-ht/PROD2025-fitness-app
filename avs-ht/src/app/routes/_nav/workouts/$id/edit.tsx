import { createFileRoute } from '@tanstack/react-router';

import { EditWorkoutPage } from '$/pages/workouts';

export const Route = createFileRoute('/_nav/workouts/$id/edit')({
  component: RouteComponent
});

function RouteComponent() {
  const { id } = Route.useParams();
  return <EditWorkoutPage id={id} />;
}
