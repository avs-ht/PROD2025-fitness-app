import { createFileRoute } from '@tanstack/react-router';

import { WorkoutsPage } from '$/pages/workouts';

export const Route = createFileRoute('/_nav/workouts/')({
  component: WorkoutsPage
});
