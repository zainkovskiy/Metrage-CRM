import React from 'react';
import MobileSuggestion from './MobileSuggestion';
import styled from 'styled-components';

const MobileSuggestionListStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0.5rem;
  box-sizing: border-box;
  overflow: auto;
  width: 80%;
`;

const MobileSuggestionTitle = styled.span`
  font-family: ${({ theme }) => theme.font.family};
  color: #fff;
`;

const MobileSuggestionList = ({ suggestions, clickSuggestion }) => {
  return (
    <MobileSuggestionListStyle>
      <MobileSuggestionTitle style={{ color: '#fff' }}>
        {suggestions?.searchTitle}
      </MobileSuggestionTitle>
      {suggestions?.hasItems ? (
        suggestions.items.map((suggestion, idx) => (
          <MobileSuggestion
            key={`${'suggestion'}${suggestion.UID}${idx}`}
            suggestion={suggestion}
            clickSuggestion={clickSuggestion}
            withImages={suggestions.withImages}
          />
        ))
      ) : (
        <MobileSuggestion notFound />
      )}
    </MobileSuggestionListStyle>
  );
};

export default MobileSuggestionList;
