import { CirclePause, CirclePlay } from 'lucide-react';
import { useEffect } from 'react';

import { useTimer } from '$/shared/lib/hooks';
import { secondsToTime } from '$/shared/lib/secondsToTime';
import styles from './index.module.scss';

type Seconds = number;
type TimeEndedCallback = (totalDuration?: Seconds) => void;
interface CircularTimerProps {
  duration: Seconds;
  timeEndedCallback: TimeEndedCallback;
  editButtons?:
    | {
        secondsForEdit: Seconds;
      }
    | false;
  stopButtons?: boolean;
  className?: string;
}

const RADIUS_OF_CIRCLE = 45;
const CIRCUMFERENCE = RADIUS_OF_CIRCLE * 2 * Math.PI;
export const CircularTimer = (props: CircularTimerProps) => {
  const {
    duration,
    editButtons = { secondsForEdit: 10 },
    stopButtons = true,
    timeEndedCallback
  } = props;
  const {
    seconds: timeLeft,
    increaseTime,
    decreaseTime,
    stopTime,
    startTime,
    isTimeStopped
  } = useTimer(duration);

  const offset =
    timeLeft < duration
      ? ((duration - timeLeft) / duration) * CIRCUMFERENCE
      : 0;
  const stopButtonFunc = isTimeStopped ? startTime : stopTime;
  const secondsForEdit = editButtons && editButtons.secondsForEdit;
  const { seconds, minutes } = secondsToTime(timeLeft);
  const secStr = seconds.toString().padStart(2, '0');
  const minsStr = minutes.toString().padStart(2, '0');
  const timerGradientWidth = `${Math.min((timeLeft / duration) * 100, 100)}%`;

  useEffect(() => {
    if (timeLeft === 0) {
      timeEndedCallback();
    }
  }, [timeEndedCallback, timeLeft]);
  return (
    <div className={styles.circularTimer}>
      <div className={styles.timerPicture}>
        <time
          className={styles.timerText}
          dateTime={`${minutes}m ${seconds}s`}
          style={{
            backgroundPosition: `${timerGradientWidth} center`
          }}>
          {minsStr}:{secStr}
        </time>
        <svg width='100' height='100' viewBox='0 0 100 100'>
          <circle
            className={styles.circleBackground}
            cx='50'
            cy='50'
            r={RADIUS_OF_CIRCLE}
          />
          <circle
            className={styles.circleProgress}
            cx='50'
            cy='50'
            r={RADIUS_OF_CIRCLE}
            style={{
              strokeDasharray: CIRCUMFERENCE,
              strokeDashoffset: offset
            }}
          />
        </svg>
      </div>
      {(editButtons || stopButtons) && (
        <div className={styles.buttons}>
          {editButtons && (
            <>
              <button
                className={styles.decreaseTimeButton}
                onClick={() => decreaseTime(secondsForEdit || 0)}>
                -{secondsForEdit}
              </button>
              <button
                className={styles.increaseTimeButton}
                onClick={() => increaseTime(secondsForEdit || 0)}>
                +{secondsForEdit}
              </button>
            </>
          )}
          {stopButtons && (
            <button onClick={stopButtonFunc} className={styles.stopButton}>
              {isTimeStopped ? (
                <CirclePlay size={36} />
              ) : (
                <CirclePause size={36} />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
