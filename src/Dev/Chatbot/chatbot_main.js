import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Chatbox from './chatbox';
import Message from './message';
import { useState } from 'react';
import default_profile_image from '../../asset/chatbot_main/default_profile.webp';
import axios from 'axios';
import Tooltip from './tooltip';
import SidebarItem from './sidebar_item';
import Modal from './modal';
import {prompt_text} from './prompt';
import StartOnboard from './startOnboard';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.bright_text};
  width: 200px;
  padding: 0px 20px;
`;

const Profile = styled.div`
    display:flex;
    align-items: center;
    /* margin: 10px 0; */
    font-size : 24px;
    height: 100px;
`

const ProfileImage = styled.div`
    width : 40px;
    height : 40px;
    background-image : url(${default_profile_image});
    background-size: cover;
    border-radius : 100%;
    margin-right : 15px;
`

const SidbarItemHaed = styled.div`
  margin: 10px 0;
  font-size : 24px;
  font-weight: 500;
`;

const Main = styled.div`
  width:70%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.background};
`;

const Content = styled.div`
  width:70%;
  height: 85%;
  display: flex;
  flex-direction:column;
  justify-content: top;
  align-items: center;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`;


const ChatboxArea = styled.div`
  height:100px;
  width:100%;
  display: flex;
  justify-content: center;
  align-items: top;
`;


function Chatbot_main() {
    const [isHoverChatbox, setIsHoverChatbox] = useState(false);
    const [isHoverSidebarItemHeader, setIsHoverSidebarItemHeader] = useState(false);
    const [messageChange, setMessageChange] = useState(0);

    const [modalOpen, setModalOpen] = useState(true);

    const [isFirst, setIsFirst] = useState(true);
    const [messages, setMessages] = useState([]);
    const [messagesForGpt, setMessagesForGpt] = useState([]);

    const [input, setInput] = useState('');

    const [sidebarItems, setSidebarItems] = useState([]);

    const scrollRef = useRef(null);

    const sendMessage = async (isOnBorad) => {
        console.log(process.env.REACT_APP_OPENAI_API_KEY);
        let prompt;
        let newMessages;
        if (input === '온보딩' || isOnBorad === '온보딩') {
            prompt = prompt_text;
            newMessages = messages;
        } else if (input.trim() === '') return;
        else {
            prompt = input;
            newMessages = [...messages, { sender: 'user', content: input }];
            setMessages(newMessages);
        }

        const newMessagesForGpt = [...messagesForGpt, { role: 'user', content: prompt }];
        setMessagesForGpt(newMessagesForGpt);
        setInput('');

        console.log(newMessagesForGpt);

        try {
            const res = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                {
                  model: 'gpt-4o',
                  messages: newMessagesForGpt,
                },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                  },
                }
              );
              const data = res.data.choices[0].message.content;
              setMessages([...newMessages, { sender: 'bot', content: data }]);
              setMessagesForGpt([...newMessagesForGpt, { role: 'system', content: data }]);
        } catch (error) {
            console.error('Error fetching response from OpenAI:', error);
        }
    };

    const handleKeyPress = (e) => {
        e.preventDefault();  // Enter 키 입력시 폼 제출을 방지합니다.
        sendMessage(e);
    };
      
    const [components, setComponents] = useState([]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messageChange, messages, components]);

    useEffect(() => {
        // setSidebarItems(['정수기 위치', '복사하는 방법', '프린트하는 방법']);
        const interval = setInterval(() => {
          setComponents((prevComponents) => {
            if (prevComponents.length < 5) {
                if(prevComponents.length === 4){
                    sendMessage('온보딩');
                }
              return [
                ...prevComponents,
                <StartOnboard key={prevComponents.length} index={prevComponents.length + 1} />
              ];
            } else if (prevComponents.length === 3) {
                // console.log('hello');
                // sendMessage('온보딩');
                clearInterval(interval);
                return prevComponents;
            } else {
                clearInterval(interval);
                return prevComponents;
            }
          });
        }, 3000);
    
        return () => clearInterval(interval);
      }, []);

  return (
    <AppContainer>
      {modalOpen ? <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}/> : null}
      <Tooltip isHoverChatbox={isHoverChatbox} isHoverSidebarItemHeader={isHoverSidebarItemHeader}/>
      <Sidebar>
        <Profile>
            <ProfileImage></ProfileImage>
            <div>구자유님</div>
        </Profile>
        <SidbarItemHaed
            onMouseEnter={()=>setIsHoverSidebarItemHeader(true)}
            onMouseLeave={()=>setIsHoverSidebarItemHeader(false)}
        >이전에<br/> 궁금했던 것들</SidbarItemHaed>
        {sidebarItems.map((text, index) => (
            <SidebarItem key={index}>{text}</SidebarItem>
        ))}
      </Sidebar>
      <Main>
        <Content>
          {isFirst ? components : null}
          {messages.map((message, index) => (
            <Message key={index} message={message} isUser={message.sender === 'user'} setMessageChange={setMessageChange} />
          ))}
          <div ref={scrollRef}></div>
        </Content>
        <ChatboxArea onMouseEnter={()=>setIsHoverChatbox(true)}
            onMouseLeave={()=>setIsHoverChatbox(false)}
            >
            <Chatbox setInput={setInput} handleKeyPress={handleKeyPress} setIsHoverChatbox={setIsHoverChatbox}/>
        </ChatboxArea>
      </Main>
    </AppContainer>
  );
}

export default Chatbot_main;
