import React, { useState } from 'react';

const ChatbotUI = () => {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const sendMessage = async () => {
    const response = await fetch('/api/chatbot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: input }),
    });
    const data = await response.json();
    setConversation([...conversation, { text: input, from: 'user' }, { text: data.response, from: 'bot' }]);
    setInput('');
  };

  return (
    <div>
      <div>
        {conversation.map((message, index) => (
          <div key={index} className={message.from}>
            {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatbotUI;
