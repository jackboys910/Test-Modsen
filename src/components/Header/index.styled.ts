import styled from 'styled-components';
import { COLORS } from '../../constants/styles/mainColors';

export const StyledHeader = styled.header`
  background-color: ${COLORS.COLOR_MAIN_BLUE};
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  padding-left: 20px;
`;

export const HeaderContent = styled.div`
  width: 1440px;
  height: 95px;
  margin-left: 220px;
  margin-top: 28px;
`;

export const ModsenWrapper = styled.div`
  width: 232px;
  height: 48px;
  margin-left: 33px;
  padding-top: 23px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ModsenTitle = styled.span`
  font-family: 'SpaceGroteskMedium';
  font-weight: 500;
  font-size: 24px;
  line-height: 30.62px;
  color: ${COLORS.COLOR_MODSEN_WHITE};
`;
