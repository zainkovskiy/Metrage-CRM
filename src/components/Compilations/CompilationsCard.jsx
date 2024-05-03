import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import { useDateFormat } from 'hooks/DateFormat';

const CompilationsCardStyle = styled(motion.div)`
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
  height: 100%;
  @media (hover: hover) {
    &:hover {
      transform: scale(1.03);
      box-shadow: 7px 8px 14px -6px rgba(0, 0, 0, 0.75);
    }
  }
  @media (hover: none) {
    &:active {
      transform: scale(1.03);
      box-shadow: 7px 8px 14px -6px rgba(0, 0, 0, 0.75);
    }
  }
`;
const CompilationsHeader = styled.div`
  border-radius: 5px 5px 0 0;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: #e4a0f1;
  width: 100%;
  box-sizing: border-box;
`;
const CompilationsContent = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex-grow: 1;
  background-color: #f5f5f5;
`;
const CompilationsCardImage = styled.img`
  object-fit: cover;
  height: 100px;
  border-radius: 5px;
`;
const CompilationsFooter = styled.div`
  background-color: #d9d9d9;
  padding: 0.6rem;
  border-radius: 0 0 5px 5px;
`;
const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;
const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};
const CompilationsCard = ({ compilation }) => {
  return (
    <LinkStyle to={`${compilation.UID}`}>
      <CompilationsCardStyle
        variants={variants}
        initial='hidden'
        animate='visible'
      >
        <CompilationsHeader>
          <TextSpanStyle size={10}>
            Подборка № {compilation?.UID || ''}
          </TextSpanStyle>
        </CompilationsHeader>
        <CompilationsContent>
          <CompilationsCardImage src={compilation.compilationImage} />
          <TextSpanStyle size={12}>
            Объектов в подборке: {compilation?.countItems || 0}
          </TextSpanStyle>
          <TextSpanStyle size={10}>
            Создано: {useDateFormat(compilation?.created, 'DD.MM.YY')}
          </TextSpanStyle>
        </CompilationsContent>
        <CompilationsFooter>
          <TextSpanStyle size={10}>
            {compilation?.clientName || ''} &nbsp;
          </TextSpanStyle>
        </CompilationsFooter>
      </CompilationsCardStyle>
    </LinkStyle>
  );
};

export default CompilationsCard;
