import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

const RedirectPage = () => {
  const { shortUrl } = useParams();
  const history = useNavigate();
  const [originalUrl, setOriginalUrl] = useState('');

  useEffect(() => {
    const fetchOriginalUrl = async () => {
      try {
        const response = await api.get(`/links/${shortUrl}`);
        const { originalUrl } = response.data;
        if (originalUrl) {
          // Redirect to the actual URL
          window.location.href = originalUrl;
        } else {
          // If the original URL is not available, you can redirect to a default page
          history('/r/404');
        }
      } catch (error) {
        // Handle API fetch error
        console.error(error);
        history('/r/404'); // Redirect to an error page in case of API error
      }
    };

    if (shortUrl) {
      // Check if shortUrl is not empty before making the API call
      fetchOriginalUrl();
    }
  }, [shortUrl, history]);

  return (
    <div className="flex justify-center items-center h-screen">
      <p className="text-xl">Please wait, you'll be redirected shortly...</p>
    </div>
  );
};

export default RedirectPage;
