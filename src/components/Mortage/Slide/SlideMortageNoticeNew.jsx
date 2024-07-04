import React, { useState } from 'react';
import styled from 'styled-components';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { SliderTitle } from 'styles/slider';
import { TextSpanStyle } from 'styles/styles';
import { InputUI } from 'ui/InputUI';
import { LabelStyle } from '../../../ui/InputUI/InputUIStyled';
const MortageNoticeNew = styled.div`
  padding: 0.5rem;
  width: 300px;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
  @media (max-width: 480px) {
    width: 90vw;
  }
`;
const TextAreaStyle = styled.textarea`
  border-radius: 5px;
  padding: 0.3rem;
  resize: none;
  font-family: ${({ theme }) => theme.font.family};
  border: 1px solid ${({ theme }) => theme.color.primary};
  width: 100%;
  box-sizing: border-box;
  outline: 1px solid transparent;
  transition: outline 0.3s;
  &:focus {
    outline: 1px solid ${({ theme }) => theme.color.primary};
  }
`;

const SlideMortageNoticeNew = ({ onClose, _add }) => {
  const [notify, setNotify] = useState({
    dueDate: '',
    notify: '',
  });
  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    setNotify((prevState) => ({ ...prevState, [id]: value }));
  };
  const handleAdd = () => {
    _add(notify);
  };
  return (
    <MortageNoticeNew onClick={(e) => e.stopPropagation()}>
      <SliderTitle>Добавить</SliderTitle>
      <InputUI
        small
        value={notify.dueDate}
        onChange={handleChange}
        label='Когда'
        type='datetime-local'
        id='dueDate'
      />
      <LabelStyle>
        Что сделать
        <TextAreaStyle
          rows={6}
          value={notify.notify}
          id='notify'
          onChange={handleChange}
        />
      </LabelStyle>
      <Box jc='flex-start'>
        <ButtonUI variant='outline' size='small' onClick={onClose}>
          Отменить
        </ButtonUI>
        <ButtonUI size='small' onClick={handleAdd}>
          Создать
        </ButtonUI>
      </Box>
    </MortageNoticeNew>
  );
};

export default SlideMortageNoticeNew;
