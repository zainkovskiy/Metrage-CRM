import React, { useEffect, useRef, useState } from 'react';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import styled from 'styled-components';
import axios from 'axios';

const OfficeFinderStyle = styled.div`
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
const OfficeFinderListStyle = styled.div`
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 5px;
  height: 250px;
  overflow: auto;
  padding: 0.5rem 0;
`;
const OfficeFinderItem = styled.div`
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

const OfficeFinder = ({ onClose, onChange }) => {
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);
  const [selectOffice, setSelectOffice] = useState(null);
  const inputRef = useRef(null);
  const sendRequest = useRef(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    if (!selectOffice) {
      return;
    }
    if (list.find((item) => item.UID === selectOffice.UID)) {
      return;
    }
    clearSelectOffice(null);
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
        method: 'crm.dashboard.getOffices',
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
  const changeOffice = (user) => {
    setSelectOffice(user);
  };
  const clearSelectOffice = () => {
    setSelectOffice(null);
  };
  const handleSelect = () => {
    if (selectOffice) {
      onChange(selectOffice);
      onClose();
    }
  };
  return (
    <OfficeFinderStyle onClick={(e) => e.stopPropagation()}>
      <Header onClick={() => {}}>
        <TextSpanStyle>Выберете офис</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} alt='close' onClick={onClose} />
      </Header>
      <InputUI value={value} onChange={handleChange} ref={inputRef} fullWidth />
      <OfficeFinderListStyle>
        {list.length > 0 ? (
          list.map((item) => (
            <OfficeFinderItem
              $select={item === selectOffice}
              key={item.UID}
              onClick={() => changeOffice(item)}
            >
              {item.name}
            </OfficeFinderItem>
          ))
        ) : (
          <OfficeFinderItem>
            <em>Нет совпадений</em>
          </OfficeFinderItem>
        )}
      </OfficeFinderListStyle>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <ButtonUI onClick={handleSelect}>Выбрать</ButtonUI>
        <ButtonUI onClick={clearSelectOffice} variant='outline'>
          Отменить
        </ButtonUI>
      </div>
    </OfficeFinderStyle>
  );
};

export default OfficeFinder;
