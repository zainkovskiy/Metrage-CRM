import React from 'react';
import styled from 'styled-components';
import { Box } from 'ui/Box';
import { ReactComponent as Gold } from 'images/medal-gold.svg';
import { ReactComponent as Silver } from 'images/medal-silver.svg';
import { ReactComponent as Bronze } from 'images/medal-bronze.svg';
const defaultAvatar = `https://ui-avatars.com/api/?name=Metrage&background=85009e&color=fff`;
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
  & > td {
    padding: 0.3rem;
  }
`;
const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 40px;
  object-position: top;
  object-fit: cover;
`;
const Medal = styled.div`
  display: flex;
  & > svg {
    height: 24px;
    width: 24px;
  }
`;
const Square = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${({ $color }) => $color && $color};
`;
const ChartTableRank = ({ chart }) => {
  const getMedal = (idx) => {
    if (idx === 0) {
      return (
        <Medal>
          <Gold />
        </Medal>
      );
    }
    if (idx === 1) {
      return (
        <Medal>
          <Silver />
        </Medal>
      );
    }
    if (idx === 2) {
      return (
        <Medal>
          <Bronze />
        </Medal>
      );
    }
  };
  return (
    <TableContainer>
      <TableStyle>
        <TableHader>
          <TableHead>
            <th>Место</th>
            <th>Сотрудник</th>
          </TableHead>
        </TableHader>
        <tbody>
          {chart?.length > 0 &&
            chart.map((line, idx) => (
              <TableLine key={`line${idx}`}>
                <td>
                  <Box jc='flex-start'>
                    {idx + 1}
                    {getMedal(idx)}
                  </Box>
                </td>
                <td>
                  <Box jc='flex-start'>
                    <Avatar src={line?.avatar || defaultAvatar} />
                    {line.rName}
                    {line?.color && <Square $color={line.color} />}
                  </Box>
                </td>
              </TableLine>
            ))}
        </tbody>
      </TableStyle>
    </TableContainer>
  );
};

export default ChartTableRank;
