import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import Navbar from './Navigate';

const Dashboard = () => {
  const [links, setLinks] = useState([]);
  const [counter, setcounter] = useState(0);
  const [originalUrl, setOriginalUrl] = useState('');
  const [customLink, setCustomLink] = useState('');
  const [customORrandom, setCustomORRandom] = useState('random');
  const [updatingLink, setUpdatingLink] = useState(null);
  const [updatedOriginalUrl, setUpdatedOriginalUrl] = useState('');

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
  }, [counter]);
 
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
      setTimeout(()=>{
        setcounter(counter+1)
      },2000)
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateLink = async (shortUrl, updatedOriginalUrl) => {
    // Update the temporary state when you click the "Update" button
    setUpdatedOriginalUrl(updatedOriginalUrl);

    // Set the updatingLink state to the current shortUrl
    setUpdatingLink(shortUrl);
  };

  const handleSaveLink = async (shortUrl) => {
    try {
      // Send a PUT request to update the link with the temporary state value
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

      // Reset the updatingLink state and the temporary state
      setUpdatingLink(null);
      setUpdatedOriginalUrl('');
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
  const copyToClipboard = async (shortUrl) => {
    try {
      // Copy the short link to the clipboard
      await navigator.clipboard.writeText(`https://linksimplify.netlify.app/${shortUrl}`);
      alert('Short link copied to clipboard');
    } catch (error) {
      console.error('Copy to clipboard failed: ', error);
    }
  };
  return (
    <div>
      <Navbar/>
      <div className="flex flex-row items-center justify-around min-h-screen bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="w-full max-w-md p-6 bg-white  rounded-lg shadow-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">LinkSimplify</h1>
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-center">Your Links</h2>
        <div className='overflow-y-scroll h-[70vh]'>
          {links.map((link) => (
            <div key={link._id} className="mb-4 border rounded-md p-4 space-y-2">
              <p className="text-lg bg-red-200  rounded-lg p-2">Original URL: <a href={link.originalUrl}>{link.originalUrl}</a></p>
              <p className="text-lg bg-orange-200  rounded-lg p-2">Short URL:<a href={"https://linksimplify.netlify.app/"+link.shortUrl}> {"https://linksimplify.netlify.app/"+link.shortUrl}</a></p>
              <p className="text-lg bg-lime-300  rounded-lg p-2">Total Hits: {link.hits/2}</p>
              {updatingLink === link.shortUrl ? (
                <div>
                 <input
              className="border rounded-md p-2 w-full mb-3"
              type="text"
              placeholder="New Original URL"
              value={updatedOriginalUrl}
              onChange={(e) => setUpdatedOriginalUrl(e.target.value)}
            />
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md py-2 w-full hover:from-blue-400 hover:to-purple-400"
              onClick={() => handleSaveLink(link.shortUrl)} // Call handleSaveLink on "Save" button click
            >
              Save
            </button>
                </div>
              ) : (
                <div className="flex">
                  <button
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md py-2 w-1/3 mr-2 hover:from-blue-400 hover:to-purple-400"
                    onClick={() => setUpdatingLink(link.shortUrl)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-md py-2 w-1/3 mr-2 hover:from-red-400 hover:to-red-500"
                    onClick={() => handleDeleteLink(link.shortUrl)}
                  >
                    Delete
                  </button>
                  <button
                  className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-md py-2 w-1/3 hover:from-green-400 hover:to-green-500"
                  onClick={() => copyToClipboard(link.shortUrl)} // Call copyToClipboard on "Copy" button click
                >
                  Copy
                </button>
                </div>
              )}
            </div>
          ))}

        </div>
        <p className="mt-2 text-sm text-center text-gray-500">
          Go back to{' '}
          <Link to="/login" className="text-blue-500">
            Login Page
          </Link>
        </p>
      </div>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-md'>

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
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-md py-2 w-full hover:from-blue-400 hover:to-purple-400"
            type="submit"
          >
            Create Link
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;
