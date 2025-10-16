
import React, { useState } from 'react';
import { User } from '../types';
import { MOCK_USER } from '../constants';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [libraryId, setLibraryId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (libraryId === MOCK_USER.libraryId && mobileNumber === MOCK_USER.mobileNumber) {
        onLogin(MOCK_USER);
      } else {
        setError('Invalid Library ID or Mobile Number.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('https://picsum.photos/seed/librarybg/1920/1080')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center text-center text-white mb-8 animate-fade-in-down">
        <h1 className="text-5xl font-extrabold tracking-tight mb-2">
          Institute of Engineering and Technology, DAVV
        </h1>
        <p className="text-2xl font-light text-indigo-300">Digital Library Portal</p>
      </div>
      <div className="relative z-10 w-full max-w-md bg-gray-800/70 backdrop-blur-lg rounded-xl shadow-2xl p-8 animate-fade-in-up">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="libraryId" className="block text-sm font-medium text-gray-300">Library Number</label>
            <input
              id="libraryId"
              type="text"
              value={libraryId}
              onChange={(e) => setLibraryId(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
              placeholder="e.g., 12345"
            />
          </div>
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-300">Mobile Number (Password)</label>
            <input
              id="mobileNumber"
              type="password"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
              placeholder="e.g., 9876543210"
            />
          </div>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform hover:scale-105 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
