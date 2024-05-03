import React, { useEffect, useRef, useState } from 'react';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { getDealList } from 'api/search';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import styled from 'styled-components';

const DealFinderStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.primary};
  width: 60vw;
  @media (max-width: 480px) {
    width: 80vw;
  }
`;
const DealFindeHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DealFinderListStyle = styled.div`
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 5px;
  height: 250px;
  overflow: auto;
  padding: 0.5rem 0;
`;
const DealFinderItemStyle = styled.div`
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
const DealFinder = ({ onClose, onChange, title }) => {
  const [value, setValue] = useState('');
  const [dealList, setDealList] = useState([]);
  const [selectDeal, setSelectDeal] = useState(null);
  const inputRef = useRef(null);
  const sendRequest = useRef(false);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    if (!selectDeal) {
      return;
    }
    if (dealList.find((deal) => deal.UID === selectDeal.UID)) {
      return;
    }
    clearSelectDeal(null);
  }, [dealList]);
  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    if (value.length > 1) {
      if (sendRequest.current) {
        return;
      }
      sendRequest.current = true;
      getDealList(value)
        .then((res) => {
          setDealList(res);
        })
        .finally(() => {
          sendRequest.current = false;
        });
      return;
    }

    setDealList([]);
  };
  const changeDeal = (deal) => {
    setSelectDeal(deal);
  };
  const clearSelectDeal = () => {
    setSelectDeal(null);
  };
  const handleSelect = () => {
    if (selectDeal) {
      onChange(selectDeal);
    }
  };
  return (
    <DealFinderStyle>
      <DealFindeHeaderStyle>
        <TextSpanStyle>{title}</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} alt='close' onClick={onClose} />
      </DealFindeHeaderStyle>
      <InputUI
        fullWidth
        value={value}
        onChange={handleChange}
        width='300px'
        ref={inputRef}
      />
      <DealFinderListStyle>
        {dealList.length > 0 ? (
          dealList.map((deal) => (
            <DealFinderItemStyle
              $select={deal === selectDeal}
              key={deal.UID}
              onClick={() => changeDeal(deal)}
            >
              {deal.title}
            </DealFinderItemStyle>
          ))
        ) : (
          <DealFinderItemStyle>
            <em>Нет совпадений</em>
          </DealFinderItemStyle>
        )}
      </DealFinderListStyle>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <ButtonUI onClick={handleSelect}>Выбрать</ButtonUI>
        <ButtonUI onClick={clearSelectDeal} variant='outline'>
          Отменить
        </ButtonUI>
      </div>
    </DealFinderStyle>
  );
};

export default DealFinder;
