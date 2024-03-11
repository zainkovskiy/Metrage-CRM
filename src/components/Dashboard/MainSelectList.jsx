import React, { useEffect, useRef, useState } from 'react';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import styled from 'styled-components';
import axios from 'axios';

const MainSelectStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.primary};
  min-width: 330px;
  box-sizing: border-box;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const MainSelectListStyle = styled.div`
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 5px;
  height: 250px;
  overflow: auto;
  padding: 0.5rem 0;
`;
const MainSelectItem = styled.div`
  padding: 0.5rem;
  font-size: 14px;
  font-family: CeraCY, sans-serif;
  cursor: pointer;
  background-color: ${({ $select }) => ($select ? '#84019e4a' : '#fff')};
  &:hover {
    background-color: ${({ $select }) =>
      $select ? 'rgb(132 1 158 / 43%)' : 'rgb(249 245 245)'};
  }
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

const MainSelectList = ({ source, onClose, onChange }) => {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);
  const [selectUser, setSelectUser] = useState(null);
  const inputRef = useRef(null);
  const sendRequest = useRef(false);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    if (source === 'office') {
      getList();
    }
  }, []);
  useEffect(() => {
    if (!selectUser) {
      return;
    }
    if (list.find((item) => item.UID === selectUser.UID)) {
      return;
    }
    clearSelectUser(null);
  }, [list]);
  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    if (value.length > 2) {
      if (sendRequest.current) {
        return;
      }
      sendRequest.current = true;
      getList(value);
      return;
    }

    setList([]);
  };
  const getList = async (reqValue) => {
    try {
      const res = await axios.post(process.env.MAIN_API, {
        metrage_id: metrage_id || null,
        method:
          source === 'user'
            ? 'crm.dashboard.getUsers'
            : 'crm.dashboard.getOffices',
        fields: {
          req: reqValue,
        },
      });
      if (res?.statusText === 'OK') {
        setList(res?.data?.result || []);
        return;
      }
    } catch (error) {
      setList([]);
    } finally {
      sendRequest.current = false;
    }
  };
  const changeUser = (user) => {
    setSelectUser(user);
  };
  const clearSelectUser = () => {
    setSelectUser(null);
  };
  const handleSelect = () => {
    if (selectUser) {
      onChange({
        select: selectUser,
        source: source,
      });
      onClose();
    }
  };
  return (
    <MainSelectStyle onClick={(e) => e.stopPropagation()}>
      <Header onClick={() => {}}>
        <TextSpanStyle>
          Выберите {source === 'user' ? 'пользователя' : 'офис'}
        </TextSpanStyle>
        <CloseButtonStyle src={closeUrl} alt='close' onClick={onClose} />
      </Header>
      {source === 'user' && (
        <InputUI
          value={value}
          onChange={handleChange}
          ref={inputRef}
          fullWidth
        />
      )}
      <MainSelectListStyle>
        {list.length > 0 ? (
          list.map((item) => (
            <MainSelectItem
              $select={item === selectUser}
              key={item.UID}
              onClick={() => changeUser(item)}
            >
              {source === 'user'
                ? `${item.lastName} ${item.firstName}`
                : `${item.name}`}
            </MainSelectItem>
          ))
        ) : (
          <MainSelectItem>
            <em>Нет совпадений</em>
          </MainSelectItem>
        )}
      </MainSelectListStyle>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <ButtonUI onClick={handleSelect}>Выбрать</ButtonUI>
        <ButtonUI onClick={clearSelectUser} variant='outline'>
          Отменить
        </ButtonUI>
      </div>
    </MainSelectStyle>
  );
};

export default MainSelectList;
