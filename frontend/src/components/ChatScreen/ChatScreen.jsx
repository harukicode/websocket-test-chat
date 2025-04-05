import { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { Message } from '../Message.jsx';
import styles from './ChatScreen.module.css';
import { SendHorizontal } from 'lucide-react';

export const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const messagesContainerRef = useRef(null);
  
  
  useEffect(() => {
    
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      console.error('User not found in local storage');
      return;
    }
    
    setIsAuthenticated(true);
    
    const newSocket = io('http://localhost:3000', {
      withCredentials: true,
      query: {
        userId: user.id,
        username: user.username,
      },
    });
    
    newSocket.on('connect', () => {
      console.log('Connected to socket server');
    });
    
    newSocket.on('connection_success', (data) => {
      console.log('Connection successful:', data);
    });
    
    newSocket.on('receive_message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    
    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
    });
    
    setSocket(newSocket);
    
    
    fetch('http://localhost:3000/api/messages', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        return response.json();
      })
      .then(data => {
        setMessages(data);
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
    
    return () => {
      newSocket.disconnect();
    };
  }, []);
  
  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };
  
  const sendMessage = () => {
    if (inputMessage.trim() === '' || !socket) return;
    
    socket.emit('send_message', {
      receiverId: null,
      content: inputMessage,
    });
    
    setInputMessage('');
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };
  
  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.chat}>
          <div
            className={styles.chat__content}
            ref={messagesContainerRef}
          >
            {messages.map((message) => (
              <Message
                message={message}
                key={message.id}
                isCurrentUser={message.isCurrentUser !== undefined
                  ? message.isCurrentUser
                  : Number(message.senderId) === Number(JSON.parse(localStorage.getItem('user'))?.id)}
              />
            ))}
          </div>
          <div className={styles.chat__input__container}>
            <input
              className={styles.chat__input}
              onChange={handleInputChange}
              value={inputMessage}
              onKeyPress={handleKeyPress}
              placeholder='Type a message...'
            />
            <button
              className={styles.chat__button}
              onClick={sendMessage}
            >
              {<SendHorizontal />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
