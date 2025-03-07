import { Key } from '$/shared/types/utils';

export const CALENDAR_NAMES = {
  google: 'Google Календарь',
  yandex: 'Яндекс Календарь',
  outlook: 'Outlook Календарь'
};

export type CalendarName = Key<typeof CALENDAR_NAMES>;
