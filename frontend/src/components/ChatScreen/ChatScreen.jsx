import { Message } from '../Message.jsx';
import styles from "./ChatScreen.module.css";
import { SendHorizontal } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const ChatScreen = () => {
  
  const [messages, setMessages] = useState([ {
      id: 1,
      user: "User1",
      text: "Hello",
      time: "12:00",
    },
    {
      id: 2,
      user: "User1",
      text: "How are you?",
      time: "12:01",
    },
    {
      id: 3,
      user: "User2",
      text: "I'm fine, thanks!",
      time: "12:02",
    }]);
  
  
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);
  
  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  }
  
  const sendMessage = () => {
    if(inputMessage.trim() === "") return;
    
    const currentTime = new Date();
    const formattedTime = `${currentTime.getHours()}:${currentTime.getMinutes()}`;
    
    const newMessage = {
      id: messages.length + 1,
      user: 'User1',
      text: inputMessage,
      time: formattedTime,
    }
    
    setMessages([...messages, newMessage]);
    
    setInputMessage("");
  }
  
  const handleKeyPress = (event) => {
    if(event.key === "Enter") {
      sendMessage();
    }
  }
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages]);
  
  
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.chat}>
          <div className={styles.chat__content}>
            {messages.map((message) => (
              <Message message={message} key={message.id} isCurrentUser={message.user === "User1"} />
            ))}
          </div>
          <div className={styles.chat__input__container}>
            <input
              className={styles.chat__input}
              onChange={handleInputChange}
              value={inputMessage}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
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
