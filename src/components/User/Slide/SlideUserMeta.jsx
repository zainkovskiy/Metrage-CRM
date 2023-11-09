import React from 'react';
// import { SlideBlockStyle } from '../DealStyle';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useDateFormat } from 'hooks/DateFormat';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Copy } from 'images/copy.svg';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock } from '../../../styles/slider';

const SlideUserMeta = () => {
  const user = useAsyncValue();
  const copyID = () => {
    navigator.clipboard.writeText(
      `http://crm.metragegroup.com?users=${user.UID}`
    );
  };
  return (
    <SliderBlock>
      <Box jc='space-between'>
        <Box gap='0'>
          <IconButton onClick={copyID}>
            <Copy />
          </IconButton>
          <TextSpanStyle size={12}>ID: {user?.UID}</TextSpanStyle>
        </Box>
        <Box>
          <TextSpanStyle size={12}>
            Создано: {useDateFormat(user?.created, 'DD.MM.YY')}
          </TextSpanStyle>
        </Box>
      </Box>
    </SliderBlock>
  );
};

export default SlideUserMeta;
