import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { darkTheme } from '../styles/theme';

const ChatContainer = styled.div`
  background-color: ${darkTheme.background.secondary};
  border-radius: 8px;
  overflow: hidden;
  margin-top: 15px;
`;

const ChatHeader = styled.div`
  padding: 10px;
  background-color: ${darkTheme.background.elevated};
  border-bottom: 1px solid ${darkTheme.border.primary};
  color: #ffffff;
`;

const MessagesContainer = styled.div`
  padding: 10px;
  background-color: #222;
  max-height: 200px;
  min-height: 150px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MessageBubble = styled.div`
  background-color: ${props => props.sender === 'You' ? darkTheme.brand.primary : darkTheme.background.elevated};
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 12px;
  margin: 4px 0;
  max-width: 80%;
  align-self: ${props => props.sender === 'You' ? 'flex-end' : 'flex-start'};
`;

const SenderName = styled.div`
  font-size: 12px;
  color: #ffffff;
  margin-bottom: 2px;
  ${props => props.sender === 'You' && 'text-align: right;'}
`;

const ChatInputContainer = styled.div`
  display: flex;
  background-color: #333;
  padding: 10px;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: none;
  border-radius: 20px;
  background-color: ${darkTheme.background.elevated};
  color: #ffffff;
  
  &::placeholder {
    color: #ffffff;
  }
`;

const SendButton = styled.button`
  background-color: #2a5885;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #366ba2;
  }
  
  &:disabled {
    background-color: #444;
    cursor: not-allowed;
  }
`;

const ChatBox = ({ messages, onSendMessage }) => {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      onSendMessage(messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <span>Chat</span>
        <span style={{ fontSize: '12px', color: '#aaa' }}>
          You and Dr_Dome left, in the top-right
        </span>
      </ChatHeader>
      
      <MessagesContainer>
        {messages.map((msg, index) => (
          <div key={index}>
            {msg.sender !== 'You' && <SenderName>{msg.sender}</SenderName>}
            <MessageBubble sender={msg.sender}>
              {msg.text}
            </MessageBubble>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </MessagesContainer>
      
      <ChatInputContainer>
        <ChatInput
          type="text"
          placeholder="Let's do it!"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <SendButton 
          onClick={handleSendMessage}
          disabled={!messageText.trim()}
        >
          →
        </SendButton>
      </ChatInputContainer>
    </ChatContainer>
  );
};

export default ChatBox; 