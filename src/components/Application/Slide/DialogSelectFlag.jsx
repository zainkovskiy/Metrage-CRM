import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Close } from 'images/close.svg';
import { ReactComponent as Flag } from 'images/demands-flag.svg';
import { ButtonUI } from 'ui/ButtonUI';
import { useAsyncValue } from 'react-router-dom';
import { setSelectFlag } from '../../../api/application';

const DialogSelectFlagStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.primary};
`;
const DialogSelectFlagHeaderStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const CloseButtonStyle = styled(Close)`
  ${({ disabled }) => disabled && 'pointer-events: none'};
  width: 18px;
  height: 18px;
  opacity: ${({ disabled }) => (disabled ? '.2' : '.5')};
  cursor: pointer;
  transition: transform 0.3s, fill 0.3s;
  &:hover {
    fill: red;
  }
  &:active {
    transform: scale(0.7);
  }
`;
const IconFlags = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;
const IconFlagContainer = styled.div`
  padding: 0.5rem;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s;
  @media (hover: hover) {
    &:hover {
      transform: scale(1.1);
    }
    &:active {
      transform: scale(0.9);
    }
  }
  @media (hover: none) {
    &:active {
      transform: scale(0.9);
    }
  }
`;
const IconFlag = styled(Flag)`
  width: 40px;
  height: 40px;
  cursor: pointer;
  pointer-events: none;
  fill: ${({ $flagColour }) => $flagColour && $flagColour};
`;

const DialogSelectFlag = ({ onClose }) => {
  const application = useAsyncValue();
  const selectFlag = (color, idx) => {
    application.demand.flagColour = color;
    setSelectFlag({
      UID: application.UID,
      flagId: idx,
    }).finally(() => {
      onClose();
    });
  };
  return (
    <DialogSelectFlagStyle onClick={(e) => e.stopPropagation()}>
      <DialogSelectFlagHeaderStyle>
        <CloseButtonStyle onClick={onClose} />
      </DialogSelectFlagHeaderStyle>
      <IconFlags>
        {application.demand.flagList.map((colorFlag, idx) => (
          <IconFlagContainer
            key={colorFlag}
            onClick={() => selectFlag(colorFlag, idx)}
          >
            <IconFlag $flagColour={colorFlag} />
          </IconFlagContainer>
        ))}
      </IconFlags>
      <div>
        <ButtonUI onClick={onClose} variant='outline'>
          Закрыть
        </ButtonUI>
      </div>
    </DialogSelectFlagStyle>
  );
};

export default DialogSelectFlag;
