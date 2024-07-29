import React, { useEffect, useRef } from 'react';
import * as S from './style';
import styled, { css } from 'styled-components';
import { useDateFormat } from 'hooks/DateFormat';
import { useNumberTriad } from 'hooks/StringHook';

const TableTD = styled.td`
  ${({ $nowrap }) =>
    $nowrap &&
    css`
      white-space: nowrap;
    `}
  ${({ $color }) =>
    $color &&
    css`
      color: ${$color};
    `}
  ${({ $bold }) =>
    $bold &&
    css`
      font-family: ${({ theme }) => theme.font.familyBold};
    `}
`;

const DDSTableLine = ({ line, navigateTo, recordsTitle, isLast }) => {
  const lineRef = useRef(null);
  useEffect(() => {
    if (isLast && lineRef.current) {
      lineRef.current.scrollIntoView({
        block: 'center',
        behavior: 'smooth',
      });
    }
  }, []);
  const handleClick = () => {
    navigateTo(line);
  };
  const getTableValue = (format, value) => {
    if (format === 'date') {
      return useDateFormat(value, 'DD.MM.YYYY');
    }
    if (format === 'money') {
      return `${useNumberTriad(value || 0)} руб.`;
    }
    return value;
  };
  const getColor = (value) => {
    if (value > 0) {
      return '#47c520';
    }
    if (value < 0) {
      return '#eb5e26  ';
    }
    return;
  };
  return (
    <S.TableLine onClick={handleClick} ref={lineRef}>
      {recordsTitle.map((header, idx) => (
        <TableTD
          key={`${line.UID}cell${idx}`}
          $nowrap={header.format === 'money'}
          $bold={header.format === 'money'}
          $color={header.format === 'money' && getColor(line[header.key])}
        >
          {getTableValue(header.format, line[header.key])}
        </TableTD>
      ))}
    </S.TableLine>
  );
};

export default DDSTableLine;
