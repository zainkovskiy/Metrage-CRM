import React, { useState } from 'react';
import styled from 'styled-components';
import { SlideBlockStyle } from '../DealStyle';
import { SlideGridWrapper } from '../DealStyle';
import UploderPhoto from '../../Main/UploderPhoto';
import { useAsyncValue } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import { IconButton } from 'ui/IconButton';
import { Box } from 'ui/Box';
import { ReactComponent as Close } from 'images/close.svg';

const FeatureTitle = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const SliderText = styled(TextSpanStyle)`
  text-overflow: ellipsis;
  overflow: hidden;
`

const SliderFiles = () => {
  const deal = useAsyncValue();
  const [files, setFiles] = useState([]);
  const uploadFiles = (uploadFiles) => {
    setFiles([...files, ...uploadFiles])
  }
  const removeFile = (file) => {
    setFiles((prevState) => prevState.filter((item) => JSON.stringify(item) !== JSON.stringify(file)))
  }
  return (
    <SlideBlockStyle $column>
      <FeatureTitle>Файлы</FeatureTitle>
      <UploderPhoto UID={deal.UID} callback={uploadFiles} fullWidth />
      <SlideGridWrapper $fullWidth>
        {
          files.map((file, idx) => {
            return (
              <Box jc='space-between' key={idx} fullWidth>
                <SliderText size={12} nowrap>{file?.original || `неизвестный файл`}</SliderText>
                <IconButton onClick={() => { removeFile(file) }} color='error'>
                  <Close />
                </IconButton>
              </Box>
            )
          })
        }
      </SlideGridWrapper>
    </SlideBlockStyle>
  );
};

export default SliderFiles;