import React, { useState } from 'react';
import styled from 'styled-components';

const ChatboxContainer = styled.div`
  display: flex;
  max-height: 100px;
  height: 70px;
  justify-content: center;
  width: 100%;
`;

const Input = styled.input`
  width: 70%;
  padding: 10px;
  border-radius: 10vh;
  background-color: ${props => props.theme.colors.primary_bright};
  border: 1px solid ${props => props.theme.colors.primary};
  padding-left: 30px;
  font-size: 20px;
  font-weight: 500;
  outline: none;
  &::placeholder{
    color: ${props => props.theme.colors.text};
    font-weight: 500;
  }
`;

function Chatbox(props) {
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    props.setInput(e.target.value);
    if(e.target.value === '') {
        props.setIsHoverChatbox(true);
    } else {
        props.setIsHoverChatbox(false);
    }
    
  };

  return (
    <ChatboxContainer>
      <Input
        type="text"
        placeholder="대화를 입력해주세요."
        value={message}
        onChange={handleInputChange}
        onKeyDown={(e) => {
            if (e.key === 'Enter' && e.nativeEvent.isComposing === false) {
                props.handleKeyPress(e);
                setMessage('');
            }}}
        />
    </ChatboxContainer>
  );
}

export default Chatbox;
