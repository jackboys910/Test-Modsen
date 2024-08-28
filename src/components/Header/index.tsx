import React from 'react';
import { ReactComponent as ModsenIcon } from '@assets/icons/modsen.svg';
import { StyledHeader, HeaderContent, ModsenWrapper, ModsenTitle } from './index.styled';

interface IHeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<IHeaderProps> = ({ children }) => {
  return (
    <StyledHeader>
      <HeaderContent>
        <ModsenWrapper>
          <ModsenIcon />
          <ModsenTitle>Modsen recipe</ModsenTitle>
        </ModsenWrapper>
        {children}
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;
