import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import { TbMessageFilled } from 'react-icons/tb';
import { ReactComponent as ModsenIcon } from '@assets/icons/modsen.svg';
import { isAuthenticated } from '@utils/auth';
import { StyledHeader, HeaderContent, ClickableLogo, ModsenWrapper, ModsenTitle, MessangerWrapper, UserWrapper } from './index.styled';

interface IHeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<IHeaderProps> = ({ children }) => {
  const [loggedInUserNickname, setLoggedInUserNickname] = useState<string | null>(localStorage.getItem('nickname'));
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
        <ClickableLogo to='/'>
          <ModsenWrapper>
            <ModsenIcon />
            <ModsenTitle>Recipe search</ModsenTitle>
          </ModsenWrapper>
        </ClickableLogo>
        {children}
      </HeaderContent>
      {!isMobile && (
        <>
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
        </>
      )}
    </StyledHeader>
  );
};

export default Header;
