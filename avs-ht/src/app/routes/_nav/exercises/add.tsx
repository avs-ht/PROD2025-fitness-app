import { createFileRoute } from '@tanstack/react-router';

import { AddExercisePage } from '$/pages/exercises';

interface AddExerciseSearch {
  preset?: string;
  exerciseId?: string;
}
export const Route = createFileRoute('/_nav/exercises/add')({
  component: Component,
  validateSearch: (search: Record<string, unknown>): AddExerciseSearch => {
    return {
      preset: (search.preset as string) || '',
      exerciseId: (search.exerciseId as string) || undefined
    };
  }
});
function Component() {
  const { preset, exerciseId } = Route.useSearch();
  return <AddExercisePage preset={preset} exerciseId={exerciseId} />;
}
