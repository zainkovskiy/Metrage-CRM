import React from 'react';
import styled from 'styled-components';
import { useNumberTriad } from 'hooks/StringHook';

const TableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: ${({ theme }) => theme.font.family};
  font-size: 12px;
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
  & > td {
    padding: 0.3rem;
  }
`;
const ChartTable = ({ chart }) => {
  return (
    <div>
      <TableStyle>
        <thead>
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
        </tbody>
      </TableStyle>
    </div>
  );
};

export default ChartTable;
