import React from 'react';
import { ApplicationBlockStyle } from '../applicationStyle';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useDateFormat } from 'hooks/DateFormat';
import { IconButton } from 'ui/IconButton';
import copyUrl, { ReactComponent as Copy } from 'images/copy.svg';
const SlideApplicationMeta = ({ UID, lostDate, created, updated }) => {
  const copyID = () => {
    navigator.clipboard.writeText(
      `http://crm.metragegroup.com?application=${UID}`
    );
  };
  return (
    <ApplicationBlockStyle jc='space-between'>
      <Box gap='0'>
        <IconButton onClick={copyID}>
          <Copy />
        </IconButton>
        <TextSpanStyle size={12}>ID: {UID}</TextSpanStyle>
      </Box>
      <TextSpanStyle size={12}>
        Дата срыва: {useDateFormat(lostDate, 'DD.MM.YY')}
      </TextSpanStyle>
      <Box>
        <TextSpanStyle size={12}>
          Создано: {useDateFormat(created, 'DD.MM.YY')}
        </TextSpanStyle>
        <TextSpanStyle size={12}>
          Изменено: {useDateFormat(updated, 'DD.MM.YY')}
        </TextSpanStyle>
      </Box>
    </ApplicationBlockStyle>
  );
};

export default SlideApplicationMeta;
