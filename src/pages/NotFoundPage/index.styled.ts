import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS } from '@constants/styles/mainColors';

export const BodyWrapper = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 2091px;
  margin: 0;
`;

export const NotFoundContainer = styled.div`
  margin-top: 245px;
  margin-left: 583px;
  width: 865px;
  height: 391px;
  text-align: center;
`;

export const ErrorMessage = styled.h2`
  font-family: 'InterLight';
  font-weight: 300;
  font-size: 46px;
  line-height: 55.67px;
  margin: 20px 0;
  text-align: left;
  margin-left: 11%;
`;

export const ErrorParagraph = styled.p`
  margin: 45px 0;
  font-family: 'InterMedium';
  font-weight: 500;
  font-size: 21px;
  line-height: 25.41px;
  color: ${COLORS.COLOR_ERROR_PARAGRAPH_GREY};
  text-align: left;
`;

export const BackButton = styled.button`
  padding: 15px 20px;
  font-family: 'InterMedium';
  font-weight: 500;
  font-size: 14px;
  line-height: 16.94px;
  color: white;
  border: none;
  border-radius: 24px;
  background-color: ${COLORS.COLOR_BACKBUTTON_BACKGROUND_GREEN};
  box-shadow: 0 8px 16px 0 ${COLORS.COLOR_BUTTON_SHADOW_VIOLET};
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  width: 238.4px;
  height: 48px;
  text-align: center;
  margin-right: 13%;

  &:hover {
    background-color: #0056b3;
  }
`;

export const StyledLink = styled(Link)`
  font-family: 'SpaceGroteskMedium';
  font-weight: 500;
  font-size: 24px;
  line-height: 30.62px;
  color: white;
  position: absolute;
  right: 0;
  top: 23%;
`;

export const ErrorCode = styled.h1`
  width: 421.96px;
  height: 148px;
  text-align: left;
  margin: 0 auto;
  font-family: 'InterBold';
  font-weight: 700;
  font-size: 122px;
  line-height: 147.65px;
  color: ${COLORS.COLOR_ERROR_ORANGE};
  padding-left: 20px;
`;
