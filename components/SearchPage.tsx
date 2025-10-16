import React, { useState, useMemo, useEffect } from 'react';
import { Book, BookRequest, Review } from '../types';
import { BOOKS, BRANCHES, SUBJECTS } from '../constants';

interface BookCardProps {
    book: Book;
    onAddToBag: (book: Book) => void;
    isInBag: boolean;
    isOrderTime: boolean;
    onSelectBook: (book: Book) => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onAddToBag, isInBag, isOrderTime, onSelectBook }) => {
    const avgRating = useMemo(() => {
        if (book.reviews.length === 0) return 0;
        const total = book.reviews.reduce((acc, r) => acc + r.rating, 0);
        return (total / book.reviews.length).toFixed(1);
    }, [book.reviews]);

    const handleAddToBagClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        onAddToBag(book);
    };

    return (
        <div onClick={() => onSelectBook(book)} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-1 transition-transform duration-300 flex flex-col cursor-pointer">
            <div className="relative">
                <img src={book.coverImage} alt={book.title} className={`w-full h-56 object-cover ${!book.available ? 'filter grayscale' : ''}`} />
                
                {/* Status Badge */}
                <div className={`absolute top-2 right-2 px-2 py-1 text-xs font-bold text-white rounded-full shadow-md ${
                    book.available ? 'bg-green-600/90' : 'bg-red-600/90'
                }`}>
                    {book.available ? 'Available' : 'Out of Stock'}
                </div>

                {/* In Bag Indicator */}
                {isInBag && (
                    <div className="absolute top-2 left-2 p-1.5 bg-indigo-500/90 rounded-full text-white shadow-md" title="In your bag">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                    </div>
                )}
            </div>
            
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white">{book.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{book.author}</p>
                <p className="text-xs text-gray-300 mb-3 flex-grow line-clamp-3">{book.summary}</p>
                <div className="flex items-center mt-auto pt-2 mb-4">
                    <span className="text-yellow-400">★ {avgRating}</span>
                    <span className="text-gray-500 ml-2">({book.reviews.length} reviews)</span>
                </div>
                
                {/* Action Button Area */}
                {book.available ? (
                    <button
                        onClick={handleAddToBagClick}
                        disabled={isInBag || !isOrderTime}
                        className={`w-full py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-200 flex items-center justify-center space-x-2 
                            ${isInBag ? 'bg-green-600 text-white cursor-default' : 
                            !isOrderTime ? 'bg-yellow-800 text-yellow-300 cursor-not-allowed' :
                            'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                    >
                        {isInBag ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span>Added to Bag</span>
                            </>
                        ) : !isOrderTime ? (
                            <span>Ordering Closed (9am-5pm)</span>
                        ) : (
                             <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span>Add to Bag</span>
                            </>
                        )}
                    </button>
                ) : (
                    <div className="text-center w-full py-2 px-4 rounded-md bg-gray-700 text-gray-400 font-semibold cursor-not-allowed">
                        Out of Stock
                    </div>
                )}
            </div>
        </div>
    );
};

interface CollegeBagProps {
    bag: Book[];
    onRemove: (bookId: number) => void;
    onOrder: (email: string) => void;
}

const generatePickupSlot = (): string => {
    const now = new Date();
    let pickupDate = new Date();
    let pickupHour: number;

    if (now.getHours() < 12) {
        // Same day, random hour from 2 PM to 4 PM
        pickupHour = Math.floor(Math.random() * 3) + 14; // 14, 15, 16
    } else {
        // Next day, random hour from 10 AM to 3 PM
        pickupDate.setDate(now.getDate() + 1);
        pickupHour = Math.floor(Math.random() * 6) + 10; // 10, 11, 12, 13, 14, 15
    }

    const displayHour = pickupHour % 12 === 0 ? 12 : pickupHour % 12;
    const ampm = pickupHour >= 12 ? 'PM' : 'AM';
    const timeSlot = `${displayHour}:00 - ${displayHour}:30 ${ampm}`;
    const dateString = pickupDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });

    return `Your estimated pickup time is ${timeSlot} on ${dateString}.`;
}


const CollegeBag: React.FC<CollegeBagProps> = ({ bag, onRemove, onOrder }) => {
    const [email, setEmail] = useState('');
    const [confirmation, setConfirmation] = useState<{ message: string; email: string } | null>(null);

    const handleOrder = () => {
        if (email && /\S+@\S+\.\S+/.test(email)) {
            const slotMessage = generatePickupSlot();
            setConfirmation({
                message: slotMessage,
                email: email
            });
            onOrder(email);
        } else {
            alert('Please enter a valid email address.');
        }
    };

    if (confirmation) {
        return (
             <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-500 mb-4">
                    <svg className="h-6 w-6 text-white" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-green-400">Order Placed!</h2>
                <p className="text-gray-300">A confirmation email will be sent to <span className="font-semibold text-white">{confirmation.email}</span>.</p>
                <div className="mt-4 text-lg text-yellow-300 bg-gray-900/50 border border-yellow-500/30 p-4 rounded-lg">
                    <p className="font-semibold">Pickup Details:</p>
                    <p>{confirmation.message}</p>
                </div>
                <button 
                    onClick={() => setConfirmation(null)}
                    className="w-full mt-6 py-2 px-4 rounded-md text-sm font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                    Done
                </button>
            </div>
        )
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-indigo-400">My College Bag ({bag.length}/4)</h2>
            {bag.length === 0 ? (
                <p className="text-gray-400">Your bag is empty. Add books to place an order.</p>
            ) : (
                <div className="space-y-4">
                    {bag.map(book => (
                        <div key={book.id} className="flex items-center justify-between bg-gray-700 p-2 rounded-md">
                            <div className="flex items-center space-x-3">
                                <img src={book.coverImage} alt={book.title} className="w-10 h-14 object-cover rounded"/>
                                <div>
                                    <p className="font-semibold text-white">{book.title}</p>
                                    <p className="text-xs text-gray-400">{book.author}</p>
                                </div>
                            </div>
                            <button onClick={() => onRemove(book.id)} className="text-red-400 hover:text-red-500 font-semibold">Remove</button>
                        </div>
                    ))}
                    <div className="mt-6 border-t border-gray-700 pt-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">Confirm Your Gmail ID</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="your.email@gmail.com"
                            className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <button 
                            onClick={handleOrder}
                            className="w-full mt-4 py-2 px-4 rounded-md text-sm font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

interface SearchPageProps {
  collegeBag: Book[];
  addToBag: (book: Book) => void;
  removeFromBag: (bookId: number) => void;
  onSelectBook: (book: Book) => void;
}

const BOOKS_PER_PAGE = 10;

const SearchPage: React.FC<SearchPageProps> = ({ collegeBag, addToBag, removeFromBag, onSelectBook }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [requestAuthor, setRequestAuthor] = useState('');
  const [requestIsbn, setRequestIsbn] = useState('');
  const [requestReason, setRequestReason] = useState('');
  const [isOrderTime, setIsOrderTime] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const allBooks = useMemo(() => {
    const customBooksJSON = localStorage.getItem('customBooks');
    const customBooks: Book[] = customBooksJSON ? JSON.parse(customBooksJSON) : [];
    const baseBooks = [...BOOKS, ...customBooks];

    const allStoredReviewsJSON = localStorage.getItem('bookReviews');
    const allStoredReviews: { [key: number]: Review[] } = allStoredReviewsJSON ? JSON.parse(allStoredReviewsJSON) : {};

    return baseBooks.map(book => {
        const storedReviewsForBook = allStoredReviews[book.id] || [];
        // Combine and remove potential duplicates by stringifying
        const combinedReviews = [...book.reviews, ...storedReviewsForBook];
        const uniqueReviewStrings = new Set(combinedReviews.map(r => JSON.stringify(r)));
        const uniqueReviews = Array.from(uniqueReviewStrings).map(s => JSON.parse(s));
        
        return { ...book, reviews: uniqueReviews };
    });
  }, []);

  useEffect(() => {
      const currentHour = new Date().getHours();
      setIsOrderTime(currentHour >= 9 && currentHour < 17);

      const interval = setInterval(() => {
          const hour = new Date().getHours();
          setIsOrderTime(hour >= 9 && hour < 17);
      }, 60000); // Check every minute

      return () => clearInterval(interval);
  }, []);

  const booksToShow = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (term) {
      return allBooks.filter(b =>
        b.title.toLowerCase().includes(term) ||
        b.author.toLowerCase().includes(term)
      );
    }
    if (selectedBranch && selectedSubject) {
      return allBooks.filter(b => b.branch === selectedBranch && b.subject === selectedSubject);
    }
    return [];
  }, [searchTerm, selectedBranch, selectedSubject, allBooks]);

  // Reset to first page whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedBranch, selectedSubject]);

  const totalPages = Math.ceil(booksToShow.length / BOOKS_PER_PAGE);
  const paginatedBooks = useMemo(() => {
      const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
      return booksToShow.slice(startIndex, startIndex + BOOKS_PER_PAGE);
  }, [booksToShow, currentPage]);


  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value) {
      setSelectedBranch('');
      setSelectedSubject('');
    }
  };
  
  const handleBranchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchTerm('');
    setSelectedBranch(e.target.value);
    setSelectedSubject('');
  };
  
  const handleSubjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchTerm('');
    setSelectedSubject(e.target.value);
  };

  const handleRequestBook = () => {
    if (!searchTerm.trim()) {
        alert("Please enter a book title to request.");
        return;
    }

    try {
        const existingRequestsJSON = localStorage.getItem('bookRequests');
        const existingRequests: BookRequest[] = existingRequestsJSON ? JSON.parse(existingRequestsJSON) : [];
        
        const newRequest: BookRequest = {
            title: searchTerm.trim(),
            author: requestAuthor.trim(),
            isbn: requestIsbn.trim(),
            reason: requestReason.trim(),
            requestedAt: new Date().toISOString(),
        };

        const isDuplicate = existingRequests.some(
            (req) => req.title.toLowerCase() === newRequest.title.toLowerCase()
        );

        if (isDuplicate) {
            alert(`You have already requested "${newRequest.title}". We will notify you when it's available.`);
            return;
        }

        existingRequests.push(newRequest);
        localStorage.setItem('bookRequests', JSON.stringify(existingRequests));
        alert(`Your request for "${newRequest.title}" has been submitted successfully!`);
        
        setSearchTerm('');
        setRequestAuthor('');
        setRequestIsbn('');
        setRequestReason('');

    } catch (error) {
        console.error("Failed to save book request:", error);
        alert("An error occurred while submitting your request. Please try again.");
    }
  };

  const handleOrderBooks = (email: string) => {
    console.log(`Order placed! A confirmation email has been sent to ${email}.`);
    // In a real app, this would clear the bag after order confirmation, 
    // for now the state is managed within the CollegeBag component itself.
    // clearBag();
  };


  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6 text-white">Search for Books</h1>
            <div className="bg-gray-800 p-4 rounded-lg mb-8 space-y-4">
                <input
                    type="text"
                    placeholder="Search by Title or Author..."
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    className="w-full bg-gray-700 text-white p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                />
                <div className="flex items-center text-gray-400">
                    <div className="flex-grow border-t border-gray-600"></div>
                    <span className="flex-shrink mx-4 text-xs font-semibold">OR FILTER BY</span>
                    <div className="flex-grow border-t border-gray-600"></div>
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                    <select value={selectedBranch} onChange={handleBranchChange} className="w-full bg-gray-700 text-white p-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">-- Select Branch --</option>
                    {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                    <select value={selectedSubject} onChange={handleSubjectChange} disabled={!selectedBranch} className="w-full bg-gray-700 text-white p-2 rounded-md disabled:bg-gray-600 disabled:cursor-not-allowed focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="">-- Select Subject --</option>
                    {selectedBranch && SUBJECTS[selectedBranch]?.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedBooks.length > 0 ? paginatedBooks.map(book => (
                    <BookCard 
                        key={book.id} 
                        book={book} 
                        onAddToBag={addToBag} 
                        isInBag={collegeBag.some(b => b.id === book.id)}
                        isOrderTime={isOrderTime}
                        onSelectBook={onSelectBook}
                    />
                )) : (
                    <div className="col-span-full text-center py-10 text-gray-400">
                        {searchTerm ? (
                            <div>
                                <p className="mb-4">No results found for "{searchTerm}".</p>
                                <div className="mt-6 bg-gray-800 p-6 rounded-lg max-w-md mx-auto shadow-lg">
                                    <h3 className="text-lg font-bold text-white mb-4">Request this Book</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="req-title" className="block text-sm font-medium text-gray-300 text-left">Book Title</label>
                                            <input type="text" id="req-title" value={searchTerm} readOnly className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-gray-400 cursor-not-allowed" />
                                        </div>
                                        <div>
                                            <label htmlFor="req-author" className="block text-sm font-medium text-gray-300 text-left">Author (if known)</label>
                                            <input
                                                type="text"
                                                id="req-author"
                                                value={requestAuthor}
                                                onChange={(e) => setRequestAuthor(e.target.value)}
                                                placeholder="e.g., Robert C. Martin"
                                                className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="req-isbn" className="block text-sm font-medium text-gray-300 text-left">ISBN (if known)</label>
                                            <input
                                                type="text"
                                                id="req-isbn"
                                                value={requestIsbn}
                                                onChange={(e) => setRequestIsbn(e.target.value)}
                                                placeholder="e.g., 978-0132350884"
                                                className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-indigo-500"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="req-reason" className="block text-sm font-medium text-gray-300 text-left">Reason for Request</label>
                                            <textarea
                                                id="req-reason"
                                                rows={3}
                                                value={requestReason}
                                                onChange={(e) => setRequestReason(e.target.value)}
                                                placeholder="e.g., Required for my 'Advanced Algorithms' course."
                                                className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-indigo-500"
                                            />
                                        </div>
                                        <button
                                            onClick={handleRequestBook}
                                            className="w-full py-2 px-4 rounded-md font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
                                        >
                                            Submit Request
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p>Use the search bar or select a branch and subject to see available books.</p>
                        )}
                    </div>
                )}
                
                {totalPages > 1 && (
                    <div className="col-span-full mt-8 flex justify-center items-center space-x-4">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 bg-gray-700 rounded-md text-white font-semibold hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Previous
                        </button>
                        <span className="text-gray-300 font-medium">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 bg-gray-700 rounded-md text-white font-semibold hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
        
        <div className="lg:col-span-1">
            <CollegeBag bag={collegeBag} onRemove={removeFromBag} onOrder={handleOrderBooks} />
        </div>

      </div>
    </div>
  );
};

export default SearchPage;