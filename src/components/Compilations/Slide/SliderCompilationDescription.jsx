import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SliderTitle, SliderBlock } from '../../../styles/slider';
import { useAsyncValue } from 'react-router-dom';
import { ButtonUI } from 'ui/ButtonUI';
import { SelectUI, SelectItemUI } from 'ui/SelectUI/SelectUI';
import { setNewComment } from '../../../api/compilationAPI';
import { getObjectsConnectList } from '../../../api/application';
import { SelectAutoсompleteUI } from 'ui/SelectAutoсompleteUI';

const SliderBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const TextAreaContainer = styled.div`
  height: 100%;
  border: 1px solid transparent;
  border-radius: 6px;
  display: flex;
  &:has(textarea:focus) {
    border: 1px solid ${({ theme }) => theme.color.primary};
  }
`;
const TextAreaStyle = styled.textarea`
  resize: none;
  padding: 0.5rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.color.primary};
  outline: none;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  outline: none;
`;

const SliderCompilationDescription = () => {
  const compilation = useAsyncValue();
  const reqRef = useRef(false);
  const [comment, setComment] = useState(compilation?.description || '');
  const [type, setType] = useState(compilation?.presType || 'Обычный');
  const [jk, setJK] = useState(null);
  const [listJK, setListJK] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const AreaRef = useRef(null);
  useEffect(() => {
    if (disabled) {
      return;
    }
    if (AreaRef.current) {
      AreaRef.current.focus();
    }
  }, [disabled]);

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  const handleChangeType = (newValue) => {
    setType(newValue);
    //TODO: не срабатывает хз почему
    // if (newValue === 'Обычный' && jk) {
    //   setJK(null);
    //   setListJK([]);
    // }
  };
  const handleJK = (newJK) => {
    setJK(newJK);
  };
  const getConnectList = (value) => {
    if (value.length < 2) {
      setListJK([]);
      return;
    }
    if (reqRef.current) {
      return;
    }
    reqRef.current = true;
    getObjectsConnectList(value, 'jk')
      .then((data) => {
        setListJK(data);
        console.log(data);
      })
      .finally(() => {
        reqRef.current = false;
      });
  };
  const handleClick = () => {
    if (!disabled) {
      setNewComment({
        UID: compilation.UID,
        comment: comment,
        presType: type,
        buildingId: jk,
      });
    }
    setDisabled(!disabled);
  };
  return (
    <SliderBlock>
      <SliderBlockContainer>
        <SliderTitle>Параметры</SliderTitle>
        <SelectUI
          small
          onChange={handleChangeType}
          select={type}
          label='Тип презентации'
          disabled={disabled}
        >
          <SelectItemUI value='Обычный'>Обычный</SelectItemUI>
          <SelectItemUI value='ЖК/БЦ'>ЖК/БЦ</SelectItemUI>
        </SelectUI>
        <SelectAutoсompleteUI
          small
          label='ЖК/БЦ'
          options={listJK}
          getOptionsLabel={(options) => options.title}
          onChange={handleJK}
          value={jk}
          inputChange={getConnectList}
          disabled={type !== 'ЖК/БЦ' || disabled}
        />
        <TextAreaContainer>
          <TextAreaStyle
            disabled={disabled}
            value={comment}
            onChange={handleChange}
            rows={5}
            ref={AreaRef}
          />
        </TextAreaContainer>
        <ButtonUI size='small' onClick={handleClick}>
          {disabled ? 'Редактировать' : 'Сохранить'}
        </ButtonUI>
      </SliderBlockContainer>
    </SliderBlock>
  );
};

export default SliderCompilationDescription;
