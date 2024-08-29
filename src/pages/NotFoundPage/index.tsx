import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';
import { BodyWrapper, NotFoundContainer, ErrorMessage, BackButton, StyledLink, ErrorCode, ErrorParagraph } from './index.styled';

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <Header>
        <StyledLink to='/'>Home</StyledLink>
      </Header>
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
