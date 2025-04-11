import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as MenuIcon } from '@assets/icons/menu.svg';
import { isAuthenticated } from '@utils/auth';
import { Menu, MenuItem, MenuWrapper } from './index.styled';

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggedInUserNickname, setLoggedInUserNickname] = useState<string | null>(localStorage.getItem('nickname'));
  const { t } = useTranslation();

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
        <MenuItem to='/'>{t('home')}</MenuItem>
        <MenuItem to={isAuthenticated() ? '/profile' : '/authorization'}>{t('profile')}</MenuItem>
        {isAuthenticated() && <MenuItem to={`/messanger/${loggedInUserNickname}`}>{t('messenger')}</MenuItem>}
      </Menu>
    </MenuWrapper>
  );
};

export default BurgerMenu;
