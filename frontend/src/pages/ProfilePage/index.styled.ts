import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BodyWrapper = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 1000px;
  margin: 0;
  align-items: center;

  @media (max-width: 900px) {
    height: 1400px;
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

export const ProfileWrapper = styled.div`
  width: 1080px;
  height: 510px;
  margin-top: 100px;
  border: 1px solid black;

  @media (max-width: 1200px) {
    width: 1000px;
  }

  @media (max-width: 1100px) {
    width: 900px;
  }

  @media (max-width: 1000px) {
    width: 800px;
  }

  @media (max-width: 900px) {
    border: none;
    display: flex;
    justify-content: center;
    height: 1000px;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  height: 100%;
  gap: 20px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 5px;
  }
`;
