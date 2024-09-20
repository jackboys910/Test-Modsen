import styled from 'styled-components';
import { COLORS } from '@constants/styles/mainColors';
import { Link } from 'react-router-dom';

export const Menu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 120px;
  left: 5px;
  background-color: ${COLORS.COLOR_MAIN_BLUE};
  width: 150px;
  height: 100px;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition:
    transform 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
  transform: ${({ $isOpen }) => ($isOpen ? 'scaleY(1)' : 'scaleY(0)')};
  transform-origin: top;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  overflow: hidden;

  @media (max-width: 630px) {
    width: 100px;
  }
`;

export const MenuItem = styled(Link)`
  display: block;
  padding: 10px 20px;
  width: 50px;
  height: 50px;
  color: white;
  text-decoration: none;

  padding: 20px;
  padding-left: 50px;
  font-size: 18px;

  @media (max-width: 630px) {
    padding-left: 25px;
  }
`;

export const MenuWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  top: 0;
  right: 0;
  height: 100%;

  svg {
    margin-left: 20px;
    cursor: pointer;
  }
`;
