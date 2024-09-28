import styled from 'styled-components';
import { FaQuestionCircle } from 'react-icons/fa';

export const ProfileDescriptionWrapper = styled.div`
  width: 50%;
  padding: 25px 10px 25px 10px;
`;

export const StyledNickname = styled.h2`
  font-family: 'RobotoRegular';
  color: green;
  font-size: 30px;
  width: 30%;
  height: 50px;
  display: block;
  margin: 0;
`;

export const InfoWrapper = styled.div`
  position: relative;
  margin-top: 10px;
  display: flex;
  gap: 5px;
`;

export const StyledCuisine = styled.p`
  font-family: 'InterRegular';
  font-size: 15px;
  margin: 5px 0 0 0;
`;

export const StyledInfo = styled.input`
  font-family: 'RobotoRegular';
  margin-bottom: 10px;
  border-radius: 5px;
  border: 2px solid grey;
  height: 30px;
  width: 200px;
`;

export const QuestionIcon = styled(FaQuestionCircle)`
  cursor: pointer;
  position: absolute;
  right: 19%;
  top: 5px;

  &:hover {
    color: #4f4f4f;
  }
`;

export const Tooltip = styled.div`
  font-family: 'InterRegular';
  position: absolute;
  top: 81%;
  left: 67.8%;
  width: 120px;
  height: 60px;
  background-color: white;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: black;
  font-size: 12px;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

export const StyledAbout = styled.p`
  font-family: 'InterMedium';
  font-size: 32px;
  margin: 45px 0 0 0;
`;

export const StyledDescription = styled.textarea`
  font-family: 'RobotoRegular';
  font-size: 18px;
  margin-top: 10px;
  width: 100%;
  height: 250px;
  resize: none;
  text-align: start;
`;

export const CharCount = styled.div`
  font-family: 'InterRegular';
  font-size: 12px;
  color: grey;
  text-align: right;
  margin-top: 5px;
`;
