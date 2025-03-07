import { TimeUnit } from '$/shared/types';

export const getSecondsByTimeUnit = (time: number, unit: TimeUnit) => {
  switch (unit) {
    case 'seconds':
      return time;
    case 'minutes':
      return time * 60;
    case 'hours':
      return time * 60 * 60;
  }
};
