import styled from 'styled-components';

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
  height: 510px;

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

export const ChatWindow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const ChatHeader = styled.div`
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
`;

export const ChatMessages = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
`;

export const UserNickname = styled.span`
  position: absolute;
  top: 19%;
  left: 23%;
`;

export const LastMessageTime = styled.span`
  position: absolute;
  top: 19%;
  right: 2%;
  color: #aba9a9;
  font-size: 14px;
`;

export const ChatInputContainer = styled.div`
  padding: 10px;
  border-top: 1px solid #ccc;
  display: flex;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ChatItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f0f0f0;
  }
  position: relative;
  border-bottom: 1px solid #ccc;
`;
