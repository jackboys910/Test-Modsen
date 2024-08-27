import React from 'react';
import { ReactComponent as ModsenIcon } from '@assets/icons/modsen.svg';
import { StyledHeader, HeaderContent, ModsenWrapper, ModsenTitle } from './index.styled';

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <HeaderContent>
        <ModsenWrapper>
          <ModsenIcon />
          <ModsenTitle>Modsen recipe</ModsenTitle>
        </ModsenWrapper>
      </HeaderContent>
    </StyledHeader>
  );
};

export default Header;
