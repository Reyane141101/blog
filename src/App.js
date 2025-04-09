import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';
import MainPage from './pages/MainPage'
import SearchPage from './pages/SearchPage';

function App() 
{
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/articles/*" element={<ArticlePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
