"use client";
import React, { useState } from "react";

const ChatbotUI = () => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      setLoading(true);
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage: input }),
      });

      if (response.ok) {
        const data = await response.json();
        setConversation((prevConvo) => [
          ...prevConvo,
          { text: input, from: "user" },
          { text: data.response, from: "bot" },
        ]);
      } else {
        console.error("Failed to send message:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }

    setInput("");
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="conversation">
        {conversation.map((message, index) => (
          <div key={index} className={`message ${message.from}`}>
            {message.text}
          </div>
        ))}
        {loading && (
          <div className={`message bot loading-indicator`}>Loading...</div>
        )}
      </div>
      <input className="input-area"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        placeholder="Type your message here..."
      />
      <button onClick={sendMessage}>Send</button>
      <style jsx>{`
        .conversation {
          margin-top: 10px;
          margin-bottom: 10px;
          padding: 10px;
          background-color: #f1f1f1;
          border-radius: 5px;
          max-height: 300px;
          overflow-y: auto;
          position: relative;
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
          align-items: center;
          padding: 0 10px;
          margin-top: 10px;
        }
        input {
          flex: 1;
          padding: 10px;
          border-radius: 5px;
          margin-right: 10px;
        }
        button {
          align: left;
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
        .loading-indicator {
          position: relative;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: auto;
          height: auto;
          padding: 5px 10px;
          background-color: #333;
          border-radius: 50%;
          animation: pulse 1s ease-in-out infinite;
        }
        @keyframes pulse {
          0% {
            transform: scale(0.8);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(0.8);
          }
        }
      `}</style>
    </div>
  );
};

export default ChatbotUI;
