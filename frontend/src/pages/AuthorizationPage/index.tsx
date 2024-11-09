import React, { useState, useEffect } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import BurgerMenu from '@components/BurgerMenu';
import { BodyWrapper, StyledLink } from './index.styled';
import SignUp from '@components/Authorization/SignUp';
import SignIn from '@components/Authorization/SignIn';

const AuthorizationPage: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showSignIn, setShowSignIn] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const isMobile = windowWidth >= 390 && windowWidth <= 768;

  const toggleAuthType = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <>
      <Header>{isMobile ? <BurgerMenu /> : <StyledLink to='/'>Home</StyledLink>}</Header>
      <BodyWrapper>{showSignIn ? <SignIn toggleAuthType={toggleAuthType} /> : <SignUp toggleAuthType={toggleAuthType} />}</BodyWrapper>
      <Footer />
    </>
  );
};

export default AuthorizationPage;
