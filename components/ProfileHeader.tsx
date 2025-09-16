
import React, { useState, useContext } from 'react';
import { AppContext } from '../App';
import { PencilIcon, CameraIcon } from './icons/Icons';

const ProfileHeader: React.FC = () => {
    const { currentUser, updateUser } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(currentUser.name);

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                updateUser({ ...currentUser, profilePicture: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        updateUser({ ...currentUser, name: name });
        setIsEditing(false);
    };

    return (
        <div className="bg-surface rounded-xl shadow-lg p-6 mb-8 relative">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative group">
                    <img src={currentUser.profilePicture} alt={currentUser.name} className="w-32 h-32 rounded-full border-4 border-primary shadow-md" />
                    <label htmlFor="profile-pic-upload" className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center rounded-full cursor-pointer transition-opacity">
                        <CameraIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </label>
                    <input id="profile-pic-upload" type="file" className="hidden" accept="image/*" onChange={handleProfilePicChange} />
                </div>
                <div className="text-center sm:text-left">
                    {isEditing ? (
                        <div className="flex items-center space-x-2">
                             <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="text-3xl font-bold text-text-primary border-b-2 border-primary focus:outline-none"/>
                             <button onClick={handleSave} className="bg-accent text-white px-4 py-1 rounded-lg">Save</button>
                        </div>
                       
                    ) : (
                        <div className="flex items-center space-x-2">
                             <h1 className="text-3xl font-bold text-text-primary">{currentUser.name}</h1>
                             <button onClick={() => setIsEditing(true)} className="text-text-secondary hover:text-primary">
                                <PencilIcon className="w-5 h-5" />
                             </button>
                        </div>
                    )}
                    <p className="text-text-secondary mt-1">@{currentUser.username}</p>
                </div>
            </div>
        </div>
    );
}

export default ProfileHeader;
