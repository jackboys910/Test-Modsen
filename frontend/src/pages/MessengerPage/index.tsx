import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import formatMessageTime from '@utils/formatMessageTime';
import formatLastOnline from '@utils/formatLastOnline';
import Header from '@components/Header';
import Footer from '@components/Footer';
import BurgerMenu from '@components/BurgerMenu';
import { BodyWrapper, StyledLink } from '@pages/ProfilePage/index.styled';
import {
  MessengerWrapper,
  ChatList,
  ChatWindow,
  ChatHeader,
  ChatMessages,
  UserNickname,
  VerifiedIcon,
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
}

interface IChat {
  id: number;
  nickname: string;
  profile_picture: string;
  last_message_time: string;
  last_online: string | null;
}

const MessengerPage: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { nickname } = useParams<{ nickname: string }>();
  const location = useLocation();
  const { receiverNickname } = location.state || {};
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [chats, setChats] = useState<IChat[]>([]);
  const [activeChat, setActiveChat] = useState<IChat | null>(null);
  const loggedInUserId = Number(localStorage.getItem('userId'));

  useEffect(() => {
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
      };

      if (formattedMessage.sender_id !== loggedInUserId) {
        setMessages((prevMessages) => [...prevMessages, formattedMessage]);
      }
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
        setChats(data);
        if (receiverNickname) {
          const chat = data.find((c: IChat) => c.nickname === receiverNickname);
          setActiveChat(chat || { id: 0, nickname: receiverNickname, profile_picture: '', last_message_time: '', last_online: null });
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

  // useEffect(() => {
  //   const fetchReceiverId = async () => {
  //     const token = localStorage.getItem('token');
  //     try {
  //       const response = await fetch(`http://localhost:3001/users/nickname/${receiverNickname}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         return data.userId;
  //       }
  //     } catch (error) {
  //       console.error('Error fetching receiver ID:', error);
  //     }
  //     return null;
  //   };

  //   const fetchMessages = async () => {
  //     const receiverId = await fetchReceiverId();
  //     if (!receiverId) return;

  //     const token = localStorage.getItem('token');
  //     try {
  //       const response = await fetch(`http://localhost:3001/messages/${receiverId}`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         setMessages(data);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching messages:', error);
  //     }
  //   };

  //   fetchMessages();
  // }, [receiverNickname]);

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

        setMessages((prevMessages) => [...prevMessages, { sender_id: loggedInUserId, content }]);
        setNewMessage('');

        await fetchConversations();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const isMobile = windowWidth >= 390 && windowWidth <= 768;

  return (
    <>
      <Header>{isMobile ? <BurgerMenu /> : <StyledLink to='/'>Home</StyledLink>}</Header>
      <BodyWrapper>
        <MessengerWrapper>
          <ChatList>
            {chats.map((chat) => (
              <ChatItem key={chat.id} onClick={() => setActiveChat(chat)} $isActive={activeChat?.id === chat.id}>
                <img src={`http://localhost:3001/assets/images/${chat.profile_picture}`} alt={chat.nickname} width='50' />
                <UserNickname>
                  {chat.nickname}
                  {chat.nickname === 'Saved Messages' && chat.id === loggedInUserId && (
                    <VerifiedIcon color={activeChat?.id === chat.id ? 'white' : 'green'} />
                  )}
                </UserNickname>
                <LastMessageTime $isActive={activeChat?.id === chat.id}>{formatMessageTime(chat.last_message_time)}</LastMessageTime>
              </ChatItem>
            ))}
          </ChatList>
          <ChatWindow>
            {activeChat && (
              <>
                <ChatHeader>
                  <div>{activeChat.nickname}</div>
                  {activeChat && activeChat.nickname !== 'Saved Messages' && <div>{formatLastOnline(activeChat.last_online)}</div>}
                </ChatHeader>
                <ChatMessages>
                  {messages.map((msg, index) => (
                    <div key={index}>
                      <strong>{msg.sender_id === loggedInUserId ? 'You' : activeChat.nickname}: </strong>
                      {msg.content}
                    </div>
                  ))}
                </ChatMessages>
                <ChatInputContainer>
                  <ChatInput type='text' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                  <SendButton onClick={() => sendMessage(newMessage)}>Send</SendButton>
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
