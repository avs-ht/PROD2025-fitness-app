import ical, { ICalCalendarMethod } from 'ical-generator';

export interface CalendarProps {
  title: string;
  startDate: Date;
  location: string;
}
export const generateICS = (props: CalendarProps) => {
  const { title, startDate, location } = props;
  const calendar = ical({ name: 'Calendar' });
  calendar.method(ICalCalendarMethod.REQUEST);
  calendar.createEvent({
    start: startDate,
    location,
    summary: title
  });
  const calendarStr = calendar.toString();
  const blob = new Blob([calendarStr], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  return url;
};
