
import React from 'react';
import { User } from '../types';

const HistoryPage: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-white">My Library History</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current Books */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-indigo-400">Currently Issued Books</h2>
          {user.currentBooks.length > 0 ? (
            <ul className="space-y-4">
              {user.currentBooks.map(({ book, dueDate }) => (
                <li key={book.id} className="flex items-center space-x-4 bg-gray-700 p-3 rounded-md">
                  <img src={book.coverImage} alt={book.title} className="w-12 h-16 object-cover rounded" />
                  <div>
                    <p className="font-semibold text-white">{book.title}</p>
                    <p className="text-sm text-gray-400">Due Date: <span className="font-medium text-yellow-400">{dueDate}</span></p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">You have no books currently issued.</p>
          )}
        </div>

        {/* Borrowing History */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">Previously Borrowed Books</h2>
          {user.borrowingHistory.length > 0 ? (
            <ul className="space-y-4">
              {user.borrowingHistory.map((book) => (
                <li key={book.id} className="flex items-center space-x-4 bg-gray-700 p-3 rounded-md">
                  <img src={book.coverImage} alt={book.title} className="w-12 h-16 object-cover rounded" />
                  <div>
                    <p className="font-semibold text-white">{book.title}</p>
                    <p className="text-sm text-gray-400">{book.author}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">You have no borrowing history.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
