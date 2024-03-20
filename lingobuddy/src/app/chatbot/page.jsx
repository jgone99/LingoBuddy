'use client'
import React, { useState } from 'react';

const ChatbotUI = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const sendMessage = async () => {
    if(!input.trim()) return;
    const response = await fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: input }),
    });

    if (response.ok) {
      const data = await response.json();
      setConversation((prevConvo) => [
        ...prevConvo,
        { text: input, from: 'user' },
        { text: data.response, from: 'bot' },
      ]);
    } else {
      console.error('Failed to send message:', response.statusText);
    }

    setInput('');
  };

  return (
    <div>
      <div>
        {conversation.map((message, index) => (
          <div key={index} className={`message ${message.from}`}>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message here..."
      />
      <button onClick={sendMessage}>Send</button>
      <style jsx>{`
        .conversation {
          margin-bottom: 10px;
          padding: 10px;
          background-color: #f1f1f1;
          border-radius: 5px;
          max-height: 300px;
          overflow-y: auto;
        }
        .message {
          margin-bottom: 10px;
          padding: 10px;
          border-radius: 10px;
          background-color: #e9e9e9;
        }
        .user {
          background-color: #007bff;
          color: white;
          text-align: right;
        }
        .bot {
          background-color: #333;
          color: white;
        }
        .input-area {
          display: flex;
        }
        input {
          flex: 1;
          padding: 10px;
          border-radius: 5px;
          margin-right: 10px;
        }
        button {
          padding: 10px 20px;
          background-color: #007bff;
          border: none;
          border-radius: 5px;
          color: white;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
      `}</style>
    </div>
  );
};

export default ChatbotUI;
