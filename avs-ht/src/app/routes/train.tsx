import { createFileRoute } from '@tanstack/react-router';

import { TrainPage } from '$/pages/train';
import { TRAIN_STATE_LOCAL_STORAGE_KEY } from '$/shared/constants';
import { getStorage } from '$/shared/lib';
import { TrainState } from '$/shared/types';

export const Route = createFileRoute('/train')({
  component: Component,
  validateSearch: (search: Record<string, string>) => {
    return {
      id:
        search.id ||
        getStorage<TrainState>(TRAIN_STATE_LOCAL_STORAGE_KEY).workoutId ||
        'none'
    };
  }
});

function Component() {
  const { id } = Route.useSearch();

  return <TrainPage id={id} />;
}
