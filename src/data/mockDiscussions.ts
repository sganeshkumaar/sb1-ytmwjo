import { Discussion } from '../types/discussion';

export const mockDiscussions: Discussion[] = [
  {
    id: 'disc-1',
    title: 'Voltage fluctuation in high temperature',
    author: {
      id: 'user-1',
      name: 'John Smith',
      avatar: 'https://i.pravatar.cc/150?u=user1'
    },
    content: 'I noticed some unusual voltage fluctuations when running the test at temperatures above 85°C. Anyone else seeing this?',
    createdAt: '2024-02-25T10:30:00Z',
    status: 'open',
    tags: ['voltage', 'temperature', 'investigation'],
    comments: [
      {
        id: 'comment-1',
        userId: 'user-2',
        content: 'Yes, I observed similar behavior. Could be related to the thermal compensation circuit.',
        createdAt: '2024-02-25T11:15:00Z',
        replies: [
          {
            id: 'reply-1',
            userId: 'user-1',
            content: 'Good point. I\'ll check the thermal compensation parameters.',
            createdAt: '2024-02-25T11:30:00Z'
          }
        ]
      }
    ]
  },
  {
    id: 'disc-2',
    title: 'Test case optimization suggestion',
    author: {
      id: 'user-3',
      name: 'Emily Chen',
      avatar: 'https://i.pravatar.cc/150?u=user3'
    },
    content: 'We might want to add more test points around the nominal operating voltage to better characterize the regulation.',
    createdAt: '2024-02-24T15:45:00Z',
    status: 'resolved',
    tags: ['optimization', 'test-coverage'],
    comments: []
  }
];