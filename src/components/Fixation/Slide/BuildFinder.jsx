import React, { useEffect, useRef, useState } from 'react';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { getJKByReq, getDeveloperByReq } from 'api/search';
import closeUrl from 'images/close.svg';
import styled from 'styled-components';

const BuildFinderStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background-color: #fff;
  border-radius: 5px;
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.color.primary};
`;
const BuildFindeHeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BuildFinderListStyle = styled.div`
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 5px;
  height: 250px;
  overflow: auto;
  padding: 0.5rem 0;
`;
const BuildFinderItemStyle = styled.div`
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
const BuildFinder = ({ onClose, onChange, title, target }) => {
  const [value, setValue] = useState('');
  const [buildList, setBuildList] = useState([]);
  const [selectBuild, setBuildUser] = useState(null);
  const inputRef = useRef(null);
  const sendRequest = useRef(false);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    if (!selectBuild) {
      return;
    }
    if (buildList.find((user) => user.UID === selectBuild.UID)) {
      return;
    }
    clearSelectUser(null);
  }, [buildList]);
  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    if (value.length > 1) {
      if (sendRequest.current) {
        return;
      }
      sendRequest.current = true;
      if (target === 'jk') {
        getJKByReq(value)
          .then((res) => {
            setBuildList(res);
          })
          .finally(() => {
            sendRequest.current = false;
          });
      }
      if (target === 'developer') {
        getDeveloperByReq(value)
          .then((res) => {
            setBuildList(res);
          })
          .finally(() => {
            sendRequest.current = false;
          });
      }
      return;
    }
    setBuildList([]);
  };
  const changeUser = (user) => {
    setBuildUser(user);
  };
  const clearSelectUser = () => {
    setBuildUser(null);
  };
  const handleSelect = () => {
    if (selectBuild) {
      onChange(selectBuild);
    }
  };
  return (
    <BuildFinderStyle>
      <BuildFindeHeaderStyle>
        <TextSpanStyle>{title}</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} alt='close' onClick={onClose} />
      </BuildFindeHeaderStyle>
      <InputUI
        value={value}
        onChange={handleChange}
        width='300px'
        ref={inputRef}
      />
      <BuildFinderListStyle>
        {buildList.length > 0 ? (
          buildList.map((build) => (
            <BuildFinderItemStyle
              $select={build === selectBuild}
              key={build.UID}
              onClick={() => changeUser(build)}
            >
              {target === 'jk' ? build.name : build.devName}
            </BuildFinderItemStyle>
          ))
        ) : (
          <BuildFinderItemStyle>
            <em>Нет совпадений</em>
          </BuildFinderItemStyle>
        )}
      </BuildFinderListStyle>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <ButtonUI onClick={handleSelect}>Выбрать</ButtonUI>
        <ButtonUI onClick={clearSelectUser} variant='outline'>
          Отменить
        </ButtonUI>
      </div>
    </BuildFinderStyle>
  );
};

export default BuildFinder;
