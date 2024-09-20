import styled from 'styled-components';

export const ProfileInfoWrapper = styled.div`
  width: 25%;
  padding: 10px;
  position: relative;
`;

export const ImageWrapper = styled.div`
  position: relative;
  border: 1px solid blue;
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
`;

export const DataWrapper = styled.div`
  display: flex;
  gap: 5px;
`;

export const StyledInfoInput = styled.input`
  width: 150x;
  margin-bottom: 10px;
`;

export const StyledTime = styled.p`
  font-family: 'InterRegular';
  font-size: 15px;
  margin: 0 0 8px 0;
`;
