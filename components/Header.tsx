import React from 'react';

const PlaneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.34 4.66 12 13.01 3.66 4.66a2 2 0 0 1 2.83 0l5.51 5.51 5.51-5.51a2 2 0 0 1 2.83 0Z"/>
        <path d="m3.66 19.34 8.34-8.35"/>
        <path d="m12 13.01 8.34 8.35"/>
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="w-full max-w-7xl mx-auto text-center mb-8 sm:mb-12">
      <div className="flex justify-center items-center gap-4">
        <PlaneIcon />
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Aviation Wallpapers
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-400">
        Create stunning aviation-themed wallpapers for your desktop and phone with the power of AI.
      </p>
    </header>
  );
};