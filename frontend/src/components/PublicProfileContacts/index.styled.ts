import styled from 'styled-components';

export const PublicProfileContactsWrapper = styled.div`
  width: 25%;
  padding: 10px;
  background-color: #f0f0f0;
  position: relative;

  @media (max-width: 900px) {
    width: 350px;
    height: 100px;
    position: absolute;
    top: 1300px;
    margin-left: -10px;
    padding: 10px 10px 10px 85px;
  }
`;

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
