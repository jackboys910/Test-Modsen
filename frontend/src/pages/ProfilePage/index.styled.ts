import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BodyWrapper = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 1000px;
  margin: 0;
  align-items: center;
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
`;

export const StyledForm = styled.form`
  display: flex;
  height: 100%;
  gap: 20px;
`;
