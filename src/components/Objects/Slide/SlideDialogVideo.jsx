import React, { useState } from 'react';
import { useAsyncValue } from 'react-router-dom';
import { Box } from 'ui/Box';
import { InputUI } from 'ui/InputUI';
import { ButtonUI } from 'ui/ButtonUI';
import styled from 'styled-components';
import { setNewVideo } from '../../../api/objectAPI';

const SlideDialogVideoStyle = styled.div`
  padding: 1rem;
  background-color: #fff;
  border-radius: 5px;
  width: 50vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const InputWrap = styled.div`
  display: flex;
  gap: 0.5rem;
`;
const IframeStyle = styled.iframe`
  border-radius: 5px;
`;
const SlideDialogVideo = ({ onClose }) => {
  const object = useAsyncValue();
  const [url, setUrl] = useState(object?.videoUrl || '');

  const getVideoUrl = (currentUrl) => {
    const regExp = new RegExp(/.*watch.*/, 'gi');
    if (regExp.test(currentUrl)) {
      return currentUrl.replace('watch?v=', 'embed/');
    }
    return '';
  };
  const [videoUrl, setVideoUrl] = useState(getVideoUrl(object?.videoUrl || ''));

  const handleChange = (e) => {
    const value = e.target.value;
    setUrl(value);
  };
  const handleClick = () => {
    setVideoUrl(getVideoUrl(url));
  };
  const setNewUrl = () => {
    if (JSON.stringify(object?.videoUrl) === JSON.stringify(url)) {
      onClose();
      return;
    }
    object.videoUrl = url;
    setNewVideo({
      UID: object?.UID,
      type: object?.typeEstate,
      videoUrl: url,
    }).then((answer) => {
      if (answer === 'OK') {
        onClose();
      }
    });
  };

  return (
    <SlideDialogVideoStyle onClick={(e) => e.stopPropagation()}>
      <InputWrap>
        <InputUI fullWidth small value={url} onChange={handleChange} />
        <ButtonUI onClick={handleClick} size='small'>
          Проверить
        </ButtonUI>
      </InputWrap>
      <IframeStyle
        width='100%'
        height='315'
        src={videoUrl}
        title='YouTube video player'
        frameborder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowfullscreen
      ></IframeStyle>
      <Box fullWidth jc='flex-start'>
        <ButtonUI onClick={onClose} size='small' variant='outline'>
          Отменить
        </ButtonUI>
        <ButtonUI onClick={setNewUrl} size='small'>
          Сохранить
        </ButtonUI>
      </Box>
    </SlideDialogVideoStyle>
  );
};

export default SlideDialogVideo;
