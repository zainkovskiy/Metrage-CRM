import React from 'react';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDateFormat } from 'hooks/DateFormat';
import { useNumberTriad } from 'hooks/StringHook';
import * as S from './style';

const TableContainer = styled.div`
  width: 100%;
  overflow: auto;
  flex-grow: 1;
`;
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
const DDSTable = () => {
  const { ddsData } = useSelector((state) => state.dds);
  const navigate = useNavigate();
  const handleClick = (line) => {
    navigate(`${line.UID}`);
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
    <TableContainer>
      <S.TableStyle>
        <S.TableHader>
          <S.TableHead>
            {ddsData.recordsTitle.map((headerTitle, idx) => (
              <th key={headerTitle?.rusTitle}>{headerTitle?.rusTitle || ''}</th>
            ))}
          </S.TableHead>
        </S.TableHader>
        <tbody>
          {ddsData?.records?.length > 0 &&
            ddsData?.records.map((line, idx) => (
              <S.TableLine
                key={`${line.UID}${idx}`}
                idx={idx}
                onClick={() => handleClick(line)}
              >
                {ddsData.recordsTitle.map((header, idx) => (
                  <TableTD
                    key={`${line.UID}cell${idx}`}
                    $nowrap={header.format === 'money'}
                    $bold={header.format === 'money'}
                    $color={
                      header.format === 'money' && getColor(line[header.key])
                    }
                  >
                    {getTableValue(header.format, line[header.key])}
                  </TableTD>
                ))}
              </S.TableLine>
            ))}
        </tbody>
      </S.TableStyle>
    </TableContainer>
  );
};

export default DDSTable;
