import { Book, EBook, StudyMaterial, User } from './types';

export const BRANCHES = [
  'Computer Engineering',
  'Information Technology',
  'Electronics & Telecommunication',
  'Mechanical Engineering',
  'Civil Engineering',
];

export const YEARS = [
    '1st Year',
    '2nd Year',
    '3rd Year',
    '4th Year',
];

export const SUBJECTS: { [key: string]: string[] } = {
  'Computer Engineering': ['Data Structures', 'Algorithms', 'Operating Systems', 'Database Management'],
  'Information Technology': ['Web Development', 'Cyber Security', 'Cloud Computing', 'Data Science'],
  'Electronics & Telecommunication': ['Digital Circuits', 'Signal Processing', 'Communication Systems'],
  'Mechanical Engineering': ['Thermodynamics', 'Fluid Mechanics', 'Machine Design'],
  'Civil Engineering': ['Structural Analysis', 'Geotechnical Engineering', 'Transportation Engineering'],
};

export const BOOKS: Book[] = [
  {
    id: 1,
    title: 'Data Structures & Algorithms in Java',
    author: 'Robert Lafore',
    summary: 'A comprehensive guide to fundamental data structures and algorithms using Java, with practical examples.',
    coverImage: 'https://picsum.photos/seed/book1/300/400',
    branch: 'Computer Engineering',
    subject: 'Data Structures',
    available: true,
    reviews: [{ studentName: 'Amit S.', rating: 5, comment: 'Excellent book for beginners!' }],
  },
  {
    id: 2,
    title: 'Operating System Concepts',
    author: 'Silberschatz, Galvin, Gagne',
    summary: 'The classic book on operating systems, covering all major concepts from processes to memory management.',
    coverImage: 'https://picsum.photos/seed/book2/300/400',
    branch: 'Computer Engineering',
    subject: 'Operating Systems',
    available: false,
    reviews: [{ studentName: 'Priya K.', rating: 4, comment: 'Very detailed, a must-read.' }],
  },
  {
    id: 3,
    title: 'Full Stack Web Development',
    author: 'Jane Doe',
    summary: 'Master front-end and back-end technologies to build complete web applications from scratch.',
    coverImage: 'https://picsum.photos/seed/book3/300/400',
    branch: 'Information Technology',
    subject: 'Web Development',
    available: true,
    reviews: [{ studentName: 'Rohan M.', rating: 5, comment: 'The best guide for MERN stack.' }],
  },
    {
    id: 4,
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen',
    summary: 'Often called CLRS, this is the bible of algorithms for students and professionals alike.',
    coverImage: 'https://picsum.photos/seed/book4/300/400',
    branch: 'Computer Engineering',
    subject: 'Algorithms',
    available: true,
    reviews: [{ studentName: 'Sneha P.', rating: 5, comment: 'Challenging but incredibly rewarding.' }],
  },
   {
    id: 5,
    title: 'Database System Concepts',
    author: 'Korth, Sudarshan',
    summary: 'A definitive guide to database management systems, covering SQL, relational algebra, and system design.',
    coverImage: 'https://picsum.photos/seed/book5/300/400',
    branch: 'Computer Engineering',
    subject: 'Database Management',
    available: false,
    reviews: [{ studentName: 'Vikram B.', rating: 4, comment: 'Comprehensive and well-structured.' }],
  },
  {
    id: 6,
    title: 'Cloud Computing: A Practical Approach',
    author: 'Velte, Velte, Elsenpeter',
    summary: 'Explores the fundamentals of cloud computing, service models like IaaS, PaaS, and SaaS, with real-world examples.',
    coverImage: 'https://picsum.photos/seed/book6/300/400',
    branch: 'Information Technology',
    subject: 'Cloud Computing',
    available: true,
    reviews: [{ studentName: 'Aditi G.', rating: 4, comment: 'Great overview of the cloud landscape.' }],
  }
];

export const MOCK_USER: User = {
  libraryId: '12345',
  mobileNumber: '9876543210',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  borrowingHistory: [BOOKS[1]],
  currentBooks: [{ book: BOOKS[3], dueDate: '2024-08-15' }],
};

export const EBOOKS: EBook[] = [
    {id: 1, title: 'Advanced Digital Circuits', author: 'A. Kumar', format: 'PDF', url: '#'},
    {id: 2, title: 'Basics of Signal Processing', author: 'B. Gupta', format: 'PDF', url: '#'},
    {id: 3, title: 'Machine Design Fundamentals', author: 'C. Verma', format: 'DOC', url: '#'},
];

export const STUDY_MATERIALS: StudyMaterial[] = [
    {id: 1, title: 'DSA - Linked List Notes', type: 'notes', subject: 'Data Structures', uploadedBy: 'Prof. Anjali Mehta', url: '#'},
    {id: 2, title: 'OS - Mid Sem 2023 Paper', type: 'paper', subject: 'Operating Systems', uploadedBy: 'Admin', url: '#'},
    {id: 3, title: 'Web Dev - React Hooks Cheatsheet', type: 'notes', subject: 'Web Development', uploadedBy: 'Riya Singh (Topper)', url: '#'},
];