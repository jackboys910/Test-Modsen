import styled from 'styled-components';
import { FaQuestionCircle } from 'react-icons/fa';

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
  }
`;

export const StyledCuisine = styled.p`
  font-family: 'InterRegular';
  font-size: 15px;
  margin: 5px 0 0 0;

  @media (max-width: 900px) {
    font-size: 14px;
  }
`;

export const StyledInfo = styled.input`
  font-family: 'RobotoRegular';
  margin-bottom: 10px;
  border-radius: 5px;
  border: 2px solid grey;
  height: 30px;
  width: 200px;

  @media (max-width: 1100px) {
    width: 170px;
  }

  @media (max-width: 1000px) {
    width: 145px;
  }

  @media (max-width: 900px) {
    width: 160px;
  }
`;

export const QuestionIcon = styled(FaQuestionCircle)`
  cursor: pointer;
  position: absolute;
  right: ${({ lang }) => (lang === 'ru' ? '19.7%' : '20.3%')};
  top: 5px;

  &:hover {
    color: #4f4f4f;
  }

  @media (max-width: 1200px) {
    right: ${({ lang }) => (lang === 'ru' ? '12.5%' : '13%')};
  }

  @media (max-width: 1100px) {
    right: 9.5%;
  }

  @media (max-width: 1000px) {
    right: 4%;
  }

  @media (max-width: 900px) {
    right: ${({ lang }) => (lang === 'ru' ? '0' : '2px')};
  }
`;

export const Tooltip = styled.div`
  font-family: 'InterRegular';
  position: absolute;
  top: 81%;
  left: 67%;
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

  @media (max-width: 900px) {
    position: absolute;
    top: 870px;
  }
`;

export const StyledDescription = styled.textarea`
  font-family: 'RobotoRegular';
  font-size: 18px;
  margin-top: 10px;
  width: 100%;
  height: 250px;
  resize: none;
  text-align: start;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
    transition: background-color 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #888;
  }

  @-moz-document url-prefix() {
    scrollbar-width: thin;
    scrollbar-color: #ccc transparent;
  }

  @media (max-width: 900px) {
    position: absolute;
    top: 960px;
    width: 350px;
  }
`;

export const CharCount = styled.div`
  font-family: 'InterRegular';
  font-size: 12px;
  color: grey;
  text-align: right;
  margin-top: 5px;

  @media (max-width: 900px) {
    position: absolute;
    top: 1220px;
    right: calc(15px + (270 - 15) * ((100vw - 390px) / (900 - 390)));
  }
`;
