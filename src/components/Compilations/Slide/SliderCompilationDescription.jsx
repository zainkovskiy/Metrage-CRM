import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SliderTitle, SliderBlock } from '../../../styles/slider';
import { useAsyncValue } from 'react-router-dom';
import { ButtonUI } from 'ui/ButtonUI';
import { setNewComment } from '../../../api/compilationAPI';

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
  const [comment, setComment] = useState(compilation?.description || '');
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
  const handleClick = () => {
    if (!disabled) {
      setNewComment(compilation.UID, comment);
    }
    setDisabled(!disabled);
  };
  return (
    <SliderBlock>
      <SliderBlockContainer>
        <SliderTitle>Комментарий</SliderTitle>
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
