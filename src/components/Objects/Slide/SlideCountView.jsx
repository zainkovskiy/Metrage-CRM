import React from 'react';
import { ReactComponent as View } from 'images/view.svg';
import { IconButton } from 'ui/IconButton';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';

const SlideCountView = ({ view }) => {
  return (
    <Box column ai='flex-start' gap='0'>
      <TextSpanStyle size={10}>Просмотры Авито и ЦИАН</TextSpanStyle>
      <Box gap='0.2rem'>
        <IconButton>
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
  );
};

export default SlideCountView;
