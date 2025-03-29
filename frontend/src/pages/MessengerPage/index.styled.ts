import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { MdOutlineVerifiedUser } from 'react-icons/md';

export const MessengerWrapper = styled.div`
  width: 1080px;
  height: 510px;
  margin-top: 100px;
  border: 1px solid black;
  display: flex;
  overflow: hidden;

  @media (max-width: 1200px) {
    width: 1000px;
  }

  @media (max-width: 1100px) {
    width: 900px;
  }

  @media (max-width: 1000px) {
    width: 800px;
  }

  @media (max-width: 850px) {
    width: 90%;
    flex-direction: column;

    @supports (-webkit-appearance: none) and (not (-moz-appearance: none)) {
      height: auto;
    }
  }
`;

export const UsersWindow = styled.div<{ $isActive: boolean }>`
  width: 300px;

  @media (max-width: 850px) {
    width: 100%;
    display: ${({ $isActive }) => ($isActive ? 'none' : 'block')};
  }
`;

export const DateHeader = styled.div`
  font-family: 'RobotoRegular';
  font-size: 14px;
  margin: 10px 0;
  padding: 5px 10px;
  background-color: #f5f5f5;
  color: #555;
  border-radius: 10px;
  text-align: center;
  align-self: center;
`;

export const ChatList = styled.div`
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

  @-moz-document url-prefix() {
    scrollbar-width: thin;
    scrollbar-color: #ccc transparent;
  }

  @media (max-width: 850px) {
    width: 100%;
    height: calc(55vh - 68px);
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

  @media (max-width: 850px) {
    width: 100%;
    display: ${({ $isActive }) => ($isActive ? 'flex' : 'none')};
  }
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

  @media (max-width: 850px) {
    position: sticky;
    top: 0;
    z-index: 1;
  }
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

  scrollbar-width: thin;
  scrollbar-color: grey transparent;

  @media (max-width: 850px) {
    height: calc(41.2vh);
    flex: none;
  }
`;

export const MessageSeparator = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px 0 15px 0;
  font-size: 14px;
`;

export const MessageWrapper = styled.div<{ $fromSelf: boolean }>`
  max-width: 70%;
  margin: 5px 0;
  padding: 10px 50px 10px 10px;
  border-radius: 15px;
  background-color: ${({ $fromSelf }) => ($fromSelf ? '#d4f5d4' : '#e0e0e0')};
  align-self: ${({ $fromSelf }) => ($fromSelf ? 'flex-end' : 'flex-start')};
  position: relative;
`;

export const MessageTime = styled.span`
  font-size: 11px;
  position: absolute;
  bottom: 3px;
  right: 10px;
  color: #5c5c5c;
`;

export const UserNickname = styled.span<{ $isSavedMessages: boolean }>`
  position: absolute;
  top: 19%;
  left: 23%;
  max-width: 130px;
  white-space: ${({ $isSavedMessages }) => ($isSavedMessages ? undefined : 'nowrap')};
  overflow: ${({ $isSavedMessages }) => ($isSavedMessages ? undefined : 'hidden')};
  text-overflow: ${({ $isSavedMessages }) => ($isSavedMessages ? undefined : 'ellipsis')};

  @media (max-width: 850px) {
    left: 10.25%;
  }

  @media (max-width: 750px) {
    left: 12%;
  }

  @media (max-width: 650px) {
    left: 13.75%;
  }

  @media (max-width: 550px) {
    left: 16%;
  }

  @media (max-width: 500px) {
    left: 18%;
  }

  @media (max-width: 450px) {
    left: 20%;
  }
`;

export const StyledNicknameLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    text-decoration: none;
  }
`;

export const StyledLastOnline = styled.div`
  color: #9e9e9e;
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

  @media (max-width: 850px) {
    left: 10.25%;
  }

  @media (max-width: 750px) {
    left: 12%;
  }

  @media (max-width: 650px) {
    left: 13.75%;
  }

  @media (max-width: 550px) {
    left: 16%;
  }

  @media (max-width: 500px) {
    left: 18%;
  }

  @media (max-width: 450px) {
    left: 20%;
  }
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

export const RecordingStatusText = styled.p`
  font-family: 'PoppinsMedium';
  position: relative;
  bottom: 5px;
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

export const RecordingButton = styled.button`
  background-color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  position: absolute;
  right: 15px;
  bottom: 2%;
  height: 50px;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledAudio = styled.audio`
  width: 300px;
  height: 40px;
  border-radius: 5px;
  outline: none;

  @-moz-document url-prefix() {
    background-color: #e0e0e0;
  }
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
