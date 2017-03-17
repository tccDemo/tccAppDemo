export class Event {
  id: number;
  calendar: string;
  title: string;
  postedBy: string;
  detail: string;
  location: string;
  startDate: Date;
  endDate: Date;
  startTime: number;
  endTime:number;
  allDay: boolean;
  start:Date;
  end:Date;
  repeatInfo: string;
}