import React, { useEffect, useState } from 'react';
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
import { addNewNewsToList } from '../../../store/slices/newsSlice';
import { createNews, updateNews } from 'api/newsApi';
import { useAsyncValue } from 'react-router-dom';
import { device } from 'styles/device';

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
  @media ${device.tablet} {
    width: 150px;
    min-width: 150px;
    height: 100px;
  }
`;
const isJSON = (json) => {
  try {
    JSON.parse(json);
  } catch (error) {
    return false;
  }
  return true;
};
const getTemplate = (template) => {
  if (!template) {
    return null;
  }
  if (isJSON(template)) {
    return JSON.parse(template);
  }
};
const NewNews = ({ onClose }) => {
  const news = useAsyncValue() || null;
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.UID);
  const [url, setUrl] = useState(news?.imageUrl || null);
  const [title, setTitle] = useState(news?.title || '');
  const [editorText, setEditorText] = useState(
    getTemplate(news?.template || null)
  );
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
    if (news) {
      updateNews({
        ...newNews,
        UID: news?.UID,
      }).then((answer) => {
        if (answer === 'OK') {
          onClose(null, `/news/${news?.UID}`);
        }
      });
      return;
    }
    createNews(newNews).then((uid) => {
      if (uid) {
        dispatch(addNewNewsToList(uid));
      }
      onClose(null, `/news/${uid}`);
    });
  };
  const raw = { entityId: '', entityType: 'news', author: userId };
  return (
    <NewNewsStyle>
      <SliderTitle>{news ? 'Редакировать' : 'Создать'} новость</SliderTitle>
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
