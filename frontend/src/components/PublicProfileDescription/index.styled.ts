import styled from 'styled-components';

export const ProfileDescriptionWrapper = styled.div`
  width: 50%;
  padding: 25px 10px 25px 10px;

  @media (max-width: 900px) {
    padding: 0 10px 0 10px;
  }
`;

export const StyledNickname = styled.h2`
  font-family: 'RobotoRegular';
  color: green;
  font-size: 30px;
  height: 50px;
  display: block;
  margin: 0;
  width: 100%;

  @media (max-width: 900px) {
    position: absolute;
    padding-left: 10px;
    border-left: 2px solid red;
    width: 350px;
    left: calc(0.499 * (100vw - 390px) + 7.5px);
  }
`;

export const InfoWrapper = styled.div`
  position: relative;
  margin-top: 10px;
  display: flex;
  gap: 5px;

  @media (max-width: 900px) {
    top: 200px;
    width: 350px;
    left: -94px;
  }
`;

export const StyledCuisine = styled.p`
  font-family: 'RobotoRegular';
  font-size: 15px;
  margin: 5px 0 0 0;
`;

export const StyledAbout = styled.p`
  font-family: 'InterMedium';
  font-size: 32px;
  margin: 65px 0 0 0;

  @media (max-width: 900px) {
    margin: 45px 0 0 0;
    position: absolute;
    top: 870px;
    left: calc(0.5 * (100vw - 390px) + 7px);
  }
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

  @media (max-width: 900px) {
    margin: 20px 0 0 0;
    position: absolute;
    top: 960px;
    width: 350px;
    left: calc(0.5 * (100vw - 390px) + 7px);
  }
`;
