import { CALENDAR_NAMES } from '../ui/constants';

import { Key } from '$/shared/types/utils';
import { CalendarProps } from './generateICS';

const GOOGLE_LINK_TEMPLATE = (props: CalendarProps) => {
  const { title, startDate, location } = props;
  const date = startDate.toISOString().slice(0, 10).replace(/-/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&dates=${date}/${date}&text=${title}&location=${location}`;
};
const YANDEX_LINK_TEMPLATE = (props: CalendarProps) => {
  const { title, startDate, location } = props;
  const date = startDate
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z/, '');
  return `https://calendar.yandex.ru/event?name=${title}&dates=${date}/${date}&location=${location}`;
};

const OUTLOOK_LINK_TEMPLATE = (props: CalendarProps) => {
  const { title, startDate, location } = props;
  const date = startDate.toISOString().split('.')[0];
  return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${date}&enddt=${date}&location=${location}`;
};

const LINKS_TEMPLATE = {
  google: GOOGLE_LINK_TEMPLATE,
  yandex: YANDEX_LINK_TEMPLATE,
  outlook: OUTLOOK_LINK_TEMPLATE
};
export const generateCalendarLink = (
  service: Key<typeof CALENDAR_NAMES>,
  props: CalendarProps
) => LINKS_TEMPLATE[service](props);
