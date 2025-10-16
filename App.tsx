
import React, { useState, useCallback, useEffect } from 'react';
import { Book, PageView, User } from './types';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import Header from './components/Header';
import EbooksPage from './components/EbooksPage';
import HistoryPage from './components/HistoryPage';
import StudyMaterialsPage from './components/StudyMaterialsPage';
import ChatbotPage from './components/ChatbotPage';
import ContactPage from './components/ContactPage';
import BookDetailsPage from './components/BookDetailsPage';
import AdminPanelPage from './components/AdminPanelPage';
import { MOCK_USER } from './constants';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.LOGIN);
  const [collegeBag, setCollegeBag] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleLogin = useCallback((user: User) => {
    setCurrentUser(user);
    setCurrentPage(PageView.HOME);
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    setCurrentPage(PageView.LOGIN);
    setCollegeBag([]);
    setSelectedBook(null);
  }, []);

  const navigate = useCallback((page: PageView) => {
    setCurrentPage(page);
  }, []);

  const navigateToBookDetails = useCallback((book: Book) => {
    setSelectedBook(book);
    setCurrentPage(PageView.BOOK_DETAILS);
  }, []);

  const addToBag = useCallback((book: Book) => {
    if (collegeBag.length < 4 && !collegeBag.find(b => b.id === book.id)) {
      setCollegeBag(prev => [...prev, book]);
    } else if (collegeBag.length >= 4) {
      alert('You can only add up to 4 books to your bag at a time.');
    }
  }, [collegeBag]);
  
  const removeFromBag = useCallback((bookId: number) => {
      setCollegeBag(prev => prev.filter(b => b.id !== bookId));
  }, []);

  const clearBag = useCallback(() => {
    setCollegeBag([]);
  }, []);


  const renderPage = () => {
    if (!currentUser) {
      return <LoginPage onLogin={handleLogin} />;
    }
    
    switch (currentPage) {
      case PageView.HOME:
        return <HomePage navigate={navigate} userName={currentUser.name} />;
      case PageView.SEARCH:
        return <SearchPage collegeBag={collegeBag} addToBag={addToBag} removeFromBag={removeFromBag} onSelectBook={navigateToBookDetails} />;
      case PageView.EBOOKS:
        return <EbooksPage />;
      case PageView.HISTORY:
        return <HistoryPage user={currentUser} />;
      case PageView.STUDY_MATERIALS:
        return <StudyMaterialsPage />;
      case PageView.CHATBOT:
        return <ChatbotPage />;
      case PageView.CONTACT:
        return <ContactPage />;
      case PageView.BOOK_DETAILS:
        if (!selectedBook) {
            navigate(PageView.SEARCH);
            return null;
        }
        return <BookDetailsPage book={selectedBook} addToBag={addToBag} collegeBag={collegeBag} navigateBack={() => navigate(PageView.SEARCH)} />;
      case PageView.ADMIN_PANEL:
        return <AdminPanelPage />;
      default:
        return <HomePage navigate={navigate} userName={currentUser.name} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
       {currentUser && (
        <Header 
          navigate={navigate} 
          onLogout={handleLogout} 
          bagCount={collegeBag.length} 
        />
      )}
      <main className={`${currentUser ? 'pt-20' : ''}`}>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;