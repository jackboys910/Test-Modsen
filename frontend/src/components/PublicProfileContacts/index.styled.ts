import styled from 'styled-components';

export const StyledSendMessage = styled.button`
  background-color: green;
  color: white;
  border: none;
  border-radius: 10px;
  width: 240px;
  height: 60px;
  cursor: pointer;

  transition: background-color 0.3s ease;

  &:hover {
    background-color: #00571d;
  }

  @media (max-width: 1200px) {
    width: 220px;
  }

  @media (max-width: 1100px) {
    width: 200px;
  }

  @media (max-width: 1000px) {
    width: 180px;
  }
`;
