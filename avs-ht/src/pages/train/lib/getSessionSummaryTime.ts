import { ActivitySession } from '$/shared/types';

export const getSessionSummaryTime = (sessions: ActivitySession[]) => {
  const ms = sessions.reduce((acc, session) => {
    const fDate = new Date(session.startTime).getTime();
    const sDate = new Date(session.endTime || 0).getTime();
    return acc + Math.abs(sDate - fDate);
  }, 0);
  return Math.floor(ms / 1000);
};
