
import React, { useContext, useState } from 'react';
import { Post, User } from '../types';
import { AppContext } from '../App';
import { HeartIcon, ChatAltIcon, ShareIcon, DotsVerticalIcon } from './icons/Icons';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
    const { users } = useContext(AppContext);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.likes);

    const author = users.find(user => user.id === post.authorId);

    if (!author) {
        return null;
    }

    const handleLike = () => {
        if (isLiked) {
            setLikeCount(prev => prev - 1);
        } else {
            setLikeCount(prev => prev + 1);
        }
        setIsLiked(!isLiked);
    };

    const timeAgo = (timestamp: string): string => {
        const now = new Date();
        const postDate = new Date(timestamp);
        const seconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + "y ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + "mo ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + "d ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + "h ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + "m ago";
        return Math.floor(seconds) + "s ago";
    };

    return (
        <div className="bg-surface rounded-xl shadow-lg overflow-hidden mb-6 transition-transform duration-300 hover:scale-[1.01] hover:shadow-xl">
            <div className="p-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img className="h-12 w-12 rounded-full border-2 border-secondary" src={author.profilePicture} alt={author.name} />
                        <div className="ml-3">
                            <p className="text-md font-bold text-text-primary">{author.name}</p>
                            <p className="text-sm text-text-secondary">{timeAgo(post.timestamp)}</p>
                        </div>
                    </div>
                     <button className="text-gray-400 hover:text-gray-600">
                        <DotsVerticalIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
            {post.imageUrl && (
                <img className="w-full h-auto object-cover" src={post.imageUrl} alt="Post content" />
            )}
            <div className="p-4">
                <p className="text-text-secondary mb-4">{post.content}</p>
                <div className="flex justify-between items-center text-text-secondary">
                    <div className="flex space-x-6">
                        <button onClick={handleLike} className={`flex items-center space-x-2 hover:text-primary transition-colors duration-200 ${isLiked ? 'text-primary' : ''}`}>
                            <HeartIcon className={`w-6 h-6 ${isLiked ? 'fill-current' : 'stroke-current'}`} />
                            <span>{likeCount}</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-accent transition-colors duration-200">
                            <ChatAltIcon className="w-6 h-6" />
                            <span>{post.comments.length}</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-secondary transition-colors duration-200">
                            <ShareIcon className="w-6 h-6" />
                            <span>Share</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;
