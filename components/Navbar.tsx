
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from '../App';
import { HomeIcon, UserCircleIcon, LogoutIcon } from './icons/Icons';

const Navbar: React.FC = () => {
    const { currentUser } = useContext(AppContext);

    const activeLinkClass = "bg-pink-100 text-primary";
    const inactiveLinkClass = "text-text-secondary hover:bg-gray-200 hover:text-text-primary";
    const linkClasses = `flex items-center px-4 py-2 rounded-lg transition-colors duration-200`;

    return (
        <header className="bg-surface shadow-md sticky top-0 z-10">
            <nav className="max-w-4xl mx-auto flex justify-between items-center p-4">
                <div className="flex items-center space-x-2">
                     <span className="text-2xl font-bold text-primary">Sanika's Connect</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4">
                    <NavLink to="/" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}>
                        <HomeIcon className="w-6 h-6" />
                        <span className="hidden sm:inline ml-2">Feed</span>
                    </NavLink>
                    <NavLink to="/profile" className={({ isActive }) => `${linkClasses} ${isActive ? activeLinkClass : inactiveLinkClass}`}>
                        <UserCircleIcon className="w-6 h-6" />
                         <span className="hidden sm:inline ml-2">Profile</span>
                    </NavLink>
                    <button className={`${linkClasses} ${inactiveLinkClass}`}>
                        <LogoutIcon className="w-6 h-6" />
                        <span className="hidden sm:inline ml-2">Logout</span>
                    </button>
                    <div className="flex items-center">
                        <img src={currentUser.profilePicture} alt={currentUser.name} className="w-10 h-10 rounded-full border-2 border-primary" />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
