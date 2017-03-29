export class Event {
  id: number;
  calendar: string;
  calendarColor: string;
  title: string;
  postedBy: string;
  detail: string;
  location: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  repeatInfo: string;
}