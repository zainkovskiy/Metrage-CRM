import React from 'react';
import styled from 'styled-components';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ChatListItemStyle = styled(motion.div)`
  padding: 0 0.5rem;
  height: 65px;
  background-color: #fff;
  transition: background-color 0.3s;
  cursor: pointer;
  box-sizing: border-box;
  display: flex;
  &:hover {
    background-color: #f3f3f3;
  }
  &:last-child ${ChatListContainer} {
    border-bottom: none;
  }
`;
const ChatListContainer = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #ccc;
  text-decoration: none;
`;
const DemandImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 40px;
`;

const variants = {
  visible: (custom) => ({
    x: 0,
    transition: { type: 'spring', delay: custom * 0.2 },
  }),
  hidden: { x: 1000 },
};

const SlideDialogDemandItem = ({ curDemand, idx }) => {
  return (
    <ChatListItemStyle
      variants={variants}
      custom={idx}
      animate='visible'
      initial='hidden'
    >
      <ChatListContainer to={`/application/${curDemand.UID}`}>
        <DemandImage src={curDemand?.picture} />
        <div>
          <TextSpanStyle size={10} color='#909090'>
            Создано: {useDateFormat(curDemand?.created)}
          </TextSpanStyle>
          <TextSpanStyle size={12} color='#a6a3a3'>
            {curDemand?.dName}
          </TextSpanStyle>
        </div>
      </ChatListContainer>
    </ChatListItemStyle>
  );
};

export default SlideDialogDemandItem;
