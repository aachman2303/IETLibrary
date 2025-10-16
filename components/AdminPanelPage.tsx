
import React, { useState, useMemo } from 'react';
import { Book } from '../types';
import { BRANCHES, SUBJECTS, BOOKS } from '../constants';

const AdminPanelPage: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [summary, setSummary] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [branch, setBranch] = useState('');
    const [subject, setSubject] = useState('');
    const [available, setAvailable] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');

    const availableSubjects = useMemo(() => {
        if (!branch) return [];
        return SUBJECTS[branch] || [];
    }, [branch]);

    const resetForm = () => {
        setTitle('');
        setAuthor('');
        setSummary('');
        setCoverImage('');
        setBranch('');
        setSubject('');
        setAvailable(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !author || !branch || !subject) {
            alert('Please fill in all required fields (Title, Author, Branch, Subject).');
            return;
        }

        try {
            const customBooksJSON = localStorage.getItem('customBooks');
            const customBooks: Book[] = customBooksJSON ? JSON.parse(customBooksJSON) : [];
            
            const allBookIds = [...BOOKS.map(b => b.id), ...customBooks.map(b => b.id)];
            const newId = Math.max(0, ...allBookIds) + 1;

            const newBook: Book = {
                id: newId,
                title,
                author,
                summary,
                coverImage: coverImage || `https://picsum.photos/seed/book${newId}/300/400`,
                branch,
                subject,
                available,
                reviews: [],
            };

            customBooks.push(newBook);
            localStorage.setItem('customBooks', JSON.stringify(customBooks));

            setSuccessMessage(`Successfully added "${title}" to the library!`);
            resetForm();
            setTimeout(() => setSuccessMessage(''), 5000);

        } catch (error) {
            console.error("Failed to save new book:", error);
            alert("An error occurred while adding the book. Please check the console.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-white mb-8">Librarian Admin Panel</h1>
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold text-indigo-400 mb-6">Add a New Book</h2>

                {successMessage && (
                    <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg relative mb-6" role="alert">
                        <span className="block sm:inline">{successMessage}</span>
                    </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
                            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                        <div>
                            <label htmlFor="author" className="block text-sm font-medium text-gray-300">Author</label>
                            <input type="text" id="author" value={author} onChange={e => setAuthor(e.target.value)} required className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="summary" className="block text-sm font-medium text-gray-300">Summary</label>
                        <textarea id="summary" value={summary} onChange={e => setSummary(e.target.value)} rows={4} className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="coverImage" className="block text-sm font-medium text-gray-300">Cover Image URL</label>
                        <input type="url" id="coverImage" value={coverImage} onChange={e => setCoverImage(e.target.value)} placeholder="https://example.com/image.jpg" className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="branch" className="block text-sm font-medium text-gray-300">Branch</label>
                            <select id="branch" value={branch} onChange={e => { setBranch(e.target.value); setSubject(''); }} required className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                                <option value="">-- Select Branch --</option>
                                {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                            </select>
                        </div>
                         <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-300">Subject</label>
                            <select id="subject" value={subject} onChange={e => setSubject(e.target.value)} required disabled={!branch} className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-700 disabled:cursor-not-allowed">
                                <option value="">-- Select Subject --</option>
                                {availableSubjects.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-300">Availability</label>
                        <div className="mt-2 flex items-center space-x-4">
                           <label className="flex items-center">
                                <input type="radio" name="availability" checked={available} onChange={() => setAvailable(true)} className="form-radio h-4 w-4 text-indigo-600 bg-gray-700 border-gray-600 focus:ring-indigo-500" />
                                <span className="ml-2 text-white">Available</span>
                           </label>
                           <label className="flex items-center">
                                <input type="radio" name="availability" checked={!available} onChange={() => setAvailable(false)} className="form-radio h-4 w-4 text-indigo-600 bg-gray-700 border-gray-600 focus:ring-indigo-500" />
                                <span className="ml-2 text-white">Out of Stock</span>
                           </label>
                        </div>
                    </div>
                    <div className="pt-4">
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500">
                            Add Book to Library
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminPanelPage;
