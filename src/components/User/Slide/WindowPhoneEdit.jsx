import React, { useEffect, useRef, useState } from 'react';
import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import { device } from '../../../styles/device';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { addNewPhone, updatePhone } from '../../../api/usersApi';

const SlideWindowPasswordStyle = styled.div`
  padding: 0.5rem;
  width: 40vw;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 5px;
  box-sizing: border-box;
  @media (${device.tablet}) {
    width: 90vw;
  }
`;

const WindowPhoneEdit = ({ UID, onClose, curPhone, updateEditPhone }) => {
  const [phone, setPhone] = useState(curPhone.phone || '');
  const [loading, setLoading] = useState(false);
  const curPhoneRef = useRef(curPhone.phone);
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const setNewPhone = () => {
    if (phone.length < 11) {
      return;
    }
    if (curPhoneRef.current === phone) {
      return;
    }
    setLoading(true);
    updatePhone({
      UID: UID,
      phone: phone,
      phoneId: curPhone.UID,
    })
      .then(() => {
        updateEditPhone({
          ...curPhone,
          phone: phone,
        });
      })
      .finally(() => {
        onClose();
      });
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setPhone(value);
  };
  return (
    <SlideWindowPasswordStyle onClick={(e) => e.stopPropagation()}>
      <Box column ai='flex-start' gap='0' fullWidth>
        <InputUI
          value={phone}
          onChange={handleChange}
          fullWidth
          disabled={loading}
          label='Номер телефона'
          type='number'
          ref={inputRef}
        />
        <TextSpanStyle size={10}>Пример: 8ХХХХХХХХХХ</TextSpanStyle>
      </Box>
      <Box jc='flex-start'>
        <ButtonUI
          variant='outline'
          onClick={onClose}
          size='small'
          disabled={loading}
        >
          Закрыть
        </ButtonUI>
        <ButtonUI size='small' onClick={setNewPhone} disabled={loading}>
          Сохранить
        </ButtonUI>
      </Box>
    </SlideWindowPasswordStyle>
  );
};

export default WindowPhoneEdit;
