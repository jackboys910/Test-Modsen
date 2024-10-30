import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import { TbMessageFilled } from 'react-icons/tb';
import { ReactComponent as ModsenIcon } from '@assets/icons/modsen.svg';
import { isAuthenticated } from '@utils/auth';
import { StyledHeader, HeaderContent, ModsenWrapper, ModsenTitle, MessangerWrapper, UserWrapper } from './index.styled';

interface IHeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<IHeaderProps> = ({ children }) => {
  const [loggedInUserNickname, setLoggedInUserNickname] = useState<string | null>(localStorage.getItem('nickname'));

  useEffect(() => {
    const handleStorageChange = () => {
      setLoggedInUserNickname(localStorage.getItem('nickname'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <StyledHeader>
      <HeaderContent>
        <ModsenWrapper>
          <ModsenIcon />
          <ModsenTitle>Recipe search</ModsenTitle>
        </ModsenWrapper>
        {children}
      </HeaderContent>
      <MessangerWrapper>
        {isAuthenticated() && (
          <Link to={`/messanger/${loggedInUserNickname}`}>
            <TbMessageFilled size={45} color='white' />
          </Link>
        )}
      </MessangerWrapper>
      <UserWrapper>
        <Link to={isAuthenticated() ? '/profile' : '/authorization'}>
          <RiAccountPinCircleLine size={45} color='white' />
        </Link>
      </UserWrapper>
    </StyledHeader>
  );
};

export default Header;
