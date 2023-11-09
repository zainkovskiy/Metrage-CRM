import React, { useEffect, useRef, useState } from 'react';
import { getPassword, saveNewPassword } from '../../../api/usersApi';
import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import { device } from '../../../styles/device';

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

const WindowPassword = ({ UID, onClose }) => {
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(true);
  const curPass = useRef(null);

  useEffect(() => {
    getPass();
  }, []);
  const getPass = () => {
    getPassword(UID)
      .then((res) => {
        setPass(res?.pass);
        curPass.current = res?.pass;
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const setNewPass = () => {
    if (pass.length < 6) {
      return;
    }
    if (curPass?.current === pass) {
      return;
    }
    setLoading(true);
    saveNewPassword(UID, pass).finally(() => {
      onClose();
    });
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setPass(value);
  };
  return (
    <SlideWindowPasswordStyle onClick={(e) => e.stopPropagation()}>
      <TextSpanStyle>Пароль</TextSpanStyle>
      <Box column ai='flex-start' gap='0' fullWidth>
        <InputUI
          value={pass}
          onChange={handleChange}
          fullWidth
          disabled={loading}
        />
        <TextSpanStyle size={10}>Не менее 6 символом</TextSpanStyle>
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
        <ButtonUI size='small' onClick={setNewPass} disabled={loading}>
          Сохранить
        </ButtonUI>
      </Box>
    </SlideWindowPasswordStyle>
  );
};

export default WindowPassword;
