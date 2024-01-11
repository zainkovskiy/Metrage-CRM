import React, { useState } from 'react';
import styled from 'styled-components';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import closeUrl from 'images/close.svg';

const WindowPlanDateStyle = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const WindowPlanDateHeader = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
`;
const CloseButtonStyle = styled.img`
  width: 18px;
  height: 18px;
  opacity: 0.5;
  cursor: pointer;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
`;
const WindowPlanDate = ({ onClose, onChange }) => {
  const [date, setDate] = useState('');
  const clickSave = () => {
    if (date) {
      onChange(date);
    }
    onClose();
  };
  const changeDate = (e) => {
    setDate(e.target.value);
  };
  return (
    <WindowPlanDateStyle onClick={(e) => e.stopPropagation()}>
      <WindowPlanDateHeader>
        <TextSpanStyle>Отчетный период</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} alt='close' onClick={onClose} />
      </WindowPlanDateHeader>
      <InputUI type='month' value={date} onChange={changeDate} />
      <ButtonUI onClick={clickSave}>Сохранить</ButtonUI>
    </WindowPlanDateStyle>
  );
};

export default WindowPlanDate;
