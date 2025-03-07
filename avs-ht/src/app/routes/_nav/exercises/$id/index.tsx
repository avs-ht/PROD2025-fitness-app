import { createFileRoute } from '@tanstack/react-router'

import { ExerciseIdPage } from '$/pages/exercises'

export const Route = createFileRoute('/_nav/exercises/$id/')({
  component: Component,
})

function Component() {
  const { id } = Route.useParams()
  return <ExerciseIdPage id={id} />
}
