import styled from 'styled-components';
import { COLORS } from '../../constants/styles/mainColors';
import { resolution } from '@constants/resolutions';

export const BodyWrapper = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
`;

export const MainTitle = styled.h1`
  font-family: 'InterRegular';
  font-weight: 400;
  color: ${COLORS.COLOR_TITLE_VIOLET};
  width: 64.5vw;
  line-height: 98px;
  font-size: 3.95vw;
  margin-left: 21vw;
  margin-top: 149px;

  @media (${resolution.laptop}) {
    width: 73vw;
    font-size: 4.7vw;
    margin-left: 16vw;
  }

  @media (${resolution.mobile}) {
    display: none;
  }
`;

export const FiltersWrapper = styled.div`
  height: 236px;
  display: flex;
  justify-content: center;
  gap: 186px;
  margin-top: 38px;
  margin-bottom: 200px;
  margin-left: 2vw;

  @media (${resolution.laptop}) {
    gap: 70px;
  }

  @media (${resolution.mobile}) {
    flex-direction: column;
    gap: 30px;
    align-items: center;
    height: 500px;
    margin-bottom: 60px;
  }

  @media (max-width: 500px) {
    gap: 30px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;

export const SectionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15vw;

  @media (${resolution.mobile}) {
    margin-left: 7vw;
  }
`;

export const BorderLine = styled.div`
  width: 44px;
  height: 3px;
  background-color: #efc81a;
  transform: rotate(-90deg);
  margin-right: -5px;

  @media (max-width: 630px) {
    width: 22px;
  }
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-family: 'InterRegular';
  font-weight: 400;
  font-size: 40px;
  line-height: 48.41px;

  @media (max-width: 630px) {
    font-size: 18px;
    line-height: 21.78px;
  }
`;
