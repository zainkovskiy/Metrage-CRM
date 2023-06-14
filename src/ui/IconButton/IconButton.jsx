import React from 'react';
import styled from 'styled-components';


const IconButtonStyle = styled.div`
  padding: 0.2rem;
  background-color: transparent;
  border-radius: 40px;
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color .3s;
  ${({ $sp }) => $sp && {...$sp}}
  &:hover{
    background-color: #84019e2b;
  }
  &:active{
    background-color: #fff;
  }
  & > svg {
    fill: ${({ theme }) => theme.color.primary};
    width: 14px;
    height: 14px;
    pointer-events: none;
  }
`
export const IconButton = ({ children, sp, onClick }) => {
  return (
    <IconButtonStyle $sp={sp} onClick={onClick}>
      {children}
    </IconButtonStyle>
  );
};
