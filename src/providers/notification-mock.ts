import { Notification } from './notification';

export const NOTIFICATIONS: Notification[] = [
  {id: 111, name: 'Announcement 1', description: 'Class 1', detail: "Hello World", nType:"announcement", publishedBy:"Peter", publishedAt: "Today"},
  {id: 112, name: 'Announcement 2', description: 'Club 2', detail: "Hello World", nType:"announcement", publishedBy:"Mary", publishedAt: "Yesterday"},
  {id: 113, name: 'SystemHeadline 1', description: 'Campus', detail: "Hello World", nType:"systemheadline", publishedBy:"Chris", publishedAt: "Dec 20, 2016"},
  {id: 114, name: 'SystemHeadline 2', description: 'Campus', detail: "Hello World", nType:"systemheadline", publishedBy:"Sherry", publishedAt: "Dec 14, 2016"},
  {id: 115, name: 'Others 1', description: 'Class 2', detail: "Hello World", nType:"others", publishedBy:"Louis", publishedAt: "Today"},
  {id: 116, name: 'Others 2', description: 'Office 1', detail: "Hello World", nType:"others", publishedBy:"Fred", publishedAt: "Yesterday"}        
];