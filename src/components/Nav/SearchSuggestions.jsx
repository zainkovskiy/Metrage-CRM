import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Close } from 'images/close.svg';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Box } from 'ui/Box';
import imgErrorUrl from 'images/img-error.svg';

const SearchSuggestionsStyle = styled(motion.div)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.primary};
  border-radius: 5px;
  max-height: 250px;
  overflow: auto;
  padding: 0.5rem;
  box-sizing: border-box;
  transform: translate(0, 100%);
  background-color: #fff;
  z-index: 9999;
  transform: translate(0, calc(100% + 0.5rem));
`;
const SearchSuggestionsTitle = styled.div`
  border-bottom: 1px solid #786464;
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ size }) => (size ? size + 'px' : '14px')};
  width: 100%;
  color: ${({ color }) => color && color};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CloseButton = styled.span`
  cursor: pointer;
  width: 14px;
  height: 14px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
  & > svg {
    pointer-events: none;
    width: 14px;
    height: 14px;
    fill: #df7f7f;
  }
`;
const SearchSuggestions = ({ suggestions, clearSuggestions }) => {
  console.log(suggestions);
  const handleClose = () => {
    clearSuggestions();
  };
  return (
    <SearchSuggestionsStyle
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SearchSuggestionsTitle color='#786464'>
        {suggestions?.searchTitle}
        <CloseButton onClick={handleClose}>
          <Close />
        </CloseButton>
      </SearchSuggestionsTitle>
      {suggestions?.hasItems ? (
        suggestions.items.map((suggestion, idx) => (
          <SearchSuggestionsItem
            key={`suggestion${suggestion.UID}${idx}`}
            suggestion={suggestion}
            clearSuggestions={clearSuggestions}
            withImages={suggestions.withImages}
          />
        ))
      ) : (
        <SearchSuggestionsItem notFound />
      )}
    </SearchSuggestionsStyle>
  );
};

const SearchSuggestionsItemStyle = styled(Link)`
  padding: 0.5rem;
  cursor: pointer;
  ${({ $notFound }) => $notFound && 'color: #786464'};
  ${({ $notFound }) => $notFound && 'pointer-events: none'};
  color: #000;
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  align-items: flex-start;
  text-decoration: none;
  &:hover ${SearchSuggestionsItemText} {
    color: ${({ theme }) => theme.color.primary};
  }
`;
const SearchSuggestionsItemText = styled.span`
  font-family: 'CeraCY', sans-serif;
  font-size: ${({ $size }) => ($size ? `${$size}px` : '12px')};
  white-space: ${({ $nowrap }) => $nowrap && 'nowrap'};
`;
const SearchSuggestionsItemImage = styled.img`
  min-width: 80px;
  max-width: 80px;
  height: 50px;
  object-fit: cover;
`;
const SearchSuggestionsItem = ({
  suggestion,
  notFound,
  clearSuggestions,
  withImages,
}) => {
  if (notFound) {
    return (
      <SearchSuggestionsItemStyle $notFound={notFound}>
        <SearchSuggestionsItemText>Не найдено...</SearchSuggestionsItemText>
      </SearchSuggestionsItemStyle>
    );
  }
  return (
    <SearchSuggestionsItemStyle
      to={`${suggestion.routingType}/${suggestion.UID}`}
      onClick={clearSuggestions}
    >
      <Box ai='flex-start'>
        {withImages && (
          <SearchSuggestionsItemImage
            src={suggestion?.picture || imgErrorUrl}
          />
        )}
        <Box column ai='flex-start' gap='0'>
          <SearchSuggestionsItemText>
            {suggestion.firstLine}
          </SearchSuggestionsItemText>
          {suggestion?.secondLine && (
            <SearchSuggestionsItemText $size={10}>
              {suggestion.secondLine}
            </SearchSuggestionsItemText>
          )}
        </Box>
      </Box>
      {suggestion?.secondColumn && (
        <SearchSuggestionsItemText $nowrap>
          {suggestion.secondColumn}
        </SearchSuggestionsItemText>
      )}
    </SearchSuggestionsItemStyle>
  );
};

export default SearchSuggestions;
