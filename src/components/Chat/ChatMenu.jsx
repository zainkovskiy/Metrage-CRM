import React, { useState } from 'react';
import dotsVerticalUrl, { ReactComponent as DotsVertical } from 'images/dots-vertical.svg';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { useSelector } from 'react-redux';

const ChatMenuDtyle = styled.div`
  position: relative;
`
const ChatMenuIcon = styled.div`
  cursor: pointer;
  padding: 0.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $show }) => $show && theme.color.secondary};
  border-radius: 5px;
  & > svg{
    pointer-events: none;
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.color.primary};
  }
`
const ChatMenuList = styled.div`
  padding: 0.5rem 0;
  border-radius: 5px;
  background-color: #fff;
  position: absolute;
  right: 0;
  top: calc(100% + 0.5rem);
  box-shadow: rgba(0, 0, 0, 0.71) 0px 0px 12px -2px;
`
const ChatMenuItem = styled(TextSpanStyle)`
  padding: 0.5rem;
  cursor: pointer;
  &:hover{
    background-color: ${({theme}) => theme.color.secondary};
  }
`
const ChatMenu = () => {
  const currentButton = useSelector((state) => state.chat.selectButton);
  const [isShow, setIsShow] = useState(false);
  const toggleIsShow = () => {
    setIsShow(!isShow);
  }
  return (
    <ChatMenuDtyle>
      <ChatMenuIcon onClick={toggleIsShow} $show={isShow}><DotsVertical /></ChatMenuIcon>
      {
        isShow &&
        <ChatMenuList>
          {
            menuItem[currentButton].map((item, idx) => {
              return <ChatMenuItem onClick={toggleIsShow} nowrap key={idx}>{item}</ChatMenuItem>
            })
          }
        </ChatMenuList>
      }
    </ChatMenuDtyle>
  );
};
const menuItem = {
  chat: ['Отчистить историю'],
  notification: ['Отчистить историю'],
  line: ['Перенести в заявку', 'Закрыть диалог'],
}
export default ChatMenu;