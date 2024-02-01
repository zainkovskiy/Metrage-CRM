import React, { useState } from 'react';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { useAsyncValue } from 'react-router-dom';
import { device } from 'styles/device';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { updateResidential } from '../../../api/residential';

const EditText = styled.form`
  padding: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
  width: 60vw;
  height: 60vh;
  @media ${device.tablet} {
    width: calc(100vw - 1rem);
  }
`;
const EditTextArea = styled.textarea`
  resize: none;
  border-radius: 5px;
  border: 1px solid #ccc;
  outline: none;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  padding: 0.5rem;
  box-sizing: border-box;
  height: 100%;
`;

const DialogEditText = ({ onClose, source }) => {
  const residential = useAsyncValue();
  const [text, setText] = useState(residential[source] || '');
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const saveChange = () => {
    updateResidential({
      ...residential,
      [source]: text,
    }).then(() => {
      residential[source] = text;
      onClose();
    });
  };
  return (
    <EditText onClick={(e) => e.stopPropagation()}>
      <SliderTitle>Редактировать {titleText[source]}</SliderTitle>
      <EditTextArea value={text} onChange={handleChange} />
      <Box jc='flex-start'>
        <ButtonUI variant='outline' size='small' onClick={onClose}>
          Отменить
        </ButtonUI>
        <ButtonUI size='small' onClick={saveChange}>
          Сохранить
        </ButtonUI>
      </Box>
    </EditText>
  );
};

const titleText = {
  description: 'описание',
  overestimation: 'завышение',
  repair: 'ремонт',
};

export default DialogEditText;
