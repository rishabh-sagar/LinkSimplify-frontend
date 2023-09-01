// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import LinkList from './components/Link/LinkList';
import LinkForm from './components/Link/LinkForm';
import RedirectPage from './components/RedirectPage'; // Add this import
import Dashboard from './components/Link/combined';
import NotFound from './components/Link/pagenotfound';

function App() {
  return (
    
      <Router>
    
          <Routes>
          <Route path="/" element={<Login/>} />
            <Route path="/:shortUrl" element={<RedirectPage/>} />
            <Route path="/r/login" element={<Login/>} />
            <Route path="/r/register" element={<Register/>} />
            <Route path="/r/links" element={<LinkList/>} />
            <Route path="/r/create-link" element={<LinkForm/>} />
            <Route path="/r/dashboard" element={<Dashboard/>} />
            <Route path="/r/404" element={<NotFound/>} />
          </Routes>
    
      </Router>
  
  );
}

export default App;
