import styled from 'styled-components';

export const StyledCuisine = styled.p`
  font-family: 'RobotoRegular';
  font-size: 15px;
  margin: 5px 0 0 0;
`;

export const StyledAbout = styled.p`
  font-family: 'InterMedium';
  font-size: 32px;
  margin: 65px 0 0 0;
`;

export const StyledDescription = styled.p`
  font-family: 'RobotoRegular';
  font-size: 18px;
  margin: 20px 0 0 0;
  width: 100%;
  height: 250px;
  text-align: start;
  padding-left: 10px;
  border-left: 1px solid purple;
  word-wrap: break-word;

  @media (max-width: 1100px) {
    height: 220px;
    overflow: hidden;
  }

  @media (max-width: 1000px) {
    overflow: hidden;
  }
`;
