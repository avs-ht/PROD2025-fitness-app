import { Page, Title } from '$/shared/ui';
import { ExercisesList } from './ExercisesList';
import { ExercisesFilters } from './Filters/ExercisesFilters';

export const ExercisesPage = () => {
  return (
    <Page contentCentering={false}>
      <Title hidden>Упражнения</Title>
      <ExercisesFilters />
      <ExercisesList />
    </Page>
  );
};
