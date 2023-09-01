import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-4">The page you are looking for does not exist.</p>
        
      </div>
    </div>
  );
};

export default NotFound;
