import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import BurgerMenu from '@components/BurgerMenu';
import { BodyWrapper, NotFoundContainer, ErrorMessage, BackButton, StyledLink, ErrorCode, ErrorParagraph } from './index.styled';

const NotFoundPage: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth >= 390 && windowWidth <= 768;

  return (
    <div>
      <Header>{isMobile ? <BurgerMenu /> : <StyledLink to='/'>Home</StyledLink>}</Header>
      <BodyWrapper>
        <NotFoundContainer>
          <ErrorCode>404</ErrorCode>
          <ErrorMessage>OOOps! Page Not Found</ErrorMessage>
          <ErrorParagraph>This page doesn't exist or was removed! We suggest you back to home</ErrorParagraph>
          <BackButton as={Link} to='/'>
            Back to homepage
          </BackButton>
        </NotFoundContainer>
      </BodyWrapper>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
