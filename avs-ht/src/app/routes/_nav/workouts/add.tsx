import { createFileRoute } from '@tanstack/react-router';

import { CreateWorkoutPage } from '$/pages/workouts';

export const Route = createFileRoute('/_nav/workouts/add')({
  component: CreateWorkoutPage
});
