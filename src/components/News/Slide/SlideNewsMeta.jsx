import React from 'react';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useDateFormat } from 'hooks/DateFormat';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Copy } from 'images/copy.svg';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock } from '../../../styles/slider';
import moment from 'moment';
import styled from 'styled-components';
import { useGetAvatar } from 'hooks/MakeAvatar';

const Avatar = styled.img`
  width: 16px;
  height: 16px;
  object-fit: cover;
  object-position: top;
  border-radius: 40px;
`;
const SlideNewsMeta = () => {
  const news = useAsyncValue();
  const copyID = () => {
    navigator.clipboard.writeText(
      `http://crm.metragegroup.com?news=${news?.UID || ''}`
    );
  };
  return (
    <SliderBlock>
      <Box jc='space-between'>
        <Box gap='0'>
          <IconButton onClick={copyID}>
            <Copy />
          </IconButton>
          <TextSpanStyle size={12}>ID: {news?.UID || ''}</TextSpanStyle>
        </Box>
        <Box jc='flex-end'>
          <TextSpanStyle size={12}>
            Создано: {useDateFormat(news?.created)}
          </TextSpanStyle>
          <Avatar
            src={useGetAvatar({
              avatar: news?.authorId?.avatar,
              firstName: news?.authorId?.firstName,
              lastName: news?.authorId?.lastName,
            })}
          />
          <TextSpanStyle size={12}>
            {news?.authorId?.firstName} {news?.authorId?.lastName}
          </TextSpanStyle>
        </Box>
      </Box>
    </SliderBlock>
  );
};

export default SlideNewsMeta;
