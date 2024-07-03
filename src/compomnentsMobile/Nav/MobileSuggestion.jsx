import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import imgErrorUrl from 'images/img-error.svg';
import { Box } from 'ui/Box';

const MobileSuggestionStyle = styled(Link)`
  padding: 0.5rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: flex-start;
  text-decoration: none;
`;
const MobileSuggestionText = styled.span`
  ${({ $notFound }) => $notFound && 'font-style: italic;'};
  ${({ $nowrap }) => $nowrap && 'white-space: nowrap;'};
  font-size: ${({ $size }) => ($size ? `${$size}px ` : '12px')};
  font-family: ${({ theme }) => theme.font.family};
  color: #fff;
`;
const MobileImage = styled.img`
  min-width: 40px;
  max-width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50px;
`;
const MobileSuggestion = ({
  suggestion,
  notFound,
  clickSuggestion,
  withImages,
}) => {
  if (notFound) {
    return (
      <MobileSuggestionStyle>
        <MobileSuggestionText $notFound={notFound}>
          Не найдено...
        </MobileSuggestionText>
      </MobileSuggestionStyle>
    );
  }
  return (
    <MobileSuggestionStyle
      to={`${suggestion.routingType}/${suggestion.UID}`}
      onClick={clickSuggestion}
    >
      <Box ai='flex-start'>
        {withImages && <MobileImage src={suggestion?.picture || imgErrorUrl} />}
        <Box column ai='flex-start' gap='0'>
          <MobileSuggestionText>{suggestion.firstLine}</MobileSuggestionText>
          {suggestion?.secondLine && (
            <MobileSuggestionText $size={10}>
              {suggestion.secondLine}
            </MobileSuggestionText>
          )}
        </Box>
      </Box>
      {suggestion?.secondColumn && (
        <MobileSuggestionText $nowrap>
          {suggestion.secondColumn}
        </MobileSuggestionText>
      )}
    </MobileSuggestionStyle>
  );
};

export default MobileSuggestion;
