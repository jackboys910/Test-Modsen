import React, { useState, useEffect } from 'react';
import { ReactComponent as MenuIcon } from '@assets/icons/menu.svg';
import { isAuthenticated } from '@utils/auth';
import { Menu, MenuItem, MenuWrapper } from './index.styled';

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MenuWrapper>
      <MenuIcon onClick={toggleMenu} />
      <Menu $isOpen={isOpen}>
        <MenuItem to='/'>Home</MenuItem>
        <MenuItem to={isAuthenticated() ? '/profile' : '/authorization'}>Profile</MenuItem>
        {isAuthenticated() && <MenuItem to={`/messanger/${loggedInUserNickname}`}>Messenger</MenuItem>}
      </Menu>
    </MenuWrapper>
  );
};

export default BurgerMenu;
