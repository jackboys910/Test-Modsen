import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import Header from '@components/Header';
import BurgerMenu from '@components/BurgerMenu';
import { StyledLink } from '@pages/ProfilePage/index.styled';
import {
  MessengerContainer,
  ChatList,
  ChatWindow,
  ChatHeader,
  ChatMessages,
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

  useEffect(() => {
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
            setActiveChat(chat || { id: 0, nickname: receiverNickname, profile_picture: '' });
          }
        } else {
          console.error('Failed to fetch conversations:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };

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
    // const receiverId = await fetchReceiverId();
    // if (!receiverId) return;
    if (chat.id === 0) return;
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
      // const message: IMessage = {
      //   senderId: loggedInUserId || '',
      //   content,
      // };

      try {
        await fetch(`http://localhost:3001/sendMessage`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ receiverNickname: activeChat.nickname, content }),
        });

        socket.emit('sendMessage', {
          senderId: loggedInUserId,
          receiverNickname: activeChat.nickname,
          content,
        });

        setMessages((prevMessages) => [...prevMessages, { sender_id: loggedInUserId, content }]);
        setNewMessage('');
        if (activeChat.id === 0) {
          setChats((prevChats) => [...prevChats, activeChat]);
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const isMobile = windowWidth >= 390 && windowWidth <= 768;

  return (
    // <div>
    //   <h1>Chat with {receiverNickname}</h1>
    //   <div>
    //     {messages.map((msg, index) => (
    //       <div key={index}>
    //         <strong>{msg.sender_id === loggedInUserId ? 'You' : receiverNickname}: </strong>
    //         {msg.content}
    //       </div>
    //     ))}
    //   </div>
    //   <input type='text' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
    //   <button onClick={() => sendMessage(newMessage)}>Send</button>
    // </div>
    <>
      <Header>{isMobile ? <BurgerMenu /> : <StyledLink to='/'>Home</StyledLink>}</Header>
      <MessengerContainer>
        <ChatList>
          {chats.map((chat) => (
            <ChatItem key={chat.id} onClick={() => setActiveChat(chat)}>
              <img src={`/assets/images/${chat.profile_picture}`} alt={chat.nickname} width='30' />
              <span>{chat.nickname}</span>
            </ChatItem>
          ))}
        </ChatList>
        <ChatWindow>
          {activeChat && (
            <>
              <ChatHeader>Chat with {activeChat.nickname}</ChatHeader>
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
      </MessengerContainer>
    </>
  );
};

export default MessengerPage;
