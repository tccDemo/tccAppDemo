import { Event } from './event';

export const EVENTS: Event[] = [
  {id: 511, calendar: "Widener Experience", title: 'Event 1', detail: "Hello World", location: "Room 401", startDate: new Date(2017,2,3), endDate: new Date(2017,2,3), startTime: 9, endTime: 11, allDay:false, start:null, end:null},
  {id: 512, calendar: "Widener Experience", title: 'Event 2', detail: "Hello World", location: "Room 402", startDate: new Date(2017,2,3), endDate: new Date(2017,2,3), startTime: 9, endTime: 10, allDay:false, start:null, end:null},
  {id: 513, calendar: "Middles Experience", title: 'Event 3', detail: "Hello World", location: "Room 403", startDate: new Date(2017,2,3), endDate: new Date(2017,2,3), startTime: 0, endTime: 0, allDay:true, start:null, end:null},
  {id: 514, calendar: "Middles Experience", title: 'Event 4', detail: "Hello World", location: "Room 404", startDate: new Date(2017,2,8), endDate: new Date(2017,2,8), startTime: 9, endTime: 11, allDay:false, start:null, end:null},
  {id: 515, calendar: "Westore Experience", title: 'Event 5', detail: "Hello World", location: "Room 405", startDate: new Date(2017,2,9), endDate: new Date(2017,2,9), startTime: 15, endTime: 21, allDay:false, start:null, end:null},
  {id: 516, calendar: "Westore Experience", title: 'Event 6', detail: "Hello World", location: "Room 406", startDate: new Date(2017,2,3), endDate: new Date(2017,2,3), startTime: 16, endTime: 17, allDay:false, start:null, end:null}
];