import React from 'react';
import { StyledHeader, HeaderContent, ModsenWrapper, ModsenTitle } from './index.styled';
import { ReactComponent as ModsenIcon } from '../../assets/icons/modsen.svg';

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
