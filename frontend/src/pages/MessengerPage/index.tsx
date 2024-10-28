import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

interface IMessage {
  sender_id: number;
  content: string;
}

const MessengerPage: React.FC = () => {
  const { nickname } = useParams<{ nickname: string }>();
  const location = useLocation();
  const { receiverNickname } = location.state || {};
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const loggedInUserId = Number(localStorage.getItem('userId'));

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

  const fetchMessages = async () => {
    const receiverId = await fetchReceiverId();
    if (!receiverId) return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/messages/${receiverId}`, {
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
    fetchMessages();
  }, [receiverNickname]);

  const sendMessage = async (content: string) => {
    if (content.trim()) {
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
          body: JSON.stringify({ receiverNickname, content }),
        });

        socket.emit('sendMessage', {
          senderId: loggedInUserId,
          receiverNickname,
          content,
        });

        setMessages((prevMessages) => [...prevMessages, { sender_id: loggedInUserId, content }]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <div>
      <h1>Chat with {receiverNickname}</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender_id === loggedInUserId ? 'You' : receiverNickname}: </strong>
            {msg.content}
          </div>
        ))}
      </div>
      <input type='text' value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
      <button onClick={() => sendMessage(newMessage)}>Send</button>
    </div>
  );
};

export default MessengerPage;
