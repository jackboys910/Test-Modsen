import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '@pages/HomePage';
import RecipeDetailsPage from '@pages/RecipeDetailsPage';
import NotFoundPage from '@pages/NotFoundPage';
import { GlobalStyles, AppWrapper } from '@components/App.styled';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <AppWrapper>
        <GlobalStyles />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/:recipeId' element={<RecipeDetailsPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </AppWrapper>
    </Router>
  );
};

export default AppRouter;
