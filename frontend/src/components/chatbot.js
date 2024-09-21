import React, { useState } from 'react';
import "./chatbot.css"

function Chatbot() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSend = () => {
    if (userInput.trim()) {
      setMessages([...messages, userInput]);
      setUserInput('');
    }
  };

  return (
    <div>
      <div className="chatbotButton">
        <button className="openChat" onClick={openModal}>
          <span>Chatbot</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h2>Chatbot</h2>
            <div className="messageMenu">
              {messages.map((msg, index) => (
                <div key={index} className="message">
                  {msg}
                </div>
              ))}
            </div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button onClick={handleSend}>Send</button>
            <button className="closeButton" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
