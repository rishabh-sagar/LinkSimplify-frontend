import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const LinkList = () => {
  const [links, setLinks] = useState([]);
  const [updatingLink, setUpdatingLink] = useState(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await api.get('/links/user/links', {
          headers: { Authorization: localStorage.getItem('token') },
        });
        setLinks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchLinks();
  }, []);

  const handleUpdateLink = async (shortUrl, updatedOriginalUrl) => {
    try {
      // Send a PUT request to update the link
      await api.put(
        `/links/${shortUrl}`,
        { originalUrl: updatedOriginalUrl },
        {
          headers: { Authorization: localStorage.getItem('token') },
        }
      );

      // Update the links state with the updated data
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link.shortUrl === shortUrl ? { ...link, originalUrl: updatedOriginalUrl } : link
        )
      );

      // Reset the updatingLink state
      setUpdatingLink(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteLink = async (shortUrl) => {
    try {
      // Send a DELETE request to delete the link
      await api.delete(`/links/${shortUrl}`, {
        headers: { Authorization: localStorage.getItem('token') },
      });

      // Remove the deleted link from the links state
      setLinks((prevLinks) => prevLinks.filter((link) => link.shortUrl !== shortUrl));
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
          <h2 className="text-2xl font-semibold mb-4 text-center">Your Links</h2>
          {links.map((link) => (
            <div key={link._id} className="mb-4 border rounded-md p-4">
              <p className="text-lg">Original URL: {link.originalUrl}</p>
              <p className="text-lg">Short URL: {link.shortUrl}</p>
              {updatingLink === link.shortUrl ? (
                <div>
                  <input
                    className="border rounded-md p-2 w-full mb-3"
                    type="text"
                    placeholder="New Original URL"
                    value={link.originalUrl}
                    onChange={(e) => handleUpdateLink(link.shortUrl, e.target.value)}
                  />
                  <button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md py-2 w-full hover:from-blue-400 hover:to-purple-400"
                    onClick={() => handleUpdateLink(link.shortUrl, link.originalUrl)}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <div className="flex">
                  <button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md py-2 w-1/2 mr-2 hover:from-blue-400 hover:to-purple-400"
                    onClick={() => setUpdatingLink(link.shortUrl)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md py-2 w-1/2 hover:from-red-400 hover:to-red-500"
                    onClick={() => handleDeleteLink(link.shortUrl)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
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

export default LinkList;
