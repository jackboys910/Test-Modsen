import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '@pages/HomePage';
import RecipeDetailsPage from '@pages/RecipeDetailsPage';
import NotFoundPage from '@pages/NotFoundPage';
import AuthorizationPage from '@pages/AuthorizationPage';
import ProfilePage from './ProfilePage';
import { GlobalStyles, AppWrapper } from '@components/App.styled';

const AppRouter: React.FC = () => {
  useEffect(() => {
    const updateLastOnline = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;
      try {
        await fetch('http://localhost:3001/updateLastOnline', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.log('Error updating last online:', error);
      }
    };

    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateLastOnline();
      }
    };

    const intervalId = setInterval(updateLastOnline, 60000);

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <Router basename={process.env.NODE_ENV === 'development' ? '/' : '/Test-Modsen/'}>
      <AppWrapper>
        <GlobalStyles />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/recipe/:recipeId' element={<RecipeDetailsPage />} />
          <Route path='/authorization' element={<AuthorizationPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </AppWrapper>
    </Router>
  );
};

export default AppRouter;
