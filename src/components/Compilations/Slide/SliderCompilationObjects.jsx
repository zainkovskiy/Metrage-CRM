import React, { useState } from 'react';
import { SliderBlock, SliderTitle } from '../../../styles/slider';
import { useAsyncValue } from 'react-router-dom';
import styled from 'styled-components';
import SliderCompilationObject from './SliderCompilationObject';
import { ButtonLink } from 'ui/ButtonLink';
import { useDispatch } from 'react-redux';
import {
  removeCompilationItem,
  removeCompilation,
} from '../../../store/compilationSlice';

const SliderObjects = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;
`;

const SliderCompilationObjects = ({ onClose }) => {
  const dispatch = useDispatch();
  const [compilation, setObjects] = useState(useAsyncValue());
  const removeThisCompilation = () => {
    dispatch(removeCompilation(compilation.UID))
      .unwrap()
      .then((answer) => {
        if (answer === 'OK') {
          onClose();
        }
      });
  };

  const removeItem = (object) => {
    dispatch(removeCompilationItem(object.UID))
      .unwrap()
      .then((answer) => {
        if (answer !== 'OK') {
          return;
        }
        if (compilation?.objects?.length > '1') {
          setObjects((prevState) => ({
            ...prevState.objects,
            objects: prevState.objects.filter(
              (item) => item.UID !== object.UID
            ),
          }));
          return;
        }
        onClose();
      });
  };
  return (
    <SliderBlock>
      <SliderObjects>
        <SliderTitle>
          Объекты
          <ButtonLink onClick={removeThisCompilation} size={12} id='basket'>
            Удалить подборку
          </ButtonLink>
        </SliderTitle>
        <SliderObjects>
          {compilation.objects.map((item) => (
            <SliderCompilationObject
              removeItem={removeItem}
              key={item.UID}
              object={item}
            />
          ))}
        </SliderObjects>
      </SliderObjects>
    </SliderBlock>
  );
};

export default SliderCompilationObjects;
