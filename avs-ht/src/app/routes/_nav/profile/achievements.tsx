import { createFileRoute } from '@tanstack/react-router';

import { AchiviementsPage } from '$/pages/profile';

export const Route = createFileRoute('/_nav/profile/achievements')({
  component: AchiviementsPage
});
