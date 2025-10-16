
import React from 'react';
import { PageView } from '../types';
import { SearchIcon, BookOpenIcon, HistoryIcon, FolderDownloadIcon, ChatBubbleIcon, PhoneIcon } from './Icons';

interface HomePageProps {
  navigate: (page: PageView) => void;
  userName: string;
}

const FeatureCard: React.FC<{ title: string; description: string; icon: React.ReactNode; onClick: () => void }> = ({ title, description, icon, onClick }) => (
    <div 
        onClick={onClick}
        className="bg-gray-800 rounded-lg p-6 flex flex-col items-center text-center cursor-pointer
                   transform hover:-translate-y-2 transition-transform duration-300 ease-in-out
                   shadow-lg hover:shadow-indigo-500/40"
    >
        <div className="bg-gray-700 p-4 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
        <p className="text-gray-400">{description}</p>
    </div>
);


const HomePage: React.FC<HomePageProps> = ({ navigate, userName }) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12 animate-fade-in-down">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          Welcome, {userName}!
        </h1>
        <p className="mt-4 text-lg text-gray-300">Your gateway to knowledge and discovery. What would you like to do today?</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up">
        <FeatureCard 
            title="Search Books" 
            description="Find physical books from our extensive collection across all branches."
            icon={<SearchIcon className="h-8 w-8 text-indigo-400" />}
            onClick={() => navigate(PageView.SEARCH)}
        />
        <FeatureCard 
            title="eBooks Collection" 
            description="Access digital versions of your favorite textbooks and reference materials."
            icon={<BookOpenIcon className="h-8 w-8 text-purple-400" />}
            onClick={() => navigate(PageView.EBOOKS)}
        />
        <FeatureCard 
            title="My History" 
            description="View your borrowing history, current checkouts, and account status."
            icon={<HistoryIcon className="h-8 w-8 text-green-400" />}
            onClick={() => navigate(PageView.HISTORY)}
        />
        <FeatureCard 
            title="Study Materials" 
            description="Explore notes and previous year papers uploaded by faculty and students."
            icon={<FolderDownloadIcon className="h-8 w-8 text-yellow-400" />}
            onClick={() => navigate(PageView.STUDY_MATERIALS)}
        />
        <FeatureCard 
            title="AI Assistant" 
            description="Chat with our AI chatbot for book suggestions, doubt solving, and more."
            icon={<ChatBubbleIcon className="h-8 w-8 text-blue-400" />}
            onClick={() => navigate(PageView.CHATBOT)}
        />
        <FeatureCard 
            title="Contact Us" 
            description="Get in touch with the library staff for any queries or support."
            icon={<PhoneIcon className="h-8 w-8 text-red-400" />}
            onClick={() => navigate(PageView.CONTACT)}
        />
      </div>
    </div>
  );
};

export default HomePage;
