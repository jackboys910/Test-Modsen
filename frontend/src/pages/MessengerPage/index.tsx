import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import { MdSend } from 'react-icons/md';
import { IoMdArrowRoundBack } from 'react-icons/io';
import formatLastMessageTime from '@utils/formatLastMessageTime';
import formatMessageTime from '@utils/formatMessageTime';
import getDateSeparator from '@utils/getDateSeparator';
import formatLastOnline from '@utils/formatLastOnline';
import Header from '@components/Header';
import Footer from '@components/Footer';
import BurgerMenu from '@components/BurgerMenu';
import SearchInputWithClear from '@components/SearchInputWithClear';
import { BodyWrapper, StyledLink } from '@pages/ProfilePage/index.styled';
import {
  MessengerWrapper,
  UsersWindow,
  ChatList,
  ChatWindow,
  StartMessage,
  ChatHeader,
  ChatUserNickname,
  ChatMessages,
  MessageSeparator,
  MessageWrapper,
  MessageTime,
  UserNickname,
  StyledNicknameLink,
  StyledLastOnline,
  VerifiedIcon,
  LastMessageContent,
  LastMessageTime,
  ChatInputContainer,
  ChatInput,
  SendButton,
  ChatItem,
} from './index.styled';

const socket = io('http://localhost:3001');

interface IMessage {
  sender_id: number;
  content: string;
  sent_at: string;
}

interface IChat {
  id: number;
  nickname: string;
  profile_picture: string;
  last_message_time: string;
  last_message_content: string;
  last_online: string | null;
}

const processChatData = (data: IChat[]): IChat[] => {
  const chatMap = new Map<number, IChat>();

  data.forEach((chat: IChat) => {
    const existingChat = chatMap.get(chat.id);
    if (!existingChat || new Date(chat.last_message_time) > new Date(existingChat.last_message_time)) {
      chatMap.set(chat.id, chat);
    }
  });

  return Array.from(chatMap.values());
};

