import React from 'react';
import { SlideBlockStyle } from '../ObjectsStyle';
import { Box } from 'ui/Box';
import styled from 'styled-components';

const ObjectSlideButton = styled.div`
  font-family: ${({theme}) => theme.font.family};
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
  return (
    <SlideBlockStyle>
      <Box jc='space-between' fullWidth>
        <Box ai='normal'>
          <ObjectSlideButton>
            Фото
          </ObjectSlideButton>
          <ObjectNavDivide/>
          <ObjectSlideButton>
            Реклама
          </ObjectSlideButton>
        </Box>
        <ObjectSlideButton>
          Редактировать
        </ObjectSlideButton>
      </Box>
    </SlideBlockStyle>
  );
};

export default SlideObjectNav;