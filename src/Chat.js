import React, { useState, useEffect } from 'react';
import { database } from './firebase';
import { v4 as uuidv4 } from 'uuid';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    // Listen for new messages in the database
    const messagesRef = database.ref('messages');
    messagesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.values(data);
        setMessages(messageList);
      } else {
        setMessages([]); // Clear the messages when there are no new messages
      }
    });
  
    return () => {
      messagesRef.off(); // Clean up the messages listener
    };
  }, []);

  const generateRandomId = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 12; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
  };

  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  useEffect(() => {
    // Generate a random ID and color for the user
    let id = localStorage.getItem('chatUserId');
    let color = localStorage.getItem('chatUserColor');

    if (!id) {
      id = generateRandomId();
      localStorage.setItem('chatUserId', id);
    }

    if (!color) {
      color = getRandomColor();
      localStorage.setItem('chatUserColor', color);
    }

    setUserId(id);
  }, []);

  const renderMessage = (message) => {
    const messageStyle = { color: message.color };
    const messageKey = uuidv4(); // Generate a unique key for the message
  
    return (
      <div key={messageKey}>
        <strong style={messageStyle}>{message.userId}: </strong>
        {message.text}
      </div>
    );
  };

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newMessage.trim() === '') {
      return;
    }

    const newMessageData = {
      text: newMessage,
      userId: userId,
      color: localStorage.getItem('chatUserColor'),
      createdAt: Date.now(), // Add the creation time to the message object
    };

    database.ref('messages').push(newMessageData);

    setNewMessage('');
  };

  const handleClear = () => {
    const currentTime = Date.now();
    const filteredMessages = messages.filter((message) => {
      const messageTime = message.createdAt || 0;
      return messageTime >= currentTime;
    });

    setMessages(filteredMessages);
  };

  return (
    <div>
      <h1>Chat App</h1>
      <button onClick={handleClear}>Clear</button>
      <div>
        {messages.map((message) => renderMessage(message))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
