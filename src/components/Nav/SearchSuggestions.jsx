import React from 'react';
import styled from 'styled-components';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import { motion } from 'framer-motion';
import { useNumberTriad } from '../../hooks/StringHook';
import { Link } from 'react-router-dom';

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
const SearchSuggestionsTitle = styled.p`
  border-bottom: 1px solid #786464;
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ size }) => (size ? size + 'px' : '14px')};
  width: 100%;
  color: ${({ color }) => color && color};
`;
const CloseContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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
      <CloseContainer>
        <CloseButton onClick={handleClose}>
          <Close />
        </CloseButton>
      </CloseContainer>
      {suggestions.map((suggestion, idx) => (
        <React.Fragment key={idx}>
          <SearchSuggestionsTitle color='#786464'>
            {suggestion?.title}
          </SearchSuggestionsTitle>
          {suggestion?.list?.length > 0 ? (
            <>
              {suggestion.list.map((item) => (
                <SearchSuggestionsItem
                  key={suggestion + item.UID}
                  suggestion={item}
                  type={suggestion?.title}
                  path={suggestion?.path}
                  clearSuggestions={clearSuggestions}
                />
              ))}
            </>
          ) : (
            <SearchSuggestionsItem notFound />
          )}
        </React.Fragment>
      ))}
    </SearchSuggestionsStyle>
  );
};

const SearchSuggestionsItemStyle = styled.div`
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
  font-size: 12px;
  white-space: ${({ $nowrap }) => $nowrap && 'nowrap'};
`;
const SearchSuggestionsItem = ({
  suggestion,
  notFound,
  type,
  path,
  clearSuggestions,
}) => {
  const getChildText = () => {
    if (notFound) {
      return (
        <SearchSuggestionsItemText>Не найдено...</SearchSuggestionsItemText>
      );
    }
    if (type === 'Объекты') {
      return (
        <>
          <SearchSuggestionsItemText>
            {suggestion?.Category || ''} {suggestion?.addrString || ''}
          </SearchSuggestionsItemText>
          <SearchSuggestionsItemText $nowrap>
            {' '}
            {useNumberTriad(suggestion?.Price || 0)} руб.
          </SearchSuggestionsItemText>
        </>
      );
    }
    return (
      <>
        <SearchSuggestionsItemText>
          {suggestion?.lastName || ''} {suggestion?.firstName || ''}{' '}
          {suggestion?.secondName || ''}
        </SearchSuggestionsItemText>
        <SearchSuggestionsItemText>
          {' '}
          {suggestion?.phone || ''}
        </SearchSuggestionsItemText>
      </>
    );
  };
  const getPath = () => {
    if (type === 'Объекты') {
      return `${path}/${suggestion?.type}/${suggestion?.UID}`;
    }
    if (type === 'Контакты') {
      return `${path}/${suggestion?.UID}`;
    }
    return '';
  };
  return (
    <SearchSuggestionsItemStyle
      as={type !== 'Пользователи' && Link}
      $notFound={notFound}
      to={getPath()}
      onClick={clearSuggestions}
    >
      {getChildText()}
    </SearchSuggestionsItemStyle>
  );
};

export default SearchSuggestions;
