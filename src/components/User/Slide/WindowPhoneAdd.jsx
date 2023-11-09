import React, { useRef, useState, useEffect } from 'react';
import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import { device } from '../../../styles/device';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { addNewPhone } from '../../../api/usersApi';

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

const WindowPhoneAdd = ({ UID, onClose, addPhoneToList }) => {
  const [phone, setPhone] = useState('');
  const [phoneType, setPhoneType] = useState('');
  const [loading, setLoading] = useState(false);
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
    if (!phoneType) {
      return;
    }
    setLoading(true);
    addNewPhone({
      UID: UID,
      phone: phone,
      phoneType: phoneType,
    })
      .then((newPhone) => {
        addPhoneToList(newPhone);
      })
      .finally(() => {
        onClose();
      });
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setPhone(value);
  };
  const setType = (type) => {
    setPhoneType(type);
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
      <SelectUI
        select={phoneType}
        onChange={setType}
        label='Тип'
        disabled={loading}
      >
        <SelectItemUI value='domclick'>Домклик</SelectItemUI>
        <SelectItemUI value='other'>Дополнительный</SelectItemUI>
      </SelectUI>
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

export default WindowPhoneAdd;
