import React from 'react';
import { TaskBlockStyle } from './TaskStyle';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useDateFormat } from 'hooks/DateFormat';
import { IconButton } from 'ui/IconButton';
import copyUrl, { ReactComponent as Copy } from 'images/copy.svg';
const TaskSlideMeta = ({ UID, lostDate, created, updated }) => {
  const copyID = () => {
    navigator.clipboard.writeText(`http://crm.metragegroup.com?bid=${UID}`);
  }
  return (
    <TaskBlockStyle
      jc='space-between'
    >
      <Box>
        <TextSpanStyle size={12}>ID: {UID}</TextSpanStyle>
        <IconButton onClick={copyID}>
          <Copy/>
        </IconButton>
      </Box>
      <TextSpanStyle size={12}>Дата срыва: {useDateFormat(lostDate, 'DD.MM.YY')}</TextSpanStyle>
      <Box>
        <TextSpanStyle size={12}>Создано: {useDateFormat(created, 'DD.MM.YY')}</TextSpanStyle>
        <TextSpanStyle size={12}>Изменено: {useDateFormat(updated, 'DD.MM.YY')}</TextSpanStyle>
      </Box>
    </TaskBlockStyle>
  );
};

export default TaskSlideMeta;