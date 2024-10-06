import { useEffect } from 'react';
import styled from 'styled-components';

const Background = styled.div`
    position:fixed;
    top:0;
    left:0;
    height:0;
    width:0;
    z-index: 0;
`

const ToolTip0 = styled.div`
    font-size:18px;
    position:fixed;
    width:calc(486px * 0.6);
    height:calc(157px * 0.6);
    border-radius:calc(12px * 0.6);
    background-color: ${props => props.theme.colors.gray};
    display:flex;
    align-items:center;
    transition:0.2s;
    &>div{
        margin-left: 15px
    }
`

const Tooltip1 = styled(ToolTip0)`
    top:75px;
    left:170px;
`


const Tooltip2 = styled(ToolTip0)`
    bottom:15vh;
    left:calc(240px + 12vw);
`

function Tooltip(props){

    useEffect(()=>{
        console.log(props.isHoverChatbox);
    }, [props.isHoverChatbox])
    return (
        <>
            <Background/>
            <Tooltip1 style={props.isHoverSidebarItemHeader ? {opacity:100} : {visibility:"hidden", opacity:0}}>
                <div>
                    이전에 질문했던 것에 대한 답변을<br/>
                    다시 확인할 수 있습니다.
                </div>
            </Tooltip1>
            <Tooltip2 style={props.isHoverChatbox ? {opacity:100} : {visibility:"hidden", opacity:0}}>
                <div>
                이곳을 누르시고,<br/>
                궁금하신 점을 적으면 원하는 정보를<br/>
                얻을 수 있습니다.<br/>
                </div>
            </Tooltip2>
        </>
    )
}

export default Tooltip;