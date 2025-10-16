
import React from 'react';
import { EBOOKS } from '../constants';

const EbooksPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-8 text-white">eBooks Collection</h1>
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Author</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Format</th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Download</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {EBOOKS.map((ebook) => (
              <tr key={ebook.id} className="hover:bg-gray-700/50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{ebook.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{ebook.author}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    ebook.format === 'PDF' ? 'bg-red-200 text-red-800' : 'bg-blue-200 text-blue-800'
                  }`}>
                    {ebook.format}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href={ebook.url} className="text-indigo-400 hover:text-indigo-300">
                    Download
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EbooksPage;
