import React from 'react';
import { Book } from '../types';

interface BookDetailsPageProps {
  book: Book;
  addToBag: (book: Book) => void;
  collegeBag: Book[];
  navigateBack: () => void;
}

const BookDetailsPage: React.FC<BookDetailsPageProps> = ({ book, addToBag, collegeBag, navigateBack }) => {
  const isInBag = collegeBag.some(b => b.id === book.id);

  const [isOrderTime, setIsOrderTime] = React.useState(false);
  React.useEffect(() => {
    const currentHour = new Date().getHours();
    setIsOrderTime(currentHour >= 9 && currentHour < 17);
    const interval = setInterval(() => {
        const hour = new Date().getHours();
        setIsOrderTime(hour >= 9 && hour < 17);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const avgRating = React.useMemo(() => {
    if (book.reviews.length === 0) return 'N/A';
    const total = book.reviews.reduce((acc, r) => acc + r.rating, 0);
    return (total / book.reviews.length).toFixed(1);
  }, [book.reviews]);

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 animate-fade-in-up">
      <button onClick={navigateBack} className="mb-8 text-indigo-400 hover:text-indigo-300 font-semibold flex items-center transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Search
      </button>

      <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden md:flex">
        <div className="md:w-1/3 md:flex-shrink-0">
          <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-8 md:w-2/3 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{book.title}</h1>
            <p className="text-lg text-gray-400 mb-4">{book.author}</p>
            <p className="text-gray-300 leading-relaxed">{book.summary}</p>
          </div>
          <div className="mt-6">
            <div className="flex items-center mb-4">
                <span className="text-yellow-400 text-lg">★ {avgRating}</span>
                <span className="text-gray-500 ml-2">({book.reviews.length} reviews)</span>
            </div>
            {book.available ? (
              <button
                onClick={() => addToBag(book)}
                disabled={isInBag || !isOrderTime}
                className={`w-full mt-auto py-3 px-4 rounded-md text-base font-semibold transition-colors duration-200 ${
                  isInBag ? 'bg-gray-600 text-gray-400 cursor-default' :
                  !isOrderTime ? 'bg-yellow-800 text-yellow-300 cursor-not-allowed' :
                  'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {isInBag ? 'Added to Bag' : !isOrderTime ? 'Ordering Closed (9am-5pm)' : 'Add to Bag'}
              </button>
            ) : (
              <p className="w-full mt-auto text-center py-3 px-4 rounded-md bg-red-900 text-red-200 font-semibold">Out of Stock</p>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Student Reviews</h2>
        <div className="space-y-6">
          {book.reviews.length > 0 ? book.reviews.map((review, index) => (
            <div key={index} className="bg-gray-800 p-5 rounded-lg shadow-lg">
              <div className="flex items-center mb-2">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white">
                    {review.studentName.charAt(0)}
                  </div>
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-white">{review.studentName}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 mt-2 italic">"{review.comment}"</p>
            </div>
          )) : (
            <div className="bg-gray-800 p-5 rounded-lg text-center text-gray-400">
              <p>No reviews yet for this book.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;