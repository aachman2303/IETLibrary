import React, { useState } from 'react';
import { User } from '../types';
import { MOCK_USER, BRANCHES, YEARS } from '../constants';

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  
  // Login State
  const [libraryId, setLibraryId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  
  // SignUp State
  const [fullName, setFullName] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [address, setAddress] = useState('');
  const [mobileNumberSignUp, setMobileNumberSignUp] = useState('');
  const [admissionSlip, setAdmissionSlip] = useState<File | null>(null);
  const [photograph, setPhotograph] = useState<File | null>(null);
  const [idProof, setIdProof] = useState<File | null>(null);
  const [signature, setSignature] = useState<File | null>(null);

  // Common State
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (libraryId === MOCK_USER.libraryId && mobileNumber === MOCK_USER.mobileNumber) {
        onLogin(MOCK_USER);
      } else {
        setError('Invalid Library ID or Mobile Number.');
      }
      setIsLoading(false);
    }, 1000);
  };
  
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: React.Dispatch<React.SetStateAction<File | null>>,
    maxSizeMB: number,
    allowedTypes: string[]
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File size exceeds ${maxSizeMB}MB.`);
        e.target.value = '';
        setFile(null);
        return;
      }
      if (!allowedTypes.includes(file.type)) {
        setError(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
        e.target.value = '';
        setFile(null);
        return;
      }
      setError('');
      setFile(file);
    }
  };

  const resetSignUpForm = () => {
    setFullName('');
    setBranch('');
    setYear('');
    setAddress('');
    setMobileNumberSignUp('');
    setAdmissionSlip(null);
    setPhotograph(null);
    setIdProof(null);
    setSignature(null);
    setError('');
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!fullName || !branch || !year || !mobileNumberSignUp || !admissionSlip || !photograph || !idProof || !signature) {
      setError('Please fill all required fields and upload all documents.');
      return;
    }

    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      alert('Sign up successful! You will receive your Library ID via email once your documents are verified. You can now log in with the demo account credentials.');
      resetSignUpForm();
      setIsSignUp(false);
    }, 1500);
  };

  const renderLoginForm = () => (
    <form onSubmit={handleLoginSubmit} className="space-y-6">
      <div>
        <label htmlFor="libraryId" className="block text-sm font-medium text-gray-300">Library Number</label>
        <input
          id="libraryId" type="text" value={libraryId} onChange={(e) => setLibraryId(e.target.value)}
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required placeholder="e.g., 12345"
        />
      </div>
      <div>
        <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-300">Mobile Number (Password)</label>
        <input
          id="mobileNumber" type="password" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}
          className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          required placeholder="e.g., 9876543210"
        />
      </div>
      <div>
        <button
          type="submit" disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform hover:scale-105 disabled:bg-indigo-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </div>
    </form>
  );

  const renderSignUpForm = () => (
    <form onSubmit={handleSignUpSubmit} className="space-y-8">
      <fieldset>
          <legend className="text-lg font-semibold text-gray-200 mb-4">Personal Information</legend>
          <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">Full Name</label>
                      <input id="fullName" type="text" value={fullName} onChange={e => setFullName(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-indigo-500"/>
                  </div>
                  <div>
                      <label htmlFor="mobileNumberSignUp" className="block text-sm font-medium text-gray-300">Mobile Number</label>
                      <input id="mobileNumberSignUp" type="tel" value={mobileNumberSignUp} onChange={e => setMobileNumberSignUp(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-indigo-500"/>
                  </div>
                  <div>
                      <label htmlFor="branch" className="block text-sm font-medium text-gray-300">Branch</label>
                      <select id="branch" value={branch} onChange={e => setBranch(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-indigo-500">
                          <option value="">Select Branch</option>
                          {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                  </div>
                  <div>
                      <label htmlFor="year" className="block text-sm font-medium text-gray-300">Year</label>
                      <select id="year" value={year} onChange={e => setYear(e.target.value)} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-indigo-500">
                          <option value="">Select Year</option>
                          {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                  </div>
              </div>
              <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-300">Address</label>
                  <textarea id="address" value={address} onChange={e => setAddress(e.target.value)} rows={2} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md py-2 px-3 text-white focus:ring-indigo-500"/>
              </div>
          </div>
      </fieldset>
      
      <fieldset>
          <legend className="text-lg font-semibold text-gray-200 mb-4">Required Documents</legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6">
              <div>
                  <label htmlFor="admissionSlip" className="block text-sm font-medium text-gray-300 mb-1">Admission Slip</label>
                  <input id="admissionSlip" type="file" required onChange={e => handleFileChange(e, setAdmissionSlip, 2, ['application/pdf'])} accept=".pdf" className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-indigo-200 hover:file:bg-gray-500"/>
                  <p className="text-xs text-gray-500 mt-1">PDF only, max 2MB.</p>
              </div>
              <div>
                  <label htmlFor="photograph" className="block text-sm font-medium text-gray-300 mb-1">Passport Size Photograph</label>
                  <input id="photograph" type="file" required onChange={e => handleFileChange(e, setPhotograph, 2, ['image/jpeg', 'image/png'])} accept="image/jpeg,image/png" className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-indigo-200 hover:file:bg-gray-500"/>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG, max 2MB.</p>
              </div>
              <div>
                  <label htmlFor="idProof" className="block text-sm font-medium text-gray-300 mb-1">Photo ID Proof</label>
                  <input id="idProof" type="file" required onChange={e => handleFileChange(e, setIdProof, 2, ['application/pdf', 'image/jpeg', 'image/png'])} accept=".pdf,image/jpeg,image/png" className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-indigo-200 hover:file:bg-gray-500"/>
                  <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG, max 2MB.</p>
              </div>
              <div>
                  <label htmlFor="signature" className="block text-sm font-medium text-gray-300 mb-1">Signature</label>
                  <input id="signature" type="file" required onChange={e => handleFileChange(e, setSignature, 2, ['image/jpeg', 'image/png'])} accept="image/jpeg,image/png" className="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-600 file:text-indigo-200 hover:file:bg-gray-500"/>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG, max 2MB.</p>
              </div>
          </div>
      </fieldset>
      
      <div>
        <button
          type="submit" disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 transition-transform transform hover:scale-105 disabled:bg-green-400 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </div>
    </form>
  );

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: "url('https://picsum.photos/seed/librarybg/1920/1080')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 flex flex-col items-center text-center text-white mb-8 animate-fade-in-down">
        <h1 className="text-5xl font-extrabold tracking-tight mb-2">
          Institute of Engineering and Technology, DAVV
        </h1>
        <p className="text-2xl font-light text-indigo-300">Digital Library Portal</p>
      </div>
      <div className="relative z-10 w-full max-w-2xl bg-gray-800/80 backdrop-blur-lg rounded-xl shadow-2xl p-8 animate-fade-in-up">
        
        <div className="flex border-b border-gray-700 mb-6">
            <button onClick={() => { setIsSignUp(false); setError(''); }} className={`py-2 px-4 text-sm font-medium transition-colors ${!isSignUp ? 'border-b-2 border-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}>
                Sign In
            </button>
            <button onClick={() => { setIsSignUp(true); setError(''); }} className={`py-2 px-4 text-sm font-medium transition-colors ${isSignUp ? 'border-b-2 border-indigo-500 text-white' : 'text-gray-400 hover:text-white'}`}>
                Create Account
            </button>
        </div>

        <h2 className="text-3xl font-bold text-center text-white mb-6">{isSignUp ? 'New Student Registration' : 'Welcome Back'}</h2>
        
        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}
        
        {isSignUp ? renderSignUpForm() : renderLoginForm()}
      </div>
    </div>
  );
};

export default LoginPage;