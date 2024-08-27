import styled from 'styled-components';
import { COLORS } from '../../constants/styles/mainColors';

const BodyWrapper = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin: 0;
`;

const MainTitle = styled.h1`
  font-family: 'InterRegular';
  font-weight: 400;
  color: ${COLORS.COLOR_TITLE_VIOLET};
  width: 1238px;
  line-height: 98px;
  font-size: 76px;
  margin-left: 403px;
  margin-top: 149px;
`;

export const FiltersWrapper = styled.div`
  height: 236px;
  display: flex;
  justify-content: center;
  gap: 86px;
  margin-top: 38px;
  margin-bottom: 200px;
  margin-left: -100px;
`;

export const SectionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 285px;
`;

export const BorderLine = styled.div`
  width: 44px;
  height: 3px;
  background-color: #efc81a;
  transform: rotate(-90deg);
  margin-right: -5px;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-family: 'InterRegular';
  font-weight: 400;
  font-size: 40px;
  line-height: 48.41px;
`;

export { BodyWrapper, MainTitle };