const MessengerPage: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { nickname } = useParams<{ nickname: string }>();
  const location = useLocation();
  const { receiverNickname } = location.state || {};
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chats, setChats] = useState<IChat[]>([]);
  const [activeChat, setActiveChat] = useState<IChat | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showChatWindow, setShowChatWindow] = useState(false);

  const chatInputRef = useRef<HTMLInputElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const loggedInUserId = Number(localStorage.getItem('userId'));

  useEffect(() => {
    window.scrollTo(0, 0);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    socket.emit('joinRoom', loggedInUserId);

    socket.on('receiveMessage', (message: any) => {
      const formattedMessage: IMessage = {
        sender_id: message.senderId ?? message.sender_id,
        content: message.content,
        sent_at: message.sent_at,
      };

      if (formattedMessage.sender_id !== loggedInUserId) {
        setMessages((prevMessages) => [...prevMessages, formattedMessage]);
      }

      fetchConversations();
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [loggedInUserId]);

  const fetchConversations = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3001/conversations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const uniqueChats = processChatData(data);
        setChats(uniqueChats);
        if (receiverNickname) {
          const chat = data.find((c: IChat) => c.nickname === receiverNickname);
          setActiveChat(
            chat || {
              id: 0,
              nickname: receiverNickname,
              profile_picture: '',
              last_message_time: '',
              last_online: null,
              last_message_content: '',
            },
          );
        }
      } else {
        console.error('Failed to fetch conversations:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [receiverNickname]);

  const fetchReceiverId = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/users/nickname/${receiverNickname}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data.userId;
      }
    } catch (error) {
      console.error('Error fetching receiver ID:', error);
    }
    return null;
  };

  const fetchMessages = async (chat: IChat) => {
    // if (chat.id === 0) return;
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/messages/${chat.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    if (activeChat) {
      fetchMessages(activeChat);
    }
  }, [activeChat]);

  const sendMessage = async (content: string) => {
    if (content.trim() && activeChat) {
      const token = localStorage.getItem('token');
      const receiverNickname = activeChat.nickname === 'Saved Messages' ? localStorage.getItem('nickname') : activeChat.nickname;

      try {
        await fetch(`http://localhost:3001/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ receiverNickname, content }),
        });

        socket.emit('sendMessage', {
          senderId: loggedInUserId,
          receiverNickname,
          content,
        });

        setMessages((prevMessages) => [...prevMessages, { sender_id: loggedInUserId, content, sent_at: new Date().toISOString() }]);
        setNewMessage('');

        await fetchConversations();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const handleSearch = async (query: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/search?query=${query}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        const formattedData = data.map((chat: IChat) => {
          if (chat.id === loggedInUserId) {
            return {
              ...chat,
              nickname: 'Saved Messages',
              profile_picture: 'scale_1200-round.png',
              last_message_time: chat.last_message_time || '',
              last_message_content: chat.last_message_content || '',
            };
          }
          return {
            ...chat,
            last_message_time: chat.last_message_time || '',
            last_message_content: chat.last_message_content || '',
          };
        });
        setChats(formattedData);
      } else {
        console.error('Failed to search:', response.statusText);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleChatSelect = (chat: IChat) => {
    setActiveChat(chat);
    setShowChatWindow(true);
  };

  const handleBackArrowClick = () => {
    setShowChatWindow(false);
  };

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    } else {
      fetchConversations();
    }
  }, [searchQuery]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, activeChat]);

  useEffect(() => {
    if (activeChat && chatInputRef.current) {
      chatInputRef.current.focus();
    }
  }, [activeChat]);

  const isMobile = windowWidth >= 390 && windowWidth <= 768;

  return (
    <>
      <Header>{isMobile ? <BurgerMenu /> : <StyledLink to='/'>Home</StyledLink>}</Header>
      <BodyWrapper>
        <MessengerWrapper>
          <UsersWindow $isActive={showChatWindow}>
            {/* <SearchInput type='text' placeholder='Search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /> */}
            <SearchInputWithClear value={searchQuery} onChange={setSearchQuery} />
            <ChatList>
              {chats.map((chat, index) => (
                <ChatItem
                  key={`${chat.id}-${chat.nickname}-${index}`}
                  onClick={() => handleChatSelect(chat)}
                  $isActive={activeChat?.id === chat.id}
                >
                  <img src={`http://localhost:3001/assets/images/${chat.profile_picture}`} alt={chat.nickname} width='50' />
                  <UserNickname $isSavedMessages={chat.id === loggedInUserId}>
                    {chat.nickname}
                    {chat.nickname === 'Saved Messages' && chat.id === loggedInUserId && (
                      <VerifiedIcon color={activeChat?.id === chat.id ? 'white' : 'green'} />
                    )}
                  </UserNickname>
                  <LastMessageContent $isActive={activeChat?.id === chat.id}>{chat.last_message_content}</LastMessageContent>
                  <LastMessageTime $isActive={activeChat?.id === chat.id}>{formatLastMessageTime(chat.last_message_time)}</LastMessageTime>
                </ChatItem>
              ))}
            </ChatList>
          </UsersWindow>
          <ChatWindow $isActive={showChatWindow}>
            {!activeChat && <StartMessage>Select a chat to start messaging</StartMessage>}
            {activeChat && (
              <>
                <ChatHeader>
                  <ChatUserNickname>
                    <StyledNicknameLink to={activeChat.nickname === 'Saved Messages' ? '/profile' : `/${activeChat.nickname}`}>
                      {activeChat.nickname}
                    </StyledNicknameLink>
                  </ChatUserNickname>
                  {activeChat && activeChat.nickname !== 'Saved Messages' && (
                    <StyledLastOnline>{formatLastOnline(activeChat.last_online)}</StyledLastOnline>
                  )}
                  {windowWidth <= 850 && (
                    <IoMdArrowRoundBack
                      size={24}
                      onClick={handleBackArrowClick}
                      style={{ cursor: 'pointer', marginRight: '10px', position: 'absolute', right: '0', top: '5px' }}
                    />
                  )}
                </ChatHeader>
                <ChatMessages ref={chatMessagesRef}>
                  {messages.map((msg, index) => {
                    // <MessageWrapper key={index} $fromSelf={msg.sender_id === loggedInUserId}>
                    //   {/* <strong>{msg.sender_id === loggedInUserId ? 'You' : activeChat.nickname}: </strong> */}
                    //   {msg.content}
                    // </MessageWrapper>
                    const dateSeparator = getDateSeparator(msg.sent_at, messages[index - 1]?.sent_at);

                    return (
                      <React.Fragment key={index}>
                        {dateSeparator && <MessageSeparator>{dateSeparator}</MessageSeparator>}
                        <MessageWrapper $fromSelf={msg.sender_id === loggedInUserId}>
                          {msg.content}
                          <MessageTime>{formatMessageTime(msg.sent_at)}</MessageTime>
                        </MessageWrapper>
                      </React.Fragment>
                    );
                  })}
                </ChatMessages>
                <ChatInputContainer>
                  <ChatInput
                    ref={chatInputRef}
                    type='text'
                    placeholder='Write a message...'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <SendButton onClick={() => sendMessage(newMessage)}>
                    <MdSend color='#38b9d6' size={25} />
                  </SendButton>
                </ChatInputContainer>
              </>
            )}
          </ChatWindow>
        </MessengerWrapper>
      </BodyWrapper>
      <Footer />
    </>
  );
};

export default MessengerPage;
