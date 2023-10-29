import React, { useState } from 'react';
import { ReactComponent as View } from 'images/view.svg';
import { IconButton } from 'ui/IconButton';
import { Box } from 'ui/Box';
import DialogWindow from 'components/Main/DialogWindow';
import { TextSpanStyle } from 'styles/styles';
import SlideDialogChartView from './SlideDialogChartView';

const SlideCountView = ({ view }) => {
  const [openChart, sertOpenChart] = useState(false);
  const toggleOpenChart = () => {
    sertOpenChart(!openChart);
  };
  return (
    <>
      <Box column ai='flex-start' gap='0'>
        <TextSpanStyle size={10}>Просмотры Авито и ЦИАН</TextSpanStyle>
        <Box gap='0.2rem'>
          <IconButton onClick={toggleOpenChart}>
            <View />
          </IconButton>
          <Box column ai='flex-start' gap='0'>
            <TextSpanStyle size={10}>
              За все время: {view?.viewsAll || 0}
            </TextSpanStyle>
            <TextSpanStyle size={10}>
              За последние 7дн.: {view?.viewslast7days || 0}
            </TextSpanStyle>
          </Box>
        </Box>
      </Box>
      <DialogWindow open={openChart} onClose={toggleOpenChart}>
        <SlideDialogChartView />
      </DialogWindow>
    </>
  );
};

export default SlideCountView;
