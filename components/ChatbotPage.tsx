
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getChatbotResponse } from '../services/geminiService';

const ChatbotPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: "Hello! I'm Librarian AI. How can I assist you with your studies or finding books today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
        const botResponseText = await getChatbotResponse(messages, input);
        const botMessage: ChatMessage = { sender: 'bot', text: botResponseText };
        setMessages(prev => [...prev, botMessage]);
    } catch (error) {
        const errorMessage: ChatMessage = { sender: 'bot', text: 'Sorry, I am having trouble connecting. Please try again later.' };
        setMessages(prev => [...prev, errorMessage]);
    } finally {
        setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-4 text-center text-white">AI Assistant</h1>
      <div className="flex-grow bg-gray-800 rounded-lg shadow-xl flex flex-col overflow-hidden">
        <div className="flex-grow p-6 space-y-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-indigo-500 flex-shrink-0"></div>}
              <div className={`px-4 py-2 rounded-xl max-w-lg ${
                  msg.sender === 'user'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-700 text-white rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-end gap-2 justify-start">
               <div className="w-8 h-8 rounded-full bg-indigo-500 flex-shrink-0"></div>
                <div className="px-4 py-3 rounded-xl bg-gray-700 text-white rounded-bl-none">
                    <div className="flex items-center justify-center space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 bg-gray-700/50 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              className="flex-grow bg-gray-900 border border-gray-600 rounded-full py-2 px-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-indigo-600 text-white rounded-full p-2 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-not-allowed transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
