import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LuRefreshCw } from "react-icons/lu";
import CopyButton from './CopyButton';
import './Chatbot.css';

const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [receivingRes, setReceivingRes] = useState(false);
  const chatbotMessagesRef = useRef(null);

  const chatWithGPT3 = async (userInput) => {
    let apiEndpoint = "https://3.109.184.229/api/v1/runQuery";
    const headers = {
      'Content-Type': 'application/json',
    };

    const data = {
      query: userInput,
    };
    try {
      setReceivingRes(true);
      const response = await axios.post(apiEndpoint, data, { headers, cors: true });
      setReceivingRes(false);
      return response.data;
    } catch (error) {
      console.error('Error communicating with the API:', error);
      setReceivingRes(false);
      return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { text: input, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const response = await chatWithGPT3(input);
    const newAiMessage = { text: formatResponse(response["response"]), user: false };
    setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    setInput('');
  };

  const formatResponse = (text) => {
    if (typeof text === 'string') {
      return text;
    } else if (Array.isArray(text)) {
      return text.map((str) => str + '\n').join('');
    } else {
      console.log("Printing Stringified Response...");
      return String(text);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  useEffect(() => {
    if (chatbotMessagesRef.current) {
      chatbotMessagesRef.current.scrollTop = chatbotMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={`popup-dialog open`}>
      <div className="popup-content">
        <div className="chatbot-popup-header">
          <h2>InterQ - SQLBot</h2>            
          <Link to="/" style={{ textDecoration: 'none'}}>
            <button className='go-back-button'>Go Back</button>
          </Link>
        </div>
        <div className="chatbot-messages" ref={chatbotMessagesRef}>
          <div className="disclaimer-message-box">
            <div className="disclaimer-text">
              This AI bot is experimental and might provide inaccurate or incomplete answers. Always consult the official InterQ documentation to verify any responses provided here.
            </div>
          </div>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.user ? 'user-message' : 'ai-message'}`}
            >
              {message.text}
            </div>
          ))}
          {receivingRes ? (
            <div className="loading-anim">
              <div className="anim-outer" style={{ minHeight: '64px', justifyContent: 'center' }}>
                <div className="anim-text">Gathering sources...</div>
                <div className="progress-bar">
                  <div className="progress-bar-strip"></div>
                </div>
              </div>
            </div>
          ) : ""}
          <div className="toolbox">
            <div className="copy-clear-btn-box">
              {messages.length > 0 && !receivingRes ? (
                <button className='toolbox-btn' onClick={clearChat}>
                  <LuRefreshCw /><span className='clear-btn-text'>Clear</span>
                </button>
              ) : ""}
              {messages.length > 0 && !receivingRes ? (
                <CopyButton lastMessage={messages[messages.length - 1]} />
              ) : ""}
            </div>
          </div>
        </div>
        <form className="chatbot-input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
