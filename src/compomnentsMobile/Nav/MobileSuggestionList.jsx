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
  width: 100%;
`;

const MobileSuggestionTitle = styled.span`
  font-family: ${({ theme }) => theme.font.family};
  color: #fff;
`;

const MobileSuggestionList = ({ findList, clickSuggestion }) => {
  return (
    <MobileSuggestionListStyle>
      {findList.map((suggestion, idx) => (
        <React.Fragment key={idx}>
          <MobileSuggestionTitle style={{ color: '#fff' }}>
            {suggestion?.title}
          </MobileSuggestionTitle>
          {suggestion?.list?.length > 0 ? (
            <>
              {suggestion.list.map((item, idx) => (
                <MobileSuggestion
                  key={`${'suggestion'}${item.UID}${idx}`}
                  suggestion={item}
                  type={suggestion?.title}
                  path={suggestion?.path}
                  clickSuggestion={clickSuggestion}
                />
              ))}
            </>
          ) : (
            <MobileSuggestion notFound />
          )}
        </React.Fragment>
      ))}
    </MobileSuggestionListStyle>
  );
};

export default MobileSuggestionList;
