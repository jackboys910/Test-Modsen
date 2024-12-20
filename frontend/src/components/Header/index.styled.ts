import styled from 'styled-components';
import { Link } from 'react-router-dom';
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
  width: 100%;
  max-width: 1440px;
  height: 95px;
  margin-left: 11.5vw;
  margin-top: 28px;
  position: relative;
  margin-right: 100px;

  @media (max-width: 630px) {
    margin-left: 0;
    margin-right: 30px;
  }
`;

export const ClickableLogo = styled(Link)`
  text-decoration: none;
`;

export const ModsenWrapper = styled.div`
  width: 232px;
  height: 48px;
  margin-left: 1.7vw;
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

export const MessangerWrapper = styled.div`
  width: 80px;
`;

export const UserWrapper = styled.div`
  width: 100px;
`;
