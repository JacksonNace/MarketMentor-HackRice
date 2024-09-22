import React, { useState } from 'react';
import axios from 'axios';
import "./chatbot.css";

function Chatbot() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSend = async () => {
    if (userInput.trim()) {
        const userMessage = userInput.trim();
        setMessages([...messages, { text: userMessage, sender: 'user' }]);
        setUserInput('');

        try {
            const response = await axios.post('http://localhost:5000/response', {
                message: userMessage,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const chatbotResponse = response.data.response;
            setMessages(prevMessages => [...prevMessages, { text: chatbotResponse, sender: 'bot' }]);
        } catch (error) {
            console.error("Error sending message:", error);
            setMessages(prevMessages => [...prevMessages, { text: "Error: Failed to get a response", sender: 'bot' }]);
        }
    }
  };


  return (
    <div>
      <div className="chatbotButton">
        <button className="openChat" onClick={openModal}>
          <span>Ask Mark</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h2>Mark: Your personal Financial Advisor</h2>
            <div className="messageMenu">
              {messages.map((msg, index) => (
                <div key={index} className={`message ${msg.sender}`}>
                  {msg.text}
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
