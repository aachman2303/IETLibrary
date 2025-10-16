
import React, { useState, useMemo } from 'react';
import { STUDY_MATERIALS } from '../constants';
import { StudyMaterial } from '../types';

const StudyMaterialsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'notes' | 'paper'>('notes');

  const filteredMaterials = useMemo(() => {
    return STUDY_MATERIALS.filter(material => material.type === activeTab);
  }, [activeTab]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Study Materials</h1>
        <label
            htmlFor="file-upload"
            className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
            Upload Material
        </label>
        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-700">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('notes')}
              className={`${
                activeTab === 'notes'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Notes
            </button>
            <button
              onClick={() => setActiveTab('paper')}
              className={`${
                activeTab === 'paper'
                  ? 'border-indigo-500 text-indigo-400'
                  : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Previous Year Papers
            </button>
          </nav>
        </div>
      </div>
      
      {/* Table */}
      <div className="bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Subject</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Uploaded By</th>
              <th scope="col" className="relative px-6 py-3"><span className="sr-only">View</span></th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredMaterials.map((material) => (
              <tr key={material.id} className="hover:bg-gray-700/50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{material.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{material.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{material.uploadedBy}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href={material.url} className="text-indigo-400 hover:text-indigo-300">View/Download</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudyMaterialsPage;
