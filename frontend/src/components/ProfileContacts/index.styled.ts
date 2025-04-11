import styled from 'styled-components';
import { IoMdExit } from 'react-icons/io';

export const ProfileContactsWrapper = styled.div`
  width: 25%;
  padding: 10px;
  background-color: #f0f0f0;
  position: relative;

  @media (max-width: 900px) {
    width: 350px;
    height: 100px;
    position: absolute;
    top: 1300px;
    margin-left: 10px;
  }
`;

export const StyledSignOutButton = styled(IoMdExit)`
  cursor: pointer;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 1%;
  bottom: 1%;
  color: red;
`;

export const StyledUpdateProfile = styled.button`
  cursor: pointer;
  height: 30px;
  width: 140px;
  border-radius: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d3d3d3;
  }
`;

export const StyledFeedbackButton = styled.button`
  cursor: pointer;
  height: 30px;
  width: 140px;
  margin-top: 10px;
  border-radius: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d3d3d3;
  }

  @media (max-width: 900px) {
    margin-left: 10px;
  }
`;

export const LanguageSelect = styled.select`
  margin-top: 10px;
  padding: 5px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  width: 140px;
`;
