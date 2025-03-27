import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  z-index: 1001;
  width: 90%;
  max-width: 500px;
`;

export const TitleText = styled.h2`
  font-family: 'SpaceGroteskMedium';
  text-align: center;
  margin: 0;
  position: relative;
  bottom: 10px;
  color: #333;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 12px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
  z-index: 2;
`;

export const RatingContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;

  label {
    font-size: 16px;
    margin-bottom: 8px;
  }
`;

export const RatingText = styled.label`
  position: relative;
  top: 20px;
  margin-right: 10px;
`;

export const DescriptionText = styled.label``;

export const RatingOption = styled.div<{ $selected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background-color: ${({ $selected }) => ($selected ? '#4caf50' : '#ffcc00')};
  margin: 5px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ $selected }) => ($selected ? '#388e3c' : '#ff9900')};
  }
`;

export const DescriptionContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const HorizontalLine = styled.hr`
  width: 100%;
  margin-top: 0;
`;

export const StyledTextarea = styled.textarea`
  font-family: 'RobotoRegular';
  resize: none;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;

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
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  position: absolute;
  bottom: -25px;
  left: 0;
`;

export const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #d3d3d3;
    cursor: not-allowed;
  }
`;

export const SuccessMessage = styled.div`
  text-align: center;
  font-size: 18px;
  font-family: 'InterRegular';

  p {
    margin: 10px 0;
  }
`;
