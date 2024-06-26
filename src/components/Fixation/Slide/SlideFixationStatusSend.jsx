import React, { useState } from 'react';
import * as S from './slideSlide';

import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';
import { InputUI } from 'ui/InputUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { TextSpanStyle } from 'styles/styles';

const SlideFixationStatusSend = ({ onClose, setSendStatus }) => {
  const [sendet, setSendet] = useState('');
  const [sendetAt, setSendetAt] = useState('');
  const [error, setError] = useState({
    sendet: false,
    sendetAt: false,
  });
  const handleChangeSendet = (e) => {
    setSendet(e.target.value);
    if (error.sendet) {
      setError((prevState) => ({ ...prevState, sendet: false }));
    }
  };
  const handleChangeSendetAt = (e) => {
    setSendetAt(e);
    if (error.sendetAt) {
      setError((prevState) => ({ ...prevState, sendetAt: false }));
    }
  };
  const isValid = () => {
    let valid = true;
    if (!sendet) {
      setError((prevState) => ({ ...prevState, sendet: true }));
      valid = false;
    }
    if (!sendetAt) {
      setError((prevState) => ({ ...prevState, sendetAt: true }));
      valid = false;
    }
    return valid;
  };
  const handleSend = () => {
    if (isValid()) {
      setSendStatus({
        sendet: sendet,
        sendetAt: sendetAt,
      });
    }
  };
  return (
    <S.SlideFixationStatusSend>
      <TextSpanStyle color='#7c7777'>Отправка</TextSpanStyle>
      <InputUI
        name='sendet'
        small
        value={sendet}
        onChange={handleChangeSendet}
        label='Дата отправки'
        type='date'
        error={error.sendet}
      />
      <SelectUI
        small
        onChange={handleChangeSendetAt}
        select={sendetAt}
        label='Канал'
        name='sendetAt'
        error={error.sendetAt}
      >
        <SelectItemUI value='1'>Хер знает</SelectItemUI>
        <SelectItemUI value='2'>Что должно быть</SelectItemUI>
      </SelectUI>

      <Box>
        <ButtonUI fullWidth size='small' variant='outline' onClick={onClose}>
          Отменить
        </ButtonUI>
        <ButtonUI fullWidth size='small' onClick={handleSend}>
          Отправить
        </ButtonUI>
      </Box>
    </S.SlideFixationStatusSend>
  );
};

export default SlideFixationStatusSend;
