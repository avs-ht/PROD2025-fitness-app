import { createFileRoute } from '@tanstack/react-router';

import { EditExercisePage } from '$/pages/exercises';

export const Route = createFileRoute('/_nav/exercises/$id/edit')({
  component: Component
});

function Component() {
  const { id } = Route.useParams();

  return <EditExercisePage id={id} />;
}
