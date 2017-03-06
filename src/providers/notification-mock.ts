import {Notification} from './notification';

export const NOTIFICATIONS: Notification[] = [
    {
        id: 111,
        name: 'Announcement 1',
        description: 'Class 1',
        detail: "Hello World",
        nType: "announcement",
        publishedBy: "Peter",
        publishedAt: "Today",
        isNew: true
    },
    {
        id: 112,
        name: 'Announcement 2',
        description: 'Club 2',
        detail: "Hello World",
        nType: "announcement",
        publishedBy: "Mary",
        publishedAt: "Yesterday",
        isNew: true
    },
    {
        id: 113,
        name: 'SystemHeadline 1',
        description: 'Campus',
        detail: "Hello World",
        nType: "systemheadline",
        publishedBy: "Chris",
        publishedAt: "Dec 20, 2016",
        isNew: true
    },
    {
        id: 114,
        name: 'SystemHeadline 2',
        description: 'Campus',
        detail: "Hello World",
        nType: "systemheadline",
        publishedBy: "Sherry",
        publishedAt: "Dec 14, 2016",
        isNew: true
    },
    {
        id: 115,
        name: 'Others 1',
        description: 'Class 2',
        detail: "Hello World",
        nType: "others",
        publishedBy: "Louis",
        publishedAt: "Today",
        isNew: true
    },
    {
        id: 116,
        name: 'Others 2',
        description: 'Office 1',
        detail: "Hello World",
        nType: "others",
        publishedBy: "Fred",
        publishedAt: "Yesterday",
        isNew: true
    }
];