import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { COLORS } from '@constants/styles/mainColors';
import { resolution } from '@constants/resolutions';

export const BodyWrapper = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 2091px;
  margin: 0;
`;

export const NotFoundContainer = styled.div`
  margin-top: 12.8vw;
  margin-left: 30.3vw;
  width: 45vw;
  height: 391px;
  text-align: center;

  @media (max-width: 530px) {
    margin-left: 22px;
  }
`;

export const ErrorMessage = styled.h2`
  font-family: 'InterLight';
  font-weight: 300;
  font-size: 46px;
  line-height: 55.67px;
  margin: 20px 0;
  text-align: left;
  margin-left: 11%;

  @media (${resolution.laptop}) {
    font-size: 38px;
    margin: 15px;
  }

  @media (${resolution.mobile}) {
    font-size: 32px;
    margin: 10px;
  }

  @media (max-width: 530px) {
    font-size: 24px;
    line-height: 29.05px;
    margin-left: 20px;
    width: 70vw;
  }
`;

export const ErrorParagraph = styled.p`
  margin: 45px 0;
  font-family: 'InterMedium';
  font-weight: 500;
  font-size: 21px;
  line-height: 25.41px;
  color: ${COLORS.COLOR_ERROR_PARAGRAPH_GREY};
  text-align: left;

  @media (max-width: 530px) {
    width: 350px;
  }
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
  box-shadow: 0 8px 16px 0 ${COLORS.COLOR_BACKBUTTON_SHADOW_GREEN};
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  width: 238.4px;
  height: 48px;
  text-align: center;
  margin-right: 13%;

  &:hover {
    background-color: #00a86b; /* Изменение цвета при наведении */
  }

  @media (${resolution.laptop}) {
    width: 200px;
  }

  @media (${resolution.mobile}) {
    width: 180px;
  }

  @media (max-width: 530px) {
    width: 165.87px;
    margin-right: 0;
    margin-left: 20vw;
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
  text-decoration: none;
`;

export const ErrorCode = styled.h1`
  width: 280px;
  height: 148px;
  text-align: left;
  margin: 0 auto;
  margin-left: 12vw;
  font-family: 'InterBold';
  font-weight: 700;
  font-size: 122px;
  line-height: 147.65px;
  color: ${COLORS.COLOR_ERROR_ORANGE};

  @media (${resolution.laptop}) {
    font-size: 80px;
    height: 100px;
  }

  @media (${resolution.mobile}) {
    font-size: 60px;
  }

  @media (max-width: 530px) {
    font-size: 40px;
    margin-left: 95px;
    width: 200px;
  }
`;
