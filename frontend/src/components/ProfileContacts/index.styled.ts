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

// export const StyledSignOut = styled.button`
//   background-color: red;
//   color: white;
//   border: none;
//   border-radius: 10px;
//   width: 150px;
//   height: 50px;
//   cursor: pointer;
// `;

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
  width: 120px;
  border-radius: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #d3d3d3;
  }
`;
