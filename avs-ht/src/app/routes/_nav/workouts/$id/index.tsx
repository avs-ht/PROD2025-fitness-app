import { createFileRoute } from '@tanstack/react-router';

import { WorkoutIdPage } from '$/pages/workouts';

export const Route = createFileRoute('/_nav/workouts/$id/')({
  component: Component
});
function Component() {
  const { id } = Route.useParams();
  return <WorkoutIdPage id={id} />;
}
