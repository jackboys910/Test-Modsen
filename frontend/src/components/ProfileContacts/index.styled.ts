import styled from 'styled-components';
import { IoMdExit } from 'react-icons/io';

export const ProfileContactsWrapper = styled.div`
  width: 25%;
  padding: 10px;
  background-color: #f0f0f0;
  position: relative;
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
`;

export const StyledMessages = styled.button`
  background-color: green;
  color: white;
  border: none;
  border-radius: 10px;
  width: 150px;
  height: 50px;
  cursor: pointer;
`;
