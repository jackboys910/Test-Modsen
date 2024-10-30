import styled from 'styled-components';

export const MessengerContainer = styled.div`
  display: flex;
  height: 100vh;
`;

export const ChatList = styled.div`
  width: 300px;
  border-right: 1px solid #ccc;
  overflow-y: auto;
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
`;
