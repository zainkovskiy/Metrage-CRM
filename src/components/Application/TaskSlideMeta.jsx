import React from 'react';
import { TaskBlockStyle } from './TaskStyle';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';
import { useDateFormat } from 'hooks/DateFormat';
import { IconButton } from 'ui/IconButton';
import copyUrl, { ReactComponent as Copy } from 'images/copy.svg';
const TaskSlideMeta = ({ UID, lostDate, created, updated }) => {
  const copyID = () => {
    navigator.clipboard.writeText(UID);
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
      <TextSpanStyle size={12}>Дата срыва: {useDateFormat(lostDate)}</TextSpanStyle>
      <Box>
        <TextSpanStyle size={12}>Создано: {useDateFormat(created)}</TextSpanStyle>
        <TextSpanStyle size={12}>Изменено: {useDateFormat(updated)}</TextSpanStyle>
      </Box>
    </TaskBlockStyle>
  );
};

export default TaskSlideMeta;