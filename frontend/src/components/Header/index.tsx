import React from 'react';
import { Link } from 'react-router-dom';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import { ReactComponent as ModsenIcon } from '@assets/icons/modsen.svg';
import { isAuthenticated } from '@utils/auth';
import { StyledHeader, HeaderContent, ModsenWrapper, ModsenTitle, UserWrapper } from './index.styled';

interface IHeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<IHeaderProps> = ({ children }) => {
  return (
    <StyledHeader>
      <HeaderContent>
        <ModsenWrapper>
          <ModsenIcon />
          <ModsenTitle>Recipe search</ModsenTitle>
        </ModsenWrapper>
        {children}
      </HeaderContent>
      <UserWrapper>
        <Link to={isAuthenticated() ? '/profile' : '/authorization'}>
          <RiAccountPinCircleLine size={45} color='white' />
        </Link>
      </UserWrapper>
    </StyledHeader>
  );
};

export default Header;
