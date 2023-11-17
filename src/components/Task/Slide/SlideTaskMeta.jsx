import React from 'react';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useDateFormat } from 'hooks/DateFormat';
import { IconButton } from 'ui/IconButton';
import { ReactComponent as Copy } from 'images/copy.svg';
import { useAsyncValue } from 'react-router-dom';
import { SliderBlock } from '../../../styles/slider';

const SlideTaskMeta = () => {
  const task = useAsyncValue();
  const copyID = () => {
    navigator.clipboard.writeText(
      `http://crm.metragegroup.com?task=${task.UID}`
    );
  };
  return (
    <SliderBlock>
      <Box jc='space-between'>
        <Box gap='0'>
          <IconButton onClick={copyID}>
            <Copy />
          </IconButton>
          <TextSpanStyle size={12}>ID: {task?.UID}</TextSpanStyle>
        </Box>
        <Box>
          <TextSpanStyle size={12}>
            Создано: {useDateFormat(task?.created, 'DD.MM.YY')}
          </TextSpanStyle>
          <TextSpanStyle size={12}>
            Изменено: {useDateFormat(task?.updated, 'DD.MM.YY')}
          </TextSpanStyle>
        </Box>
      </Box>
    </SliderBlock>
  );
};

export default SlideTaskMeta;
