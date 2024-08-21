import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import SearchRecipePage from './SearchRecipePage';
import NotFoundPage from './NotFoundPage';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/search' element={<SearchRecipePage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
