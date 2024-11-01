import React, { useState } from 'react';
import styled from 'styled-components';

const ChatboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const TextArea = styled.textarea`
  width: 70%;
  padding: 10px;
  border-radius: 10vh;
  background-color: ${props => props.theme.colors.primary_bright};
  border: 1px solid ${props => props.theme.colors.primary};
  padding-left: 30px;
  font-size: 20px;
  font-weight: 500;
  outline: none;
  resize: none;
  height: 70px;
  &::placeholder{
    color: ${props => props.theme.colors.text};
    font-weight: 500;
  }
`;

const CharacterCount = styled.div`
  margin-top: 5px;
  font-size: 14px;
  color: ${props => props.theme.colors.text};
`;

function Chatbox(props) {
  const [message, setMessage] = useState('');
  const maxChars = 300;

  const handleInputChange = (e) => {
    if (e.target.value.length <= maxChars) {
      setMessage(e.target.value);
      props.setInput(e.target.value);
      if(e.target.value === '') {
          props.setIsHoverChatbox(true);
      } else {
          props.setIsHoverChatbox(false);
      }
    }
  };

  return (
    <ChatboxContainer>
      <InputContainer>
        <TextArea
          placeholder="대화를 입력해주세요."
          value={message}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey && e.nativeEvent.isComposing === false) {
              e.preventDefault();
              props.handleKeyPress(e);
              setMessage('');
            }
          }}
        />
      </InputContainer>
      <CharacterCount>
        {message.length}/{maxChars}
      </CharacterCount>
    </ChatboxContainer>
  );
}

export default Chatbox;