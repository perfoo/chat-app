import React, { useState, useEffect } from 'react';
import { auth, database } from './firebase';

const Chat = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Check if a user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe(); // Clean up the auth state listener
    };
  }, []);

  useEffect(() => {
    // Listen for new messages in the database
    const messagesRef = database.ref('messages');
    messagesRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messageList = Object.values(data);
        setMessages(messageList);
      }
    });

    return () => {
      messagesRef.off(); // Clean up the messages listener
    };
  }, []);

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newMessage.trim() === '') {
      return; // Skip empty messages
    }

    const newMessageData = {
      text: newMessage,
      userId: user.uid,
      userName: user.displayName,
    };

    // Save the new message to the database
    database.ref('messages').push(newMessageData);

    setNewMessage('');
  };

  const renderMessage = (message) => {
    return (
      <div key={message.id}>
        <strong>{message.userName}: </strong>
        {message.text}
      </div>
    );
  };

  return (
    <div>
      <h1>Chat App</h1>
      {user ? (
        <div>
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
      ) : null}
    </div>
  );
}

export default Chat;