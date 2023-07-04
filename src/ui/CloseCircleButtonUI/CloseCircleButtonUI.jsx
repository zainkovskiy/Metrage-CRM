import React from 'react';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import styled from 'styled-components';
import { useWindowSize } from 'hooks/windowSize';

const CloseButtonStyle = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  align-self: flex-start;
  ${({$notMobile}) => $notMobile && 'padding: 0.5rem; border-radius: 20px 0 0 20px;'};
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
const CloseCircleButtonUI = ({ onClose }) => {
  const windowSize = useWindowSize();
  return (
    <CloseButtonStyle onClick={onClose} $notMobile={windowSize > 425}>
      <CloseButtonCircle $mobile={windowSize <= 425}>
        <CloseButtonIcon />
      </CloseButtonCircle>
    </CloseButtonStyle>
  );
};

export default CloseCircleButtonUI;
