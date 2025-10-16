
import React from 'react';
import { PageView } from '../types';
import { BookOpenIcon, ShoppingBagIcon } from './Icons';

interface HeaderProps {
  navigate: (page: PageView) => void;
  onLogout: () => void;
  bagCount: number;
}

const NavLink: React.FC<{ onClick: () => void; children: React.ReactNode }> = ({ onClick, children }) => (
    <button onClick={onClick} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
        {children}
    </button>
);

const Header: React.FC<HeaderProps> = ({ navigate, onLogout, bagCount }) => {
  return (
    <header className="bg-gray-800/80 backdrop-blur-sm shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => navigate(PageView.HOME)} className="flex-shrink-0 flex items-center text-white space-x-2">
              <BookOpenIcon className="h-8 w-8 text-indigo-400"/>
              <span className="font-bold text-xl">IET-DAVV Library</span>
            </button>
            <nav className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <NavLink onClick={() => navigate(PageView.SEARCH)}>Search</NavLink>
                <NavLink onClick={() => navigate(PageView.EBOOKS)}>eBooks</NavLink>
                <NavLink onClick={() => navigate(PageView.HISTORY)}>My History</NavLink>
                <NavLink onClick={() => navigate(PageView.STUDY_MATERIALS)}>Study Materials</NavLink>
                <NavLink onClick={() => navigate(PageView.CHATBOT)}>AI Assistant</NavLink>
                <NavLink onClick={() => navigate(PageView.CONTACT)}>Contact Us</NavLink>
                <NavLink onClick={() => navigate(PageView.ADMIN_PANEL)}>Admin</NavLink>
              </div>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
             <div className="relative">
                <ShoppingBagIcon className="h-6 w-6 text-gray-300 hover:text-white cursor-pointer" onClick={() => navigate(PageView.SEARCH)} />
                {bagCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {bagCount}
                    </span>
                )}
            </div>
            <button onClick={onLogout} className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200">
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;