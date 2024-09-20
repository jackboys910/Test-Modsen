import React, { useState } from 'react';
import { ReactComponent as MenuIcon } from '@assets/icons/menu.svg';
import { Menu, MenuItem, MenuWrapper } from './index.styled';

const BurgerMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MenuWrapper>
      <MenuIcon onClick={toggleMenu} />
      <Menu $isOpen={isOpen}>
        <MenuItem to='/'>Home</MenuItem>
      </Menu>
    </MenuWrapper>
  );
};

export default BurgerMenu;
