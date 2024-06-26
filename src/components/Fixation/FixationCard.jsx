import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { TextSpanStyle } from 'styles/styles';
import { Box } from 'ui/Box';

const LinkStyle = styled(Link)`
  text-decoration: none;
  color: black;
`;
const FixationCardStyle = styled(motion.div)`
  border-radius: 40px 0 40px 0;
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
const FixationHeader = styled.div`
  border-radius: 40px 0 0 0;
  padding: 0.6rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: ${({ $back }) => ($back ? $back : '#000')};
  width: 100%;
  box-sizing: border-box;
`;
const FixationContent = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  flex-grow: 1;
  background-color: #f5f5f5;
`;
const FixationFooter = styled.div`
  background-color: #d9d9d9;
  padding: 0.6rem;
  border-radius: 0 0 40px 0;
  display: flex;
  justify-content: space-between;
`;
const variants = {
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

const FixationCard = ({ fixation }) => {
  return (
    <LinkStyle to={`${fixation.UID}`}>
      <FixationCardStyle variants={variants} initial='hidden' animate='visible'>
        <FixationHeader $back={fixation.stageColour}>
          <TextSpanStyle color='#fff' size={12}>
            ID: {fixation.UID}
          </TextSpanStyle>
          <TextSpanStyle color='#fff' size={12}>
            {fixation.clientName}
          </TextSpanStyle>
        </FixationHeader>
        <FixationContent>
          <Box jc='flex-end' gap='0.2rem'>
            <TextSpanStyle size={12}>Тип фиксации:</TextSpanStyle>
            <TextSpanStyle size={12} bold>
              {fixation.fixationType}
            </TextSpanStyle>
          </Box>
          <Box jc='flex-end' gap='0.2rem'>
            <TextSpanStyle size={12}>Предмет:</TextSpanStyle>
            <TextSpanStyle size={12} bold>
              {fixation.fixationObject}
            </TextSpanStyle>
          </Box>
          <Box ai='flex-end' gap='0' column>
            <TextSpanStyle size={12}>Риелтор:</TextSpanStyle>
            <TextSpanStyle size={12} bold>
              {fixation.realtorName}
            </TextSpanStyle>
            <TextSpanStyle size={10}>{fixation.realtorOffice}</TextSpanStyle>
          </Box>
          {fixation.jk.isVisible && (
            <Box ai='flex-start' gap='0.2rem' column>
              <TextSpanStyle size={12}>{fixation.jk.type}</TextSpanStyle>
              <TextSpanStyle size={12} bold>
                {fixation.jk.name}
              </TextSpanStyle>
            </Box>
          )}
          {fixation.developer.isVisible && (
            <Box ai='flex-start' gap='0.2rem' column>
              <TextSpanStyle size={12}>{fixation.developer.type}</TextSpanStyle>
              <TextSpanStyle size={12} bold>
                {fixation.developer.name}
              </TextSpanStyle>
            </Box>
          )}
        </FixationContent>
        <FixationFooter>
          <TextSpanStyle size={12}>{fixation.stage}</TextSpanStyle>
        </FixationFooter>
      </FixationCardStyle>
    </LinkStyle>
  );
};

export default FixationCard;
