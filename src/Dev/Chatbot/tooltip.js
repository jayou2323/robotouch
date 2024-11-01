import { useEffect } from 'react';
import styled from 'styled-components';
import { script1_tip } from './script';

const Background = styled.div`
    position:fixed;
    top:0;
    left: 0;
    height:0;
    width:0;
    z-index: 0;
`

const ToolTip0 = styled.div`
    font-size:18px;
    position:fixed;
    max-width:calc(900px);
    color:white;
    // height:calc(157px * 0.4);
    padding : 10px;
    border-radius:calc(12px * 0.6);
    background-color: rgba(189, 110, 0, 0.8);
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3); /* Adds shadow */
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
    left: calc(240px + 12vw);
`

function Tooltip(props){

    useEffect(()=>{
        console.log(props.isHoverChatbox);
    }, [props.isHoverChatbox])

    const script = script1_tip;
    return (
        <>
            <Background/>
            {/* <Tooltip1 style={props.isHoverSidebarItemHeader ? {opacity:100} : {visibility:"hidden", opacity:0}}>
                <div>
                    이전에 질문했던 것에 대한 답변을<br/>
                    다시 확인할 수 있습니다.
                </div>
            </Tooltip1> */}
            <Tooltip2 style={props.isHoverChatbox ? {opacity:100} : {visibility:"hidden", opacity:0}}>
                {script1_tip[props.idx]}
            </Tooltip2>
        </>
    )
}

export default Tooltip;