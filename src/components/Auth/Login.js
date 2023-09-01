import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const Login = () => {
  const { dispatch } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate=useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        console.log(response.data);
        dispatch({ type: 'LOGIN' });
        navigate("/r/dashboard")
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Wrong Username/Password');
    }
  };

  return (
    <div className="flex flex-row">
      <div className="bg-black w-1/3 flex items-center justify-center flex-col">
        <div className="text-center mb-6">
          <h1 className="text-6xl font-bold text-white">LinkSimplify</h1>
        </div>
        <div className="flex-none px-4 bg-black text-white text-center">
          <p className="text-xl">
          Your Ultimate URL Shortening Solution
          </p>
          <p className="text-lg">
          Shorten, Manage, and Share Your Links with Ease
          </p>
        </div>
      </div>
      <div className="flex flex-col w-2/3 items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">LinkSimplify</h1>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <input
              className="border rounded-md p-2 w-full mb-3"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="border rounded-md p-2 w-full mb-4"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && (
              <p className="text-red-500 text-center mb-2">{errorMessage}</p>
            )}
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md py-2 w-full hover:from-blue-400 hover:to-purple-400"
              type="submit"
            >
              Login
            </button>
          </form>
          <p className="mt-2 text-sm text-center text-gray-500">
            Don't have an account?{' '}
            <Link to="/r/register" className="text-blue-500">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
