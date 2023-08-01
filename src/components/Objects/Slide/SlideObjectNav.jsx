import React, { useState } from 'react';
import { SlideBlockStyle } from '../ObjectsStyle';
import { Box } from 'ui/Box';
import styled from 'styled-components';
import DialogWindow from 'components/Main/DialogWindow';
import SlideDialogAd from './SlideDialogAd';
import { useAsyncValue } from 'react-router-dom';

const ObjectSlideButton = styled.div`
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
  cursor: pointer;
  user-select: none;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  transition: border-bottom .3s, color .3s;
  &:hover{
    border-bottom: 1px solid #676767;
    color: #676767;
  }
  &:active{
    border-bottom: 1px solid transparent;
  }
`
const ObjectNavDivide = styled.span`
  width: 1px;
  background-color: #ccc;
`

const SlideObjectNav = () => {
  const object = useAsyncValue();
  console.log(object);
  const [ad, setAd] = useState(false);
  const isShowAd = () => {
    setAd(!ad);
  }
  return (
    <SlideBlockStyle>
      <Box jc='space-between' fullWidth>
        <Box ai='normal'>
          <ObjectSlideButton>
            Фото
          </ObjectSlideButton>
          <ObjectNavDivide />
          <ObjectSlideButton onClick={isShowAd}>
            Реклама
          </ObjectSlideButton>
        </Box>
        <ObjectSlideButton>
          Редактировать
        </ObjectSlideButton>
      </Box>
      <DialogWindow open={ad} onClose={isShowAd}>
        <SlideDialogAd onClose={isShowAd} UID={object.UID} estate={object.typeEstate}/>
      </DialogWindow>
    </SlideBlockStyle>
  );
};

export default SlideObjectNav;