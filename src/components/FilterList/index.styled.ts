import styled from 'styled-components';
import arrowIcon from '../../assets/icons/arrow.svg';
import { COLORS } from '../../constants/styles/mainColors';

export const Section = styled.section`
  width: 322px;
  font-family: 'RobotoRegular';
  line-height: 20px;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0.01em;
`;

export const Header = styled.div`
  padding: 0 16px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 28px;
  position: relative;
  margin-bottom: 27px;
  border-bottom: 1px solid ${COLORS.COLOR_STROKE_ORANGE};
  color: ${COLORS.COLOR_SECTION_GREY};

  &:after {
    content: url(${arrowIcon});
    position: absolute;
    right: 16px;
    transition: transform 0.3s ease;
  }
`;

export const Content = styled.div<{ $isOpen: boolean }>`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  border-radius: 0 0 20px 20px;
  border: 1px solid ${COLORS.COLOR_STROKE_ORANGE};
  border-top: none;
  border-top: 1px solid ${COLORS.COLOR_STROKE_ORANGE};
  border-radius: 28px;
  padding: 8px 0;
  width: 331px;
  margin-top: -1px;
  color: ${COLORS.COLOR_OPTION_DARKGREY};
`;

export const Item = styled.div`
  padding: 10px 16px 10px 16px;
  text-align: left;
  cursor: pointer;
  background-color: white;
  border-radius: 20px;

  &:hover {
    background-color: ${COLORS.COLOR_INPUT_GREY};
  }

  &.selected {
    background-color: ${COLORS.COLOR_MAIN_BLUE};
    color: white;
  }
`;
