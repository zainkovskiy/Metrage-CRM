import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const TableContainer = styled.div`
  max-height: 250px;
  overflow: auto;
  flex-grow: 1;
`;
const TableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
`;
const TableHader = styled.thead`
  position: sticky;
  top: 0;
`;
const TableHead = styled.tr`
  background-color: #ccc;
  & > th {
    font-family: ${({ theme }) => theme.font.familyBold};
    padding: 0.3rem;
  }
`;
const TableLine = styled.tr`
  background-color: ${({ idx }) => idx % 2 === 1 && '#e6e6e6'};
  ${({ $isButton }) => $isButton && 'cursor: pointer;'};
  transition: background-color 0.3s;
  @media (hover: hover) {
    &:hover {
      ${({ $isButton }) =>
        $isButton && 'background-color: rgb(240, 219, 245);'};
    }
    &:active {
      ${({ $isButton }) =>
        $isButton && 'background-color: rgb(255, 255, 255);'};
    }
  }
  @media (hover: none) {
    &:active {
      ${({ $isButton }) =>
        $isButton && 'background-color: rgb(240, 219, 245);'};
    }
  }

  & > td {
    padding: 0.3rem;
  }
`;
const ChartTable = ({ chart, header }) => {
  const navigate = useNavigate();
  const handleClick = (line) => {
    if (line?.filter) {
      navigate('/objects', { state: { ...line.filter } });
    }
  };
  return (
    <TableContainer>
      <TableStyle>
        <TableHader>
          <TableHead>
            {header?.length > 0 &&
              header.map((headerTitle, idx) => (
                <th key={`${headerTitle?.rus || ''}${idx}`}>
                  {headerTitle.rus || ''}
                </th>
              ))}
          </TableHead>
        </TableHader>
        <tbody>
          {chart?.length > 0 &&
            chart.map((line, idx) => (
              <TableLine
                key={`line${idx}`}
                $isButton={line?.filter}
                idx={idx}
                onClick={() => handleClick(line)}
              >
                {header.map((title, idx) => (
                  <td key={`${title?.name || ''}${idx}`}>{line[title.name]}</td>
                ))}
              </TableLine>
            ))}
        </tbody>
        {/* <thead>
          <TableHead>
            <th>Стадия</th>
            <th>Кол-во</th>
            <th>Сумма</th>
            <th>Комиссия</th>
          </TableHead>
        </thead>
        <tbody>
          {chart?.length > 0 &&
            chart.map((line, idx) => (
              <TableLine key={idx} idx={idx}>
                <td>{line?.title}</td>
                <td>{line?.countItems}</td>
                <td>{useNumberTriad(line?.price || 0)}</td>
                <td>{useNumberTriad(line?.comision || 0)}</td>
              </TableLine>
            ))}
        </tbody> */}
      </TableStyle>
    </TableContainer>
  );
};

export default ChartTable;
