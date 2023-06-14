import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import sendUrl, { ReactComponent as Send } from 'images/send.svg';

const InputChatUIStyle = styled.div`
  display: flex;
  gap: 0.5rem;
  width: 100%
`
const AreaStyle = styled.textarea`
  resize: none;
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid ${({ theme, error }) => error ? 'red' : theme.color.primary};
  outline: 1px solid;
  outline-color: transparent;
  width: 100%;
  box-sizing: border-box;
  height: ${({ height }) => height && height + 'px'};
  overflow: hidden;
  &:focus{
    outline-color: ${({ theme, error }) => error ? 'red' : theme.color.primary};
  }
  &:disabled{
    background-color: #eee;
    opacity: 0.8;
    border: 1px solid #ccc;
  }
`
const ButtonStyle = styled.div`
  cursor: pointer;
  // border: 1px solid ${({ theme }) => theme.color.primary};
  background-color: ${({ theme }) => theme.color.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.2rem;
  border-radius: 5px;
  width: 35.5px;
  height: 35.5px;
  min-width: 35.5px;
  box-sizing: border-box;
  align-self: flex-end;
  transition: opasity .3s;
    &:hover{
      opacity: .7;
    }
    &:active{
      opacity: 1;
    }
`
const IconSend = styled(Send)`
    width: 20px;
    height: 20px;
    fill: #fff;
    pointer-events: none;
`

export const InputChatUI = ({ onClick }) => {
  const [value, setValue] = useState('');
  const areaRef = useRef(null);
  const [initialHeight, setInititalHeight] = useState(35.5);

  const onChange = (e) => {
    setValue(e.target.value);
    if (initialHeight < areaRef.current.scrollHeight) {
      setInititalHeight(areaRef.current.scrollHeight);
    }
  }
  const sendMessage = () => {
    onClick && onClick(value);
    setValue('');
    setInititalHeight(35.5);
  }
  const handleKey = (e) => {
    const { code } = e;
    if (code === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  }
  return (
    <InputChatUIStyle>
      <AreaStyle
        height={initialHeight}
        onChange={onChange}
        rows={1}
        ref={areaRef}
        value={value}
        onKeyDown={handleKey}
      ></AreaStyle>
      <ButtonStyle onClick={sendMessage}>
        <IconSend />
      </ButtonStyle>
    </InputChatUIStyle>
  );
};
