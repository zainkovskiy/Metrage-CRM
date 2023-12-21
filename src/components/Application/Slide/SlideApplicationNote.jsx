import React, { useState } from 'react';
import { ApplicationBlockStyle } from '../applicationStyle';
import { SliderTitle } from '../../../styles/slider';
import { useAsyncValue } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import styled from 'styled-components';
import { ButtonLink } from 'ui/ButtonLink';
import DialogWindow from 'components/Main/DialogWindow';
import ApplicationEditNote from './ApplicationEditNote';

const Comment = styled(TextSpanStyle)`
  border-radius: 5px;
  padding: 0.5rem;
  background-color: #ccc;
  box-sizing: border-box;
  width: 100%;
  flex-grow: 1;
  max-height: 100px;
  overflow: auto;
`;

const SlideApplicationNote = () => {
  const application = useAsyncValue();
  const [isEditNote, setEditNote] = useState(false);
  const toggleEditNote = () => {
    setEditNote(!isEditNote);
  };
  return (
    <>
      <ApplicationBlockStyle $column jc='flex-start'>
        <SliderTitle>
          Примечания
          <ButtonLink size={12} color='#84019e' onClick={toggleEditNote}>
            Редактировать
          </ButtonLink>
        </SliderTitle>
        <Comment size={12}>{application?.bigComment}</Comment>
      </ApplicationBlockStyle>
      <DialogWindow open={isEditNote} onClose={toggleEditNote}>
        <ApplicationEditNote onClose={toggleEditNote} />
      </DialogWindow>
    </>
  );
};

export default SlideApplicationNote;
