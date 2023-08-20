import React from 'react';
import { SlideBlockStyle } from '../DealStyle';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useDateFormat } from 'hooks/DateFormat';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Copy } from 'images/copy.svg';
import { useAsyncValue } from 'react-router-dom';

const SlideDealMeta = () => {
  const deal = useAsyncValue();
  const copyID = () => {
    navigator.clipboard.writeText(`http://crm.metragegroup.com?deal=${deal.UID}`);
  }
  return (
    <SlideBlockStyle
      jc='space-between'
    >
      <Box gap="0">
        <IconButton onClick={copyID}>
          <Copy />
        </IconButton>
        <TextSpanStyle size={12}>ID: {deal?.UID}</TextSpanStyle>
      </Box>
      <Box>
        <TextSpanStyle size={12}>Создано: {useDateFormat(deal?.created, 'DD.MM.YY')}</TextSpanStyle>
        <TextSpanStyle size={12}>Изменено: {useDateFormat(deal?.updated, 'DD.MM.YY')}</TextSpanStyle>
      </Box>
    </SlideBlockStyle>
  );
};

export default SlideDealMeta;