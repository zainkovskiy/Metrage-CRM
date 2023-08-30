import React from 'react';
// import { SlideBlockStyle } from '../DealStyle';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useDateFormat } from 'hooks/DateFormat';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Copy } from 'images/copy.svg';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock } from '../../../styles/slider';

const SlideClientMeta = () => {
  // const deal = useAsyncValue();
  const copyID = () => {
    // navigator.clipboard.writeText(`http://crm.metragegroup.com?deal=${deal.UID}`);
  };
  return (
    <SliderBlock>
      <Box jc='space-between'>
        <Box gap='0'>
          <IconButton onClick={copyID}>
            <Copy />
          </IconButton>
          <TextSpanStyle size={12}>ID: 3</TextSpanStyle>
        </Box>
        <Box>
          <TextSpanStyle size={12}>
            Создано: {useDateFormat('2023-08-29', 'DD.MM.YY')}
          </TextSpanStyle>
          <TextSpanStyle size={12}>
            Изменено: {useDateFormat('2023-08-29', 'DD.MM.YY')}
          </TextSpanStyle>
        </Box>
      </Box>
    </SliderBlock>
  );
};

export default SlideClientMeta;
