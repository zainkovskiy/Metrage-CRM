import React, { useState } from 'react';
import styled from 'styled-components';
import { SlideBlockStyle } from '../DealStyle';
import { SlideGridWrapper } from '../DealStyle';
import UploderFiles from '../../Main/UploderFiles';
import { useAsyncValue } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import { IconButton } from 'ui/IconButton';
import { Box } from 'ui/Box';
import { ReactComponent as Close } from 'images/close.svg';
import { LinkUI } from 'ui/LinkUI';
import { useSelector } from 'react-redux';
import { removeFile } from '../../../api/uploadAPI';

const FeatureTitle = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
const SliderText = styled(TextSpanStyle)`
  text-overflow: ellipsis;
  overflow: hidden;
`;

const SliderFiles = () => {
  const deal = useAsyncValue();
  const userId = useSelector((state) => state.user.UID);
  const [change, setChange] = useState(false);
  const uploadFiles = (uploadFiles) => {
    deal.files = [...deal.files, ...uploadFiles];
    setChange(!change);
  };
  const removeCurrentFile = (file) => {
    removeFile(file.UID).then((answer) => {
      if (answer === 'OK') {
        deal.files = deal.files.filter((item) => item.UID !== file.UID);
        setChange(!change);
      }
    });
  };
  const raw = {
    entityId: deal.UID,
    entityType: 'deal',
    author: userId,
  };
  return (
    <SlideBlockStyle $column>
      <FeatureTitle>Файлы</FeatureTitle>
      <UploderFiles raw={raw} callback={uploadFiles} fullWidth multiple />
      <SlideGridWrapper $fullWidth>
        {deal.files.map((file) => {
          return (
            <Box jc='space-between' key={file.UID} fullWidth>
              <SliderText size={12} nowrap>
                {file?.name || `неизвестный файл`}
              </SliderText>
              <Box>
                <LinkUI
                  size={12}
                  href={file.downloadUrl}
                  target='_blank'
                  download
                >
                  Скачать
                </LinkUI>
                <IconButton
                  onClick={() => {
                    removeCurrentFile(file);
                  }}
                  color='error'
                >
                  <Close />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </SlideGridWrapper>
    </SlideBlockStyle>
  );
};

export default SliderFiles;
