import React from 'react';
import styled from 'styled-components';
import closeUrl, { ReactComponent as Close } from 'images/close.svg';
import { motion } from 'framer-motion';

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
`
const SearchSuggestionsTitle = styled.p`
  border-bottom: 1px solid #786464;
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ size }) => size ? size + 'px' : '14px'};
  width: 100%;
  color: ${({ color }) => color && color};
`
const SearchSuggestionsItem = styled.div`
  font-family: ${({ theme }) => theme.font.family};
  font-size: ${({ size }) => size ? size + 'px' : '14px'}; 
  padding: 0.5rem;
  cursor: pointer;
  ${({ $notFound }) => $notFound && 'color: #786464'};
  ${({ $notFound }) => $notFound && 'pointer-events: none'};
  &:hover{
    color: ${({ theme }) => theme.color.primary}; 
  }
`
const CloseContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`
const CloseButton = styled.span`
  cursor: pointer;      
  width: 14px;
  height: 14px;
  transition: transform .3s;
  &:hover{
    transform: scale(1.1);
  }
  &:active{
    transform: scale(0.9);
  }
    & > svg{
      pointer-events: none;
      width: 14px;
      height: 14px;
      fill: #df7f7f;
    }
`
const SearchSuggestions = ({ suggestions, clearSuggestions }) => {
  const handleClose = () => {
    clearSuggestions();
  }
  return (
    <SearchSuggestionsStyle
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <CloseContainer>
        <CloseButton onClick={handleClose}><Close /></CloseButton>
      </CloseContainer>
      {
        suggestions.map((suggestion, idx) => (
          <React.Fragment key={idx}>
            <SearchSuggestionsTitle color='#786464'>{suggestion?.title}</SearchSuggestionsTitle>
            {
              suggestion?.list?.length > 0 ?
                <>
                  {
                    suggestion.list.map((item) => (
                      <SearchSuggestionsItem key={item.UID}>{item?.lastName} {item?.firstName} {item?.secondName}</SearchSuggestionsItem>
                    ))
                  }
                </>
                : <SearchSuggestionsItem $notFound>Не найдено...</SearchSuggestionsItem>
            }
          </React.Fragment>

        ))
      }
      <SearchSuggestionsTitle color='#786464'>Сделки</SearchSuggestionsTitle>
      <SearchSuggestionsItem $notFound>Не найдено...</SearchSuggestionsItem>
      <SearchSuggestionsTitle color='#786464'>Заявки</SearchSuggestionsTitle>
      <SearchSuggestionsItem $notFound>Не найдено...</SearchSuggestionsItem>
    </SearchSuggestionsStyle>
  );
};

export default SearchSuggestions;
