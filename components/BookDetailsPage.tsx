import React, { useState, useEffect, useMemo } from 'react';
import { Book, Review } from '../types';

interface BookDetailsPageProps {
  book: Book;
  addToBag: (book: Book) => void;
  collegeBag: Book[];
  navigateBack: () => void;
}

const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);


const BookDetailsPage: React.FC<BookDetailsPageProps> = ({ book, addToBag, collegeBag, navigateBack }) => {
  const [displayedBook, setDisplayedBook] = useState<Book>(book);
  
  // Form state
  const [studentName, setStudentName] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  
  // Sync local state with prop changes
  useEffect(() => {
    setDisplayedBook(book);
  }, [book]);


  const isInBag = collegeBag.some(b => b.id === displayedBook.id);

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

  const avgRating = useMemo(() => {
    if (displayedBook.reviews.length === 0) return 'N/A';
    const total = displayedBook.reviews.reduce((acc, r) => acc + r.rating, 0);
    return (total / displayedBook.reviews.length).toFixed(1);
  }, [displayedBook.reviews]);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !comment.trim() || rating === 0) {
      alert("Please fill out all fields and provide a rating.");
      return;
    }

    const newReview: Review = {
      studentName: studentName.trim(),
      rating,
      comment: comment.trim(),
    };

    try {
      const allStoredReviewsJSON = localStorage.getItem('bookReviews');
      const allStoredReviews: { [key: number]: Review[] } = allStoredReviewsJSON ? JSON.parse(allStoredReviewsJSON) : {};
      
      const reviewsForThisBook = allStoredReviews[displayedBook.id] || [];
      reviewsForThisBook.push(newReview);
      allStoredReviews[displayedBook.id] = reviewsForThisBook;
      
      localStorage.setItem('bookReviews', JSON.stringify(allStoredReviews));
    } catch (error) {
      console.error("Failed to save review:", error);
      alert("An error occurred while saving your review.");
      return;
    }

    setDisplayedBook(prev => ({
      ...prev,
      reviews: [...prev.reviews, newReview],
    }));

    // Reset form
    setStudentName('');
    setRating(0);
    setHoverRating(0);
    setComment('');
  };


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
          <img src={displayedBook.coverImage} alt={displayedBook.title} className="w-full h-full object-cover" />
        </div>
        <div className="p-8 md:w-2/3 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{displayedBook.title}</h1>
            <p className="text-lg text-gray-400 mb-4">{displayedBook.author}</p>
            <p className="text-gray-300 leading-relaxed">{displayedBook.summary}</p>
          </div>
          <div className="mt-6">
            <div className="flex items-center mb-4">
                <span className="text-yellow-400 text-lg">★ {avgRating}</span>
                <span className="text-gray-500 ml-2">({displayedBook.reviews.length} reviews)</span>
            </div>
            {displayedBook.available ? (
              <button
                onClick={() => addToBag(displayedBook)}
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
          {displayedBook.reviews.length > 0 ? displayedBook.reviews.map((review, index) => (
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
              <p>No reviews yet for this book. Be the first to leave one!</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-white mb-6">Leave a Review</h2>
        <form onSubmit={handleReviewSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
          <div>
            <label htmlFor="studentName" className="block text-sm font-medium text-gray-300">Your Name</label>
            <input
              type="text"
              id="studentName"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
              placeholder="e.g., Priya Kumar"
              className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Your Rating</label>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, index) => {
                const starValue = index + 1;
                return (
                  <StarIcon
                    key={starValue}
                    className={`h-8 w-8 cursor-pointer transition-colors ${
                      starValue <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`Rate ${starValue} stars`}
                  />
                );
              })}
            </div>
          </div>
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-300">Your Comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={4}
              placeholder="What did you think of this book?"
              className="mt-1 block w-full bg-gray-900 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed"
            disabled={!studentName.trim() || !comment.trim() || rating === 0}
          >
            Submit Review
          </button>
        </form>
      </div>

    </div>
  );
};

export default BookDetailsPage;