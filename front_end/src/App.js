import './App.css';
import React from 'react';
import NotFoundPage from './pages/NotFoundPage';
import MainPage from './pages/MainPage'
import GetArticle from './components/articles/GetArticle';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';


function Article() 
{
  let articleId = useParams();
  let ArticleName = articleId['*'] + '.mdx'
  return (
    <GetArticle articleName={ArticleName}/>
    );
}

function App() 
{
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/articles/*" element={<Article />} />
        <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
