import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useNumberTriad } from 'hooks/StringHook';

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
  font-family: ${({ theme }) => theme.font.family};

  font-size: 12px;
  color: #fff;
`;

const MobileSuggestion = ({
  suggestion,
  notFound,
  type,
  path,
  clickSuggestion,
}) => {
  const getChildText = () => {
    if (notFound) {
      return (
        <MobileSuggestionText $notFound={notFound}>
          Не найдено...
        </MobileSuggestionText>
      );
    }
    if (type === 'Объекты') {
      return (
        <>
          <MobileSuggestionText>
            {suggestion?.Category || ''} {suggestion?.addrString || ''}
          </MobileSuggestionText>
          <MobileSuggestionText $nowrap>
            {useNumberTriad(suggestion?.Price || 0)} руб.
          </MobileSuggestionText>
        </>
      );
    }
    if (type === 'ЖК') {
      return (
        <>
          <MobileSuggestionText>
            {suggestion?.name || ''}{' '}
            {suggestion?.addrStr ? `(${suggestion?.addrStr})` : ''}
          </MobileSuggestionText>
        </>
      );
    }
    return (
      <>
        <MobileSuggestionText>
          {suggestion?.lastName || ''} {suggestion?.firstName || ''}{' '}
          {suggestion?.secondName || ''}
        </MobileSuggestionText>
        <MobileSuggestionText> {suggestion?.phone || ''}</MobileSuggestionText>
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
    if (type === 'Пользователи') {
      return `${path}/${suggestion?.UID}`;
    }
    if (type === 'ЖК') {
      return `${path}/${suggestion?.UID}`;
    }
    return '';
  };
  return (
    <MobileSuggestionStyle to={getPath()} onClick={clickSuggestion}>
      {getChildText()}
    </MobileSuggestionStyle>
  );
};

export default MobileSuggestion;
