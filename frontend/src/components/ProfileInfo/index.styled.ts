import styled from 'styled-components';
import { FaQuestionCircle } from 'react-icons/fa';
import { COLORS } from '@constants/styles/mainColors';

export const ProfileInfoWrapper = styled.div`
  width: 25%;
  padding: 10px;
  position: relative;

  @media (max-width: 900px) {
    width: 378px;
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  border: 1px solid grey;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding: 8px;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const CameraIcon = styled.div`
    position: absolute;
    bottom: 8px;
    right: 8px;
    background-color: rgba(0, 0, 0, 0.6)
    color: white;
    border-radius: 50%;
    padding: 5px;
    display: none;
    cursor: pointer;

    ${ImageWrapper}:hover & {
        display: block;
    }
`;

export const AboutWrapper = styled.div`
  position: absolute;
  top: 320px;
  left: 15px;

  @media (max-width: 900px) {
    top: 450px;
    left: 10px;
  }
`;

export const DataWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

export const StyledInfoInput = styled.input`
  font-family: 'RobotoRegular';
  width: 200px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 2px solid grey;
  height: 30px;
  margin-left: 20px;

  // &:focus {
  //   outline-style: solid;
  //   outline-width: 4px;
  //   outline-color: ${COLORS.COLOR_MAIN_BLUE};
  // }

  @media (max-width: 1100px) {
    width: 170px;
  }

  @media (max-width: 1000px) {
    width: 145px;
  }

  @media (max-width: 900px) {
    width: 310px;
  }
`;

export const QuestionIcon = styled(FaQuestionCircle)`
  cursor: pointer;
  position: absolute;
  right: -17px;
  top: 5px;

  &:hover {
    color: #4f4f4f;
  }

  @media (max-width: 1100px) {
    right: -9px;
  }

  @media (max-width: 900px) {
    right: -18px;
  }
`;

export const Tooltip = styled.div`
  font-family: 'InterRegular';
  position: absolute;
  top: 80%;
  left: 77%;
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

export const StyledTime = styled.p`
  font-family: 'InterRegular';
  font-size: 15px;
  margin: 0 0 8px 0;
`;
