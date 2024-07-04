import React from 'react';
import { Box } from 'ui/Box';
import { TextSpanStyle } from 'styles/styles';
import { ButtonLink } from 'ui/ButtonLink/ButtonLink';
import { useDateFormat } from 'hooks/DateFormat';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const MortageNoticeItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
`;

const SlideMortageNoticeItem = ({ notice, handleRemove }) => {
  const handleClick = () => {
    handleRemove(notice);
  };
  return (
    <MortageNoticeItem
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Box column ai='flrx-start' gap='0' fullWidth>
        <TextSpanStyle size={10} color='#929292'>
          {useDateFormat(notice.dueDate, 'DD MMMM YYYY HH:MM')}
        </TextSpanStyle>
        <TextSpanStyle size={12}>{notice?.notify || ''}</TextSpanStyle>
      </Box>
      <ButtonLink size={10} color='red' onClick={handleClick}>
        Удалить
      </ButtonLink>
    </MortageNoticeItem>
  );
};

export default SlideMortageNoticeItem;
