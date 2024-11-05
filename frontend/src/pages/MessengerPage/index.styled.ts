import styled from 'styled-components';
import { MdOutlineVerifiedUser } from 'react-icons/md';

export const MessengerWrapper = styled.div`
  width: 1080px;
  height: 510px;
  margin-top: 100px;
  border: 1px solid black;
  display: flex;
  overflow: hidden;
`;

export const ChatList = styled.div`
  // width: 300px;
  // border-right: 1px solid #ccc;
  // overflow-y: hidden;
  // height: 510px;
  // position: relative;

  // &:hover {
  //   overflow-y: auto;
  // }

  // &::-webkit-scrollbar {
  //   width: 4px;
  //   position: absolute;
  //   right: 0;
  // }

  // &::-webkit-scrollbar-track {
  //   background: transparent;
  //   border-radius: 10px;
  // }

  // &::-webkit-scrollbar-thumb {
  //   background-color: #ccc;
  //   border-radius: 10px;
  //   transition:
  //     background-color 0.3s ease,
  //     opacity 0.3s ease;
  //   opacity: 0;
  // }

  // &:hover::-webkit-scrollbar-thumb {
  //   opacity: 1;
  // }

  // &::-webkit-scrollbar-thumb:hover {
  //   background-color: #888;
  // }

  width: 300px;
  border-right: 1px solid #ccc;
  overflow-y: auto;
  height: calc(100% - 57px);

  &::-webkit-scrollbar {
    width: 3px;
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
`;

export const ChatWindow = styled.div<{ $isActive: boolean }>`
  font-family: 'RobotoRegular';
  font-size: 13px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: ${({ $isActive }) => ($isActive ? 'flex-start' : 'center')};
  align-items: ${({ $isActive }) => ($isActive ? 'stretch' : 'center')};
  background: ${({ $isActive }) => ($isActive ? 'none' : `url('http://localhost:3001/assets/images/background-chat-1.png') center/cover`)};
  text-align: ${({ $isActive }) => ($isActive ? 'left' : 'center')};
`;

export const StartMessage = styled.div`
  background-color: rgba(87, 87, 87, 0.4);
  width: 300px;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  text-align: center;
`;

export const ChatHeader = styled.div`
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
  height: 58px;
`;

export const ChatUserNickname = styled.div`
  font-size: 16px;
  margin-bottom: 3px;
`;

export const ChatMessages = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-image: url('http://localhost:3001/assets/images/background-chat-1.png');

  div {
    max-width: 465px;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: grey;
    border-radius: 10px;
    transition: background-color 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #888;
  }
`;

export const MessageWrapper = styled.div<{ $fromSelf: boolean }>`
  max-width: 70%;
  margin: 5px 0;
  padding: 10px;
  border-radius: 15px;
  background-color: ${({ $fromSelf }) => ($fromSelf ? '#d4f5d4' : '#e0e0e0')};
  align-self: ${({ $fromSelf }) => ($fromSelf ? 'flex-end' : 'flex-start')};
`;

export const UserNickname = styled.span<{ $isSavedMessages: boolean }>`
  position: absolute;
  top: 19%;
  left: 23%;
  max-width: 130px;
  white-space: ${({ $isSavedMessages }) => ($isSavedMessages ? undefined : 'nowrap')};
  overflow: ${({ $isSavedMessages }) => ($isSavedMessages ? undefined : 'hidden')};
  text-overflow: ${({ $isSavedMessages }) => ($isSavedMessages ? undefined : 'ellipsis')};
`;

export const VerifiedIcon = styled(MdOutlineVerifiedUser)`
  position: absolute;
`;

export const LastMessageContent = styled.span<{ $isActive: boolean }>`
  position: absolute;
  top: 55%;
  left: 23%;
  color: ${({ $isActive }) => ($isActive ? 'white' : '#aba9a9')};
  font-size: 14px;
  max-width: 225px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const LastMessageTime = styled.span<{ $isActive: boolean }>`
  position: absolute;
  top: 19%;
  right: 2%;
  color: ${({ $isActive }) => ($isActive ? 'white' : '#aba9a9')};
  font-size: 14px;
`;

export const ChatInputContainer = styled.div`
  padding: 10px;
  border-top: 1px solid #ccc;
  display: flex;
  height: 55px;
  position: relative;
`;

export const ChatInput = styled.input`
  font-family: 'RobotoRegular';
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  outline: none;
`;

export const SendButton = styled.button`
  padding: 10px 20px;
  background-color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  right: 0;
  bottom: 3%;
`;

export const ChatItem = styled.div<{ $isActive: boolean }>`
  font-family: 'RobotoRegular';
  font-size: 15px;
  padding: 10px;
  cursor: pointer;
  background-color: ${({ $isActive }) => ($isActive ? '#47a0ff' : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? 'white' : 'inherit')};
  &:hover {
    background-color: ${({ $isActive }) => ($isActive ? 'none' : '#f0f0f0')};
  }
  position: relative;
  border-bottom: 1px solid #ccc;
`;
