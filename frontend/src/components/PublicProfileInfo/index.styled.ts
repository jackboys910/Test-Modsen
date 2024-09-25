import styled from 'styled-components';

export const ImageWrapper = styled.div`
  position: relative;
  border: 1px solid blue;
  border-radius: 5px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding: 8px;
  }
`;

export const StyledInformation = styled.p`
  font-family: 'RobotoRegular';
  width: 200px;
  margin: 0;
  padding: 5px;
  height: 30px;
  margin-left: 18px;
`;
