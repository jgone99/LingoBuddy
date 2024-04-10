/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/clerk-react";

const ChatbotUI = () => {
  const [input, setInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { user } = useUser();
  const userPfp = user?.profileImageUrl;

  const sendMessage = async () => {
    if (!input.trim() || isSending) return;
    setIsSending(true);
    setConversation((prevConvo) => [
      ...prevConvo,
      { text: input, from: "user" },
    ]);
    setIsTyping(true);
    setInput("");
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userMessage: input }),
      });
      if (response.ok) {
        const data = await response.json();
        const chars = data.response.split('');
        let partialMessage = "";

        const typeChar = () => {
        if (chars.length) {
          partialMessage += chars.shift(); // Add the next character to the partial message
          setConversation(prevConvo => {
            // Remove the last message if it's a partial typing message
            const newConvo = prevConvo.length && prevConvo[prevConvo.length - 1].isTyping ? prevConvo.slice(0, -1) : prevConvo;
            return [...newConvo, { text: partialMessage, from: "bot", isTyping: true }];
          });
          setTimeout(typeChar, 50); // Adjust typing speed here
        } else {
          // Once all characters are typed, update the conversation with the full message and remove the typing indicator
          setConversation(prevConvo => {
            const newConvo = prevConvo.slice(0, -1); // Remove the last partial message
            return [...newConvo, { text: partialMessage, from: "bot", isTyping: false }];
          });
          setIsTyping(false);
        }
      };

      setTimeout(typeChar, 25);
  
      } else {
        console.error("Failed to send message:", response.statusText);
        setIsTyping(false);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);
    }
    setIsSending(false);
    setInput("");
  };

  return (
    <div className="chat-container">
      <div className="conversation-area">
        {conversation.map((message, index) => (
          // eslint-disable-next-line react/jsx-no-comment-textnodes
          // eslint-disable-next-line @next/next/no-img-element, @next/next/no-img-element
          <div key={index} className={`message ${message.from}`}>
            <img
              src={message.from === "user" ? userPfp : "/kissy.png"}
              alt="pfp"
              width={40}
              height={40}
              className="profile-pic"
              style={{ borderRadius: "50%" }}
            />
            {message.text}
          </div>
        ))}
        {isTyping && (
          <div className="typing-indicator">
            <span>AI is typing...</span>
          </div>
        )}
      </div>
      <div className="input-area">
        <img
          src={userPfp}
          alt="pfp"
          width={30}
          height={30}
          className="input-profile-pic"
          style={{ borderRadius: "50%" }}
        />
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message here..."
          disabled={isSending}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <style jsx>{`
        .chat-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
          justify-content: flex-end;
          align-items: left;          
        }
        .typing-indicator {
          padding: 10px;
          margin-left: px; // This accounts for the profile pic space
        }
        .typing-indicator span {
          background-color: #e0e0e0; // a light grey background for the typing bubble
          border-radius: 15px;
          padding: 6px 12px;
          font-style: italic;
        }
        .conversation-area {
          flex-grow: 1;
          width: 100%;
          padding: 30px;
          overflow-y: auto;
          position: fixed;
          left: 25%;
          top: 50px;
          bottom: 50px;
        }
        .message {
          display: flex;
          align-items: center;
          margin: 15px ;
        }
        .profile-pic-wrapper {
          width: 30px;
          height: 30px;
          position: relative;
          border-radius: 50%;
          overflow: hidden;
        }
        .input-area {
          width: 50%;
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(
            -50%
          );
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px;
          background: #f1f1f1;
          border-radius: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        input {
          flex: 1;
          padding: 10px;
          margin: 0 10px;
          border-radius: 5px;
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
