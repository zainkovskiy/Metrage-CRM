import React, { useState, Children } from 'react';
import dotsVerticalUrl, { ReactComponent as DotsVertical } from 'images/dots-vertical.svg';
import styled from 'styled-components';

const ChatMenuDtyle = styled.div`
  position: relative;
`
const ChatMenuIcon = styled.div`
  cursor: pointer;
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
const ChatMenu = ({ children }) => {
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
            Children.map(children, (child) => {
              return React.cloneElement(child, {
                ...child.props,
                toggleIsShow: toggleIsShow,
              })
            })
          }
        </ChatMenuList>
      }
    </ChatMenuDtyle>
  );
};
export default ChatMenu;