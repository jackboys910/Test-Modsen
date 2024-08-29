import styled from 'styled-components';
import { COLORS } from '../../constants/styles/mainColors';

export const ListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 37px;
  padding: 16px;
  justify-content: center;
  margin-top: 32px;
  margin-left: 205px;
  margin-right: 196px;
`;

export const LoadMoreButton = styled.button`
  font-family: 'RobotoRegular';
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: ${COLORS.COLOR_BUTTON_TEXT_WHITE};
  width: 250px;
  height: 50px;
  background: linear-gradient(180deg, ${COLORS.COLOR_BUTTON_BACKGROUND_BLUE} 100%, ${COLORS.COLOR_BUTTON_BACKGROUND_BLUE} 100%);
  box-shadow: 0 4px 20px 0 ${COLORS.COLOR_BUTTON_SHADOW_VIOLET};

  margin: 56px auto 108px;
  padding: 10px 20px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
`;

export const NoButtonWrapper = styled.div`
  margin-bottom: 125px;
`;
