import React from 'react';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useDateFormat } from 'hooks/DateFormat';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Copy } from 'images/copy.svg';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock } from '../../../styles/slider';

const SlideMortageMeta = () => {
  const mortage = useAsyncValue();
  const copyID = () => {
    navigator.clipboard.writeText(
      `http://crm.metragegroup.com?mortage=${mortage.UID}`
    );
  };
  return (
    <SliderBlock>
      <Box jc='space-between'>
        <Box gap='0'>
          <IconButton onClick={copyID}>
            <Copy />
          </IconButton>
          <TextSpanStyle size={12}>ID: {mortage.UID}</TextSpanStyle>
        </Box>
        <TextSpanStyle size={12}>
          Создано: {useDateFormat(mortage.created, 'DD.MM.YYYY')}
        </TextSpanStyle>
      </Box>
    </SliderBlock>
  );
};

export default SlideMortageMeta;
