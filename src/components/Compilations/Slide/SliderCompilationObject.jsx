import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { useNumberTriad } from '../../../hooks/StringHook';
import { Box } from 'ui/Box';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Garbage } from 'images/garbage.svg';

const SliderCompilationObjectStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &:not(:last-child) {
    border-bottom: 1px solid #efefef;
    padding-bottom: 0.5rem;
  }
`;

const SliderCompilationObject = ({ object, removeItem }) => {
  return (
    <SliderCompilationObjectStyle>
      <Box gap='0' ai='flex-start' column>
        <TextSpanStyle size={10}>{object?.Category || ''}</TextSpanStyle>
        <TextSpanStyle size={12}>{object?.address || ''}</TextSpanStyle>
        <TextSpanStyle size={10}>
          {useNumberTriad(object?.Price)} руб.
        </TextSpanStyle>
      </Box>
      <IconButton onClick={() => removeItem(object)}>
        <Garbage />
      </IconButton>
    </SliderCompilationObjectStyle>
  );
};

export default SliderCompilationObject;
