import { createFileRoute } from '@tanstack/react-router';

import { NavLayout } from '$/layouts/nav';

export const Route = createFileRoute('/_nav')({
  component: NavLayout
});
