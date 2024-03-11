import React, { useEffect, useState, useRef } from 'react';
import { SliderBlock } from '../../../styles/slider';
import styled from 'styled-components';
import closeUrl from 'images/close.svg';
import { Box } from '../../../ui/Box';
import { InputUI } from '../../../ui/InputUI';
import { ButtonUI } from '../../../ui/ButtonUI/ButtonUI';
import { TextSpanStyle } from '../../../styles/styles';
import {
  ButtonToggleGroup,
  ButtonToggleItem,
} from 'ui/ButtonToggle/ButtonToggle';
import {
  getObjectsConnectList,
  setObjectsConnect,
} from '../../../api/application';
import { useAsyncValue } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

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
const ConnectObjectItem = styled(motion.div)`
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
  const [selectType, setSelectType] = useState('object');
  const [selectObject, setSelectObject] = useState(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  const getConnectList = (value) => {
    if (reqRef.current) {
      reqRef.current = false;
      getObjectsConnectList(value, selectType)
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
    }).then((object) => {
      application.object = object;
      onClose('new');
    });
  };
  const handlerType = (e) => {
    const newType = e.target.id;
    setSelectType(newType);
  };
  return (
    <ConnectObject onClick={(e) => e.stopPropagation()}>
      <Box jc='space-between'>
        <TextSpanStyle>Выберите объект</TextSpanStyle>
        <CloseButtonStyle src={closeUrl} alt='close' onClick={onClose} />
      </Box>
      <ConnectObjectContent>
        <ButtonToggleGroup fullWidth>
          <ButtonToggleItem
            onClick={handlerType}
            id='object'
            active={selectType}
          >
            Объект
          </ButtonToggleItem>
          <ButtonToggleItem onClick={handlerType} id='jk' active={selectType}>
            ЖК
          </ButtonToggleItem>
        </ButtonToggleGroup>
        <InputUI value={value} onChange={handleChange} small ref={inputRef} />
        <ObjectsContainer>
          <AnimatePresence>
            {list.map((object, idx) => (
              <ConnectObjectItem
                key={`${object.objUID} + ${idx}`}
                $select={
                  selectObject?.objUID === object.objUID &&
                  selectObject?.type === object.type
                }
                onClick={() => choiseObject(object)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <TextSpanStyle size={10}>
                  {typeTranslate[object.type]}
                </TextSpanStyle>
                <TextSpanStyle size={12}>{object.title}</TextSpanStyle>
              </ConnectObjectItem>
            ))}
          </AnimatePresence>
        </ObjectsContainer>
      </ConnectObjectContent>
      <Box jc='flex-start'>
        <ButtonUI size='small' variant='outline' onClick={onClose}>
          Закрыть
        </ButtonUI>
        <ButtonUI size='small' disabled={!selectObject} onClick={setConnect}>
          Сохранить
        </ButtonUI>
      </Box>
    </ConnectObject>
  );
};

const typeTranslate = {
  live: 'Жилая',
  business: 'Коммерческая',
  jk: 'ЖК',
};

export default ApplicationConnectObject;
