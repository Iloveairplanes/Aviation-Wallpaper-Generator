
import React, { useState } from 'react';

interface PromptFormProps {
  initialValue: string;
  onSubmit: (prompt: string) => void;
  placeholder: string;
  buttonText: string;
  isLoading: boolean;
}

const GenerateIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7.5a1.5 1.5 0 01-1.5 1.5H6.5A1.5 1.5 0 015 12.5V5z" />
        <path d="M15 11a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
);

const EditIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
      <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
      <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
    </svg>
);


export const PromptForm: React.FC<PromptFormProps> = ({ initialValue, onSubmit, placeholder, buttonText, isLoading }) => {
  const [value, setValue] = useState(initialValue);
  const isEdit = buttonText.toLowerCase().includes('edit');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim() && !isLoading) {
      onSubmit(value);
    }
  };

  const buttonClasses = `
    flex items-center justify-center font-bold py-3 px-6 rounded-r-lg 
    transition-all duration-300 ease-in-out focus:outline-none focus:ring-4
    disabled:opacity-50 disabled:cursor-not-allowed
    ${isEdit 
      ? 'bg-purple-600 hover:bg-purple-700 focus:ring-purple-500/50 text-white' 
      : 'bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-500/50 text-white'
    }
  `;

  return (
    <form onSubmit={handleSubmit} className="flex w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        disabled={isLoading}
        className="w-full p-3 bg-gray-700 border-2 border-gray-600 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-colors duration-300 disabled:bg-gray-800"
      />
      <button
        type="submit"
        disabled={isLoading}
        className={buttonClasses}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          <>
            { isEdit ? <EditIcon/> : <GenerateIcon/> }
            {buttonText}
          </>
        )}
      </button>
    </form>
  );
};