import { CALENDAR_NAMES, CalendarName } from '../../../constants';

import { generateCalendarLink } from '$/pages/workouts/lib/generateCalendarLinks';
import { generateICS } from '$/pages/workouts/lib/generateICS';
import { getWorkoutById } from '$/pages/workouts/lib/getWorkout';
import { ID } from '$/shared/types';
import { Button, Modal, Title } from '$/shared/ui';
import styles from './AddToCalendarModal.module.scss';

interface AddToCalendarModalProps extends ID {
  setModalShowed: (value: boolean) => void;
  isModalShowed: boolean;
}

export const AddToCalendarModal = ({
  id,
  isModalShowed,
  setModalShowed
}: AddToCalendarModalProps) => {
  const workout = getWorkoutById(id);
  if (!workout) return;
  const calendarProps = {
    title: `Тренировка ${workout.title}`,
    startDate: new Date(),
    location: `${window.location.host}/train?id=${id}`
  };
  const downloadLink = generateICS(calendarProps);

  return (
    <>
      {isModalShowed && (
        <Modal
          setModalOpened={setModalShowed}
          contentClassName={styles.contentModal}>
          <Title tag='p' className=''>
            Доступны следующие варианты:
          </Title>
          <Button className={styles.icsButton}>
            <a href={downloadLink} target='_blank'>
              Скачать ICS файл
            </a>
          </Button>
          {Object.keys(CALENDAR_NAMES).map(name => {
            const link = generateCalendarLink(
              name as CalendarName,
              calendarProps
            );
            return (
              <Button link className={styles[`calendarButton${name}`]}>
                <a href={link} target='_blank'>
                  Добавить в {CALENDAR_NAMES[name as CalendarName]}
                </a>
              </Button>
            );
          })}
        </Modal>
      )}
    </>
  );
};
