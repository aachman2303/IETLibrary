
export interface Review {
  studentName: string;
  rating: number;
  comment: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  summary: string;
  coverImage: string;
  branch: string;
  subject: string;
  available: boolean;
  reviews: Review[];
}

export interface User {
  libraryId: string;
  mobileNumber: string; // Also password
  name: string;
  email:string;
  borrowingHistory: Book[];
  currentBooks: { book: Book; dueDate: string }[];
}

export interface EBook {
  id: number;
  title: string;
  author: string;
  format: 'PDF' | 'DOC';
  url: string;
}

export interface StudyMaterial {
    id: number;
    title: string;
    type: 'notes' | 'paper';
    subject: string;
    uploadedBy: string;
    url: string;
}


export enum PageView {
  LOGIN,
  HOME,
  SEARCH,
  EBOOKS,
  HISTORY,
  STUDY_MATERIALS,
  CHATBOT,
  CONTACT,
  BOOK_DETAILS,
  ADMIN_PANEL,
}

export interface ChatMessage {
    sender: 'user' | 'bot';
    text: string;
}

export interface BookRequest {
  title: string;
  author: string;
  isbn?: string;
  reason?: string;
  requestedAt: string;
}