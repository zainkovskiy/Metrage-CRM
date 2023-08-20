import React from 'react';
import styled from 'styled-components';
import { SlideBlockStyle } from '../DealStyle';
import { SlideGridWrapper } from '../DealStyle';
import { TextSpanStyle } from 'styles/styles';
import { IconButton } from 'ui/IconButton';
import { Box } from 'ui/Box';
import { ReactComponent as Plus } from 'images/plus.svg';
import { ReactComponent as Close } from 'images/close.svg';
import { useAsyncValue } from 'react-router-dom';

const FeatureTitle = styled.div`
  border-bottom: 1px solid #786464;
  color: #786464;
  font-family: ${({ theme }) => theme.font.family};
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const SlideParticipants = styled.div`
  border: 1px solid #ccc;
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
  border-radius: 5px;
  height: 150px;
  overflow: auto;
`
const SlideParticipantsText = styled(TextSpanStyle)`
  text-overflow: ellipsis;
  overflow: hidden;
`
const SlideDealParticipants = () => {
  const deal = useAsyncValue();
  return (
    <SlideGridWrapper>
      <SlideBlockStyle $column>
        <FeatureTitle>Риелторы
          <IconButton onClick={() => { }}>
            <Plus />
          </IconButton>
        </FeatureTitle>
        <SlideParticipants>
          {
            deal?.realtors?.length > 0 &&
            deal.realtors.map((realtor) => (
              <Box jc='space-between' key={realtor?.UID}>
                <SlideParticipantsText size={12} nowrap>{realtor?.lastName} {realtor?.firstName} {realtor?.secondName}</SlideParticipantsText>
                <IconButton onClick={() => { }} color='error'>
                  <Close />
                </IconButton>
              </Box>
            ))
          }
        </SlideParticipants>
      </SlideBlockStyle>
      <SlideBlockStyle $column>
        <FeatureTitle>Юристы
          <IconButton onClick={() => { }}>
            <Plus />
          </IconButton>
        </FeatureTitle>
        <SlideParticipants>
          <Box jc='space-between'>
            <SlideParticipantsText size={12} nowrap>Дунаускас Ольга Владимировна</SlideParticipantsText>
            <IconButton onClick={() => { }} color='error'>
              <Close />
            </IconButton>
          </Box>
        </SlideParticipants>
      </SlideBlockStyle>
    </SlideGridWrapper>
  );
};

export default SlideDealParticipants;