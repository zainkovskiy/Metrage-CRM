import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import { TextSpanStyle } from 'styles/styles';
import { SliderTitle } from '../../../styles/slider';
import imgErrorUrl from 'images/img-error.svg';
import TextEditor from './TextEditor';
import UploderFiles from '../../Main/UploderFiles';
import { addNewNews } from '../../../store/slices/newsSlice';

const NewNewsStyle = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  box-sizing: border-box;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const TitleImage = styled.img`
  width: 200px;
  min-width: 200px;
  height: 150px;
  object-fit: cover;
  border-radius: 5px;
`;
const NewNews = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.UID);
  const [url, setUrl] = useState(null);
  const [title, setTitle] = useState('');
  const [editorText, setEditorText] = useState(null);
  const handleChangeTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
  };
  const uploadFiles = (file) => {
    const photo = file[0];
    if (photo) {
      setUrl(photo?.downloadUrl || null);
    }
  };
  const handleChangeTextEditor = (value) => {
    setEditorText(value);
  };
  const onSave = () => {
    const newNews = {
      title: title,
      imageUrl: url,
      template: JSON.stringify(editorText),
    };
    console.log(newNews);
    dispatch(addNewNews(newNews));
  };
  const raw = { entityId: '', entityType: 'news', author: userId };
  return (
    <NewNewsStyle>
      <SliderTitle>Создать новость</SliderTitle>
      <InputUI
        value={title}
        onChange={handleChangeTitle}
        small
        label='Название'
      />
      <Box gap='0.2rem' column ai='normal'>
        <TextSpanStyle>Титульная фотография</TextSpanStyle>
        <Box fullWidth>
          <UploderFiles
            raw={raw}
            fullWidth
            callback={uploadFiles}
            height='100%'
          />
          <TitleImage src={url || imgErrorUrl} />
        </Box>
      </Box>
      <TextEditor value={editorText} onChange={handleChangeTextEditor} />
      <ButtonUI onClick={onSave}>Сохранить</ButtonUI>
    </NewNewsStyle>
  );
};

export default NewNews;
