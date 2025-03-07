import { createFileRoute } from '@tanstack/react-router';

import { RobotPage } from '$/pages/profile';

export const Route = createFileRoute('/_nav/profile/robot')({
  component: RobotPage
});
