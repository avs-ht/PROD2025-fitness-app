import { useAtomValue } from 'jotai';

import { trainAtom } from '../../model/trainAtom';

import { Title } from '$/shared/ui';

interface RemainingExercisesProps {
  allExercisesLength: number;
}
export const RemainingExercises = ({
  allExercisesLength
}: RemainingExercisesProps) => {
  const trainState = useAtomValue(trainAtom);

  return (
    <Title tag='p' style={{ marginBottom: '0.5rem' }}>
      Осталось упражений:{' '}
      {allExercisesLength - trainState.completedExercises.length} из{' '}
      {allExercisesLength}
    </Title>
  );
};
