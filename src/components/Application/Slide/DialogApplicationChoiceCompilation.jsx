import React from 'react';
import { useAsyncValue } from 'react-router-dom';
import { TextSpanStyle } from '../../../styles/styles';
import styled from 'styled-components';
import { SliderTitle } from '../../../styles/slider';
import { Box } from 'ui/Box';
import { ButtonUI } from 'ui/ButtonUI';

const ChoiceCompilation = styled.div`
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const CompilationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 80vh;
  min-width: 300px;
  overflow: auto;
`;
const CompilationItem = styled.div`
  padding: 0.5rem;
  border-radius: 5px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  min-width: 300px;
  max-width: 100vw;
  transition: background-color 0.3s;
  &:hover {
    background-color: #eee;
  }
  &:active {
    background-color: #fff;
  }
`;

const DialogApplicationChoiceCompilation = ({
  setChangeCompilation,
  onClose,
}) => {
  const application = useAsyncValue();
  const handleClick = (id) => {
    setChangeCompilation(id);
    onClose();
  };
  return (
    <ChoiceCompilation onClick={(e) => e.stopPropagation()}>
      <SliderTitle>Подборки</SliderTitle>
      <CompilationList>
        {application.selections.length > 0 ? (
          <>
            {application.selections.map((selection) => (
              <CompilationItem
                onClick={() => {
                  handleClick(selection.UID);
                }}
                key={selection.UID}
              >
                <TextSpanStyle size={10}>
                  Создана: {selection.created}
                </TextSpanStyle>
                <TextSpanStyle size={12}>
                  Подборка № {selection.UID}
                </TextSpanStyle>
                <TextSpanStyle size={10}>
                  Количество объектов: {selection.objects.length}
                </TextSpanStyle>
              </CompilationItem>
            ))}
          </>
        ) : (
          <TextSpanStyle size={12}>Нет подборок</TextSpanStyle>
        )}
      </CompilationList>
      <Box jc='flex-start'>
        <ButtonUI size='small' onClick={onClose}>
          Закрыть
        </ButtonUI>
      </Box>
    </ChoiceCompilation>
  );
};

export default DialogApplicationChoiceCompilation;
