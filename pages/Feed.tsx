
import React, { useContext } from 'react';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import { AppContext } from '../App';

const Feed: React.FC = () => {
    const { posts } = useContext(AppContext);
    
    return (
        <div>
            <CreatePost />
            <div className="space-y-6">
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Feed;
