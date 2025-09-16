
import React, { useState, useCallback } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import Profile from './pages/Profile';
import { User, Post } from './types';
import { initialUsers, initialPosts } from './data/mockData';

export const AppContext = React.createContext<{
  users: User[];
  posts: Post[];
  currentUser: User;
  addPost: (post: Omit<Post, 'id' | 'authorId' | 'timestamp' | 'likes' | 'comments'>) => void;
  updateUser: (updatedUser: User) => void;
}>({
  users: [],
  posts: [],
  currentUser: initialUsers[0],
  addPost: () => {},
  updateUser: () => {},
});

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentUser, setCurrentUser] = useState<User>(initialUsers[0]);

  const addPost = useCallback((postData: Omit<Post, 'id' | 'authorId' | 'timestamp' | 'likes' | 'comments'>) => {
    const newPost: Post = {
      ...postData,
      id: `p${posts.length + 1}`,
      authorId: currentUser.id,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: [],
    };
    setPosts(prevPosts => [newPost, ...prevPosts]);
  }, [posts.length, currentUser.id]);

  const updateUser = useCallback((updatedUser: User) => {
    setCurrentUser(updatedUser);
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
  }, []);

  const appContextValue = {
    users,
    posts,
    currentUser,
    addPost,
    updateUser,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      <HashRouter>
        <div className="bg-background min-h-screen font-sans">
          <Navbar />
          <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;
