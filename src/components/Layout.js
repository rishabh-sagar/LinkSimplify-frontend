// Layout.js
import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto p-4">{children}</div>
    </div>
  );
};

export default Layout;
