import styled from "styled-components";

const WelcomeMessage = styled.div`
  font-size: 24px;
  margin : 40vh 0vh;
  width:fit-content;
  color: ${props => props.theme.colors.text};
  font-weight: bold;
  &>span{
    font-size:20px;
  }
`;

const StartOnboardButton = styled.div`
    width:500px;
    height:100%;
    background-color: ${props => props.theme.colors.primary_bright};
    display:flex;
    justify-content:center;
    align-items:center;
    border:1px solid ${props => props.theme.colors.primary};
    border-radius:24px;
    &>div{
        font-size:30px;
        font-weight:500;
    }
`

function StartOnboard({index}) {

    if(index === 1){
        return(
            <WelcomeMessage>로보터치에 오신걸 환영합니다.<br/><span>RoboTouch</span></WelcomeMessage>
        )
    } else if(index === 2){
        return(
            <WelcomeMessage>로보터치는 인공지능과 대화를 통해 사용자의 언어습관을 개선해주는 서비스입니다.</WelcomeMessage>
        )
    } else if(index === 3){
        return(
            <WelcomeMessage>지금부터 대화를 시작해볼까요?</WelcomeMessage>
        )
    }
}

export default StartOnboard;