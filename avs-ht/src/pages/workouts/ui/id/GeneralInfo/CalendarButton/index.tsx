import { useState } from 'react';

import { ID } from '$/shared/types';
import { Button } from '$/shared/ui';
import { AddToCalendarModal } from './AddToCalendarModal';

export const CalendarButton = ({ id }: ID) => {
  const [isModalShowed, setModalShowed] = useState(false);
  return (
    <>
      <AddToCalendarModal
        id={id}
        isModalShowed={isModalShowed}
        setModalShowed={setModalShowed}
      />
      <Button onClick={() => setModalShowed(true)}>
        Запланировать тренировку
      </Button>
    </>
  );
};
