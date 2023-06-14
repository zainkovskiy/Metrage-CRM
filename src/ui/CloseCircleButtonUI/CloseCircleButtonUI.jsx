import React from 'react';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import styled from 'styled-components';

const CloseButtonStyle = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  align-self: flex-start;
  padding: 0.5rem;
  border-radius: 20px 0 0 20px;
`

const CloseButtonCircle = styled.div`
  padding: 0.5rem;
  border: 1px solid transparent;
  border-radius: 40px;
  display: flex;
  cursor: pointer;
  transition: border .3s, transform .3s;
  &:hover{
    border: 1px solid #fff;
  }
  &:active{
    transform: scale(0.9);
  }
`

const CloseButtonIcon = styled(Close)`
  fill: #fff;
  width: 20px;
  height: 20px;
`

export const CloseCircleButtonUI = ({ onClose }) => {
  return (
    <CloseButtonStyle onClick={onClose}>
      <CloseButtonCircle >
        <CloseButtonIcon />
      </CloseButtonCircle>
    </CloseButtonStyle>
  );
};
