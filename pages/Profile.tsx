
import React, { useContext } from 'react';
import PostCard from '../components/PostCard';
import ProfileHeader from '../components/ProfileHeader';
import { AppContext } from '../App';
import { Post } from '../types';

const Profile: React.FC = () => {
    const { posts, currentUser } = useContext(AppContext);
    const userPosts = posts.filter(post => post.authorId === currentUser.id);

    return (
        <div>
            <ProfileHeader />
             <h2 className="text-2xl font-bold text-text-primary mb-4">Your Posts</h2>
            {userPosts.length > 0 ? (
                <div className="space-y-6">
                    {userPosts.map((post: Post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            ) : (
                 <div className="text-center py-16 bg-surface rounded-lg">
                    <p className="text-text-secondary">You haven't posted anything yet.</p>
                 </div>
            )}
        </div>
    );
};

export default Profile;
