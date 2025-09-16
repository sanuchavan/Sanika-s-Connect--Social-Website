
import { User, Post } from '../types';

export const initialUsers: User[] = [
  {
    id: 'u1',
    name: 'Sanika',
    username: 'sanika',
    profilePicture: 'https://picsum.photos/seed/sanika/200/200',
  },
  {
    id: 'u2',
    name: 'Priya',
    username: 'priya_k',
    profilePicture: 'https://picsum.photos/seed/priya/200/200',
  },
  {
    id: 'u3',
    name: 'Aishwarya',
    username: 'aish_patil',
    profilePicture: 'https://picsum.photos/seed/aishwarya/200/200',
  },
  {
    id: 'u4',
    name: 'Manasi',
    username: 'manasi_joshi',
    profilePicture: 'https://picsum.photos/seed/manasi/200/200',
  },
];

export const initialPosts: Post[] = [
  {
    id: 'p1',
    authorId: 'u2',
    content: 'Enjoying the beautiful sunset in Pune! What a view! 🌅 #pune #sunset',
    imageUrl: 'https://picsum.photos/seed/pune/600/400',
    timestamp: '2024-07-21T18:30:00Z',
    likes: 125,
    comments: [
        { id: 'c1', authorId: 'u1', text: 'Stunning!', timestamp: '2024-07-21T18:35:00Z' },
        { id: 'c2', authorId: 'u3', text: 'Wow, amazing click!', timestamp: '2024-07-21T18:40:00Z' },
    ],
  },
  {
    id: 'p2',
    authorId: 'u3',
    content: 'Tried this new cafe today. The coffee was just perfect! ☕️',
    imageUrl: 'https://picsum.photos/seed/coffee/600/400',
    timestamp: '2024-07-21T12:15:00Z',
    likes: 88,
    comments: [],
  },
  {
    id: 'p3',
    authorId: 'u1',
    content: 'My first attempt at painting. What do you guys think? 🎨',
    imageUrl: 'https://picsum.photos/seed/art/600/400',
    timestamp: '2024-07-20T20:00:00Z',
    likes: 210,
    comments: [
        { id: 'c3', authorId: 'u4', text: 'This is incredible for a first try!', timestamp: '2024-07-20T20:10:00Z' },
    ],
  },
    {
    id: 'p4',
    authorId: 'u4',
    content: 'Exploring the lush green hills during monsoon. Maharashtra is magical this time of year! 💚',
    imageUrl: 'https://picsum.photos/seed/hills/600/400',
    timestamp: '2024-07-19T09:45:00Z',
    likes: 152,
    comments: [
        { id: 'c4', authorId: 'u2', text: 'So true! Nothing beats the Sahyadris in monsoon.', timestamp: '2024-07-19T10:00:00Z' },
    ],
  },
];
