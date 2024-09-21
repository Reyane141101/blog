import './App.css';
import MainPage from './pages/MainPage'
import SparkArticlePage from './pages/articles/SparkArticlePage';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/articles/SetupSpark" element={<SparkArticlePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
