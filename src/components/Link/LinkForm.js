import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const LinkForm = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customLink, setCustomLink] = useState('');
  const [customORrandom, setCustomORRandom] = useState('random');

  const handleCreateLink = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        '/links/links',
        {
          originalUrl,
          customLink,
          customORrandom,
        },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
      // Handle success, show a message or refresh the link list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row">
      <div className="bg-black w-1/3 flex items-center justify-center flex-col">
        <div className="text-center mb-6">
          <h1 className="text-6xl font-bold text-white">CloudVault</h1>
        </div>
        <div className="flex-none px-4 bg-black text-white text-center">
          <p className="text-lg">
            Capturing Moments, Preserving Memories: Elevate Your Storage Experience with up to 2GB Cloud Capacity
          </p>
        </div>
      </div>
      <div className="flex flex-col w-2/3 items-center justify-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">CloudVault</h1>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-center">Create a Link</h2>
          <form onSubmit={handleCreateLink}>
            <input
              className="border rounded-md p-2 w-full mb-3"
              type="text"
              placeholder="Original URL"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
            />
            <input
              className="border rounded-md p-2 w-full mb-3"
              type="text"
              placeholder="Custom Link (Optional)"
              value={customLink}
              onChange={(e) => setCustomLink(e.target.value)}
            />
            <label className="text-gray-700">
              Custom or Random Link:
              <select
                className="block w-full mt-1 border rounded-md p-2"
                value={customORrandom}
                onChange={(e) => setCustomORRandom(e.target.value)}
              >
                <option value="custom">Custom</option>
                <option value="random">Random</option>
              </select>
            </label>
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md py-2 w-full mt-4 hover:from-blue-400 hover:to-purple-400"
              type="submit"
            >
              Create Link
            </button>
          </form>
          <p className="mt-2 text-sm text-center text-gray-500">
            Go back to{' '}
            <Link to="/dashboard" className="text-blue-500">
              Dashboard
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LinkForm;
