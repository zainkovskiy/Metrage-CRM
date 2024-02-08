import React, { useEffect, useState } from 'react';
import { SliderBlock } from '../../../styles/slider';
import styled from 'styled-components';
import closeUrl from 'images/close.svg';
import { Box } from '../../../ui/Box';
import { InputUI } from '../../../ui/InputUI';
import { ButtonUI } from '../../../ui/ButtonUI/ButtonUI';
import { TextSpanStyle } from '../../../styles/styles';
import { useRef } from 'react';
import {
  getObjectsConnectList,
  setObjectsConnect,
} from '../../../api/application';
import { useAsyncValue } from 'react-router-dom';

const ConnectObject = styled(SliderBlock)`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 300px;
  height: 60vh;
`;
const ConnectObjectContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;
`;
const ObjectsContainer = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const ConnectObjectItem = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ $select }) => $select && '#fbe8ff'};
  transition: background-color 0.3s;
  @media (hover: hover) {
    &:hover {
      background-color: #ccc;
    }
    &:active {
      background-color: #fff;
    }
  }
  @media (hover: none) {
    &:active {
      background-color: #ccc;
    }
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
const ApplicationConnectObject = ({ onClose }) => {
  const application = useAsyncValue();
  const reqRef = useRef(true);
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  const [list, setList] = useState([]);
  const [selectObject, setSelectObject] = useState(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const getConnectList = (value) => {
    if (reqRef.current) {
      reqRef.current = false;
      getObjectsConnectList(value)
        .then((data) => {
          setList(data);
        })
        .finally(() => {
          reqRef.current = true;
        });
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setValue(value);
    if (value.length > 2) {
      getConnectList(value);
    } else {
      list?.length > 0 && setList([]);
    }
  };
  const choiseObject = (object) => {
    setSelectObject(object);
  };
  const setConnect = () => {
    setObjectsConnect({
      UID: application.UID,
      objUID: selectObject.objUID,
      type: selectObject.type,
    });
    application.object = selectObject;
    onClose();
  };
  return (
    <ConnectObject onClick={(e) => e.stopPropagation()}>
      <Box jc='space-between'>
        <TextSpanStyle>Выберете объект</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} alt='close' onClick={onClose} />
      </Box>
      <ConnectObjectContent>
        <InputUI value={value} onChange={handleChange} small ref={inputRef} />
        <ObjectsContainer>
          {list.map((object, idx) => (
            <ConnectObjectItem
              key={`${object.objUID} + ${idx}`}
              $select={
                selectObject?.objUID === object.objUID &&
                selectObject?.type === object.type
              }
              onClick={() => choiseObject(object)}
            >
              <TextSpanStyle size={10}>{object.type}</TextSpanStyle>
              <TextSpanStyle size={12}>{object.title}</TextSpanStyle>
            </ConnectObjectItem>
          ))}
        </ObjectsContainer>
      </ConnectObjectContent>
      <Box jc='flex-start'>
        <ButtonUI size='small' variant='outline' onClose={onClose}>
          Закрыть
        </ButtonUI>
        <ButtonUI size='small' disabled={!selectObject} onClick={setConnect}>
          Сохранить
        </ButtonUI>
      </Box>
    </ConnectObject>
  );
};

export default ApplicationConnectObject;
