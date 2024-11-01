// Message.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { marked } from 'marked';

const Response = styled.div`
    white-space: pre-wrap; 
    width: fit-content;
    max-width: 70%;
    padding: 30px;
    margin: 10px 10px;
    font-size: 18px;
    border-radius: 26px;
    background-color: #ffebcc
`;

const Input = Response;


function Message({ message, isUser, setMessageChange }) {
    const [displayedText, setDisplayedText] = useState('');
    const sentences = marked(message.content).split(/(?<=\.)\s+/); // 문장 단위로 나누기
    
    const [index, setIndex] = useState(0);

    useEffect(() => {
        // if (!isUser && message.content) {
        //     const interval = setInterval(() => {
        //         if (index < sentences.length) {
        //             setDisplayedText(prev => prev + sentences[index] + ' ');
        //             setIndex(index+1);
        //             console.log(sentences.length, index)
        //             setMessageChange(index);
        //         } else {
        //             clearInterval(interval);
        //         }
        //     }, 2000); // 문장 표시 간격 (1초)
        //     return () => clearInterval(interval);
        // } else {
        //     setDisplayedText(message.content);
        // }
        setDisplayedText(message.content);
    }, [message, isUser, sentences]);

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: isUser ? 'end' : 'start' }}>
            {isUser ? <Input>{message.content}</Input> : <Response style={{backgroundColor:'#FFF7EB'}} dangerouslySetInnerHTML={{ __html: marked(displayedText) }}></Response>}
        </div>
    );
}

export default Message;
