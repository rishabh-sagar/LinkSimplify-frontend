// services/api.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://linksimplify-backend.azurewebsites.net', // Replace with your API server URL
  timeout: 0, // Adjust timeout as needed
});

// Interceptors for adding headers
const token = localStorage.getItem('token');
if (token) {
instance.interceptors.request.use((config) => {
  
    config.headers['Authorization'] = token;
  
  return config;
});
}

// Export the instance for use in components
export default instance;
