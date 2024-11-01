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
import { script1 } from './script';

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

    const [sidebarItems, setSidebarItems] = useState(['여자친구와 갈등']);

    const scrollRef = useRef(null);

    const script = script1
    const [idx, setIdx] = useState(0);

    useEffect(()=>{
      let message_ = [];
      let newMessages = [];
      let idx_ = 0;
      const interval = setInterval(()=>{
        if(idx_ < 6) {
          if(idx_ % 2 === 0){
            console.log('bot');
            newMessages = [...message_, { sender: 'user', content: script[idx_] }];
          } else {
            console.log('user');
            newMessages = [...message_, { sender: 'bot', content: script[idx_] }];
          }
          
          message_ = newMessages;
          setMessages(newMessages);
          idx_++
          console.log(message_)
          setIdx(idx_); 
        } else {
          clearInterval();
        }
      }, 2000);
      return () => clearInterval(interval);
    },[])

    const sendMessage = async (isOnBorad) => {
        let prompt;
        let newMessages;
        if (input.trim() === '') return;
        else if (input !== '온보딩'){
            prompt = input;
            newMessages = [...messages, { sender: 'user', content: input }];
            setMessages(newMessages);
        }
        setInput('');

        if(idx < script.length) {
          await new Promise(resolve => setTimeout(resolve, script[idx].length*40));
          newMessages = [...newMessages, { sender: 'bot', content: script[idx] }];
          console.log(newMessages);
          setMessages(newMessages); 
          setIdx(idx + 1);
        }

        console.log(idx);
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

  return (
    <AppContainer>
      {modalOpen ? <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}/> : null}
      <Tooltip isHoverChatbox={isHoverChatbox} isHoverSidebarItemHeader={isHoverSidebarItemHeader} idx={idx}/>
      <Sidebar>
        <Profile>
            <ProfileImage></ProfileImage>
            <div>전자룡 님</div>
        </Profile>
        <SidbarItemHaed
            onMouseEnter={()=>setIsHoverSidebarItemHeader(true)}
            onMouseLeave={()=>setIsHoverSidebarItemHeader(false)}
        >상황</SidbarItemHaed>
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
