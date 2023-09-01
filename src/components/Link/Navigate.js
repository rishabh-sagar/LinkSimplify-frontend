import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAuth();

  const handleLogout = () => {
    // Clear the user's token from localStorage and update the authentication state
    localStorage.removeItem('token');
    dispatch({ type: 'LOGOUT' });

    // Redirect the user to the login page
    navigate('/r/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">LinkSimplify</Link>
        
        {state.isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-white text-blue-500 px-4 py-2 rounded-full hover:bg-blue-100"
          >
            Logout
          </button>
        ) : (
          <Link to="/r/login" className="text-white hover:underline">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
