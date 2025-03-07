import { createFileRoute } from '@tanstack/react-router'

import { ExercisesPage } from '$/pages/exercises'

export const Route = createFileRoute('/_nav/exercises/')({
  component: ExercisesPage,
})
