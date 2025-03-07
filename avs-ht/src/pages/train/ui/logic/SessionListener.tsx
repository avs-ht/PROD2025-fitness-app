import { useLocation } from '@tanstack/react-router';
import { useAtom, useAtomValue } from 'jotai';
import { useEffect } from 'react';

import { trainAtom, trainStageAtom } from '../../model/trainAtom';

export const SessionListener = () => {
  const location = useLocation();
  const trainStage = useAtomValue(trainStageAtom);
  const [{ workoutId, sessions }, setTrainState] = useAtom(trainAtom);
  const closeLastSession = () => {
    setTrainState(prev => ({
      ...prev,
      sessions: [
        ...prev.sessions.slice(0, prev.sessions.length - 1),
        { ...prev.sessions[prev.sessions.length - 1], endTime: new Date() }
      ]
    }));
  };
  useEffect(() => {
    if (['finish', 'start'].includes(trainStage)) return;
    const addNewSession = () => {
      setTrainState(prev => ({
        ...prev,
        sessions: [...prev.sessions, { startTime: new Date(), endTime: null }]
      }));
    };

    if (location.href === `/train?id=${workoutId}`) {
      addNewSession();
    } else closeLastSession();
    window.onbeforeunload = closeLastSession;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setTrainState, location]);

  useEffect(() => {
    if (
      trainStage !== 'finish' ||
      sessions[sessions.length - 1].endTime !== null
    )
      return;
    closeLastSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trainStage]);
  return <></>;
};
